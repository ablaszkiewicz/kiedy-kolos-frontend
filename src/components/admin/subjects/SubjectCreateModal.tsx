import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useSubjects from '../../../hooks/useSubjects';
import { subjectValidationSchema } from '../../../entities/Subject';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  name: string;
  shortName: string;
}

export const SubjectCreateModal = (props: Props) => {
  const { postMutation } = useSubjects();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: '',
    shortName: '',
  };

  const editSubject = (values: FormikValues) => {
    postMutation.mutate({ id: 0, name: values.name, shortName: values.shortName });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie przedmiotu</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editSubject} validationSchema={subjectValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Nazwa' />
                <InputControl name='shortName' label='Krótka nazwa' mt={5} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={postMutation.isLoading}>
                  Dodaj
                </Button>
                <Button onClick={props.onClose}>Anuluj</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

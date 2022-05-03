import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { CreateGroupDto, groupValidationSchema } from '../../../entities/Group';
import useYearCourses from '../../../hooks/useYearCourses';
import { AddAdminDTO } from '../../../entities/YearCourse';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  email: string;
}

export const RoleCreateModal = (props: Props) => {
  const { addAdminMutation } = useYearCourses();

  useEffect(() => {
    if (addAdminMutation.isSuccess) {
      props.onClose();
      addAdminMutation.reset();
    }
  }, [addAdminMutation.isSuccess]);

  const initialValues: FormikValues = {
    email: '',
  };

  const createGroup = (values: FormikValues) => {
    const params = { email: values.email } as AddAdminDTO;
    addAdminMutation.mutate(params);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie moderatora</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createGroup}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Alert status='info' borderRadius={10}>
                  <AlertIcon />
                  Dodanie moderatora oznacza nadanie komuś praw do dodawania, edytowania oraz usuwania wydarzeń, grup i
                  przedmiotów.
                </Alert>

                <InputControl name='email' label='Email' inputProps={{ placeholder: 'moderator@gmail.com' }} mt={5} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={addAdminMutation.isLoading}>
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

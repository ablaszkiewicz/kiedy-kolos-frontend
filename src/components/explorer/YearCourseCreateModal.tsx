import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { subjectValidationSchema } from '../../entities/Subject';
import { YearCourseType, yearCourseValidationSchema } from '../../entities/YearCourse';
import { useSetState } from '../../hooks/useSetState';
import useYearCourses from '../../hooks/useYearCourses';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  name: string;
  startYear: string;
}

export const YearCourseCreateModal = (props: Props) => {
  const { postMutation } = useYearCourses();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: '',
    startYear: '',
  };

  const createYearCourse = (values: FormikValues) => {
    postMutation.mutate({ name: values.name, startYear: +values.startYear });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie kierunku</ModalHeader>
        <ModalCloseButton />
        <Formik initialValues={initialValues} onSubmit={createYearCourse} validationSchema={yearCourseValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Nazwa' />
                <InputControl name='startYear' label='Rok rozpoczęcia' mt={5} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={postMutation.isLoading}>
                  Stwórz
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

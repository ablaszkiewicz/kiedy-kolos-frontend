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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useState, useEffect } from 'react';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType, subjectValidationSchema } from '../../../entities/Subject';
import { object } from 'yup';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SubjectCreateModal = (props: Props) => {
  const { postMutation } = useSubjects();

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  const initialValues = {
    name: '',
    shortName: '',
  };

  const editSubject = (values: any) => {
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

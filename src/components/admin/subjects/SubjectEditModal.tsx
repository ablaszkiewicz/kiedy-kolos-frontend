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
  subject: SubjectType;
}

export const SubjectEditModal = (props: Props) => {
  const { updateMutation } = useSubjects();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues = {
    name: props.subject.name,
    shortName: props.subject.shortName,
  };

  const editSubject = (values: any) => {
    console.log('elo');
    updateMutation.mutate({ id: props.subject.id, name: values.name, shortName: values.shortName });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie przedmiotu</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editSubject} validationSchema={subjectValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Nazwa' />
                <InputControl name='shortName' label='Krótka nazwa' mt={5} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={updateMutation.isLoading}>
                  Edytuj
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

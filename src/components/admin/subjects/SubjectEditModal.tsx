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
import { useState, useEffect } from 'react';
import useSubjects, { SubjectType } from '../../../hooks/useSubjects';

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

  const validateName = (value: string): string => {
    if (value.length > 50) {
      return 'Nazwa nie może być dłuższa niż 50 znaków';
    } else return '';
  };

  const validateShortName = (value: string): string => {
    if (value.length === 0) {
      return 'Krótka nazwa nie może być pusta';
    } else if (value.length > 4) {
      return 'Krótka nazwa nie może być dłuższa niż 4 znaków';
    } else return '';
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie przedmiotu</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={{ name: props.subject.name, shortName: props.subject.shortName }}
          onSubmit={(values, actions) => {
            updateMutation.mutate({ id: props.subject.id, name: values.name, shortName: values.shortName });
          }}
        >
          {() => (
            <Form>
              <ModalBody>
                <Field name='name' validate={validateName}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                      <FormLabel htmlFor='name'>Nazwa</FormLabel>
                      <Input {...field} id='name' placeholder='name' />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='shortName' validate={validateShortName}>
                  {({ field, form }: any) => (
                    <FormControl isInvalid={form.errors.shortName && form.touched.shortName}>
                      <FormLabel htmlFor='shortName'>Nazwa</FormLabel>
                      <Input {...field} id='shortName' placeholder='shortName' />
                      <FormErrorMessage>{form.errors.shortName}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
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

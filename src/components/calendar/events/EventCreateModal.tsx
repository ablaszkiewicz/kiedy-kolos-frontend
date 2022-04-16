import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { groupValidationSchema } from '../../../entities/Group';
import { SubjectType } from '../../../entities/Subject';
import useSubjects from '../../../hooks/useSubjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  subjectId: string;
}

export const EventCreateModal = (props: Props) => {
  const { query } = useSubjects();
  const initialValues: FormikValues = {
    subjectId: '',
  };

  useEffect(() => {
    console.log(query.data);
  }, [query.data]);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie wydarzenia</ModalHeader>
        <ModalCloseButton />

        <Formik
          initialValues={initialValues}
          onSubmit={() => console.log('chuj')}
          validationSchema={groupValidationSchema}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <SelectControl name='subjectId' label='Przedmiot' selectProps={{ placeholder: 'Wybierz przedmiot' }}>
                  {query.data &&
                    (query.data as SubjectType[]).map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.shortName})
                      </option>
                    ))}
                </SelectControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit'>
                  Dodaj
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

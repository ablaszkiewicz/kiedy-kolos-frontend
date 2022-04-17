import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { SubjectType } from '../../../entities/Subject';
import useSubjects from '../../../hooks/useSubjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  date: string;
  subjectId: string;
}

export const EventCreateModal = (props: Props) => {
  const { query } = useSubjects();
  const initialValues: FormikValues = {
    date: '',
    subjectId: '',
  };

  const createEvent = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie wydarzenia</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createEvent} validationSchema={null}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='date' label='Data' inputProps={{ type: 'date' }} />
                <SelectControl
                  name='subjectId'
                  label='Przedmiot'
                  selectProps={{ placeholder: 'Wybierz przedmiot' }}
                  mt={5}
                >
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

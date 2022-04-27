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
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { Group, groupValidationSchema, UpdateGroupDto } from '../../../entities/Group';
import useEvents from '../../../hooks/useEvents';
import { editEventValidationSchema, Event, UpdateEventDto } from '../../../entities/Event';
import dayjs from 'dayjs';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

interface FormikValues {
  date: string;
  subjectId: string;
}

export const EventEditModal = (props: Props) => {
  const { query: subjectsQuery } = useSubjects();
  const { updateMutation } = useEvents();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    date: dayjs(props.event.date).utc().format('YYYY-MM-DDThh:mm'),
    subjectId: props.event.subjectId,
  };

  const editEvent = (values: FormikValues) => {
    console.log(values.subjectId);

    const params = {
      id: props.event.id,
      date: values.date,
      subjectId: values.subjectId,
    } as UpdateEventDto;
    updateMutation.mutate(params);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie wydarzenia</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editEvent} validationSchema={editEventValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='date' label='Data' inputProps={{ type: 'datetime-local' }} />
                <SelectControl
                  name='subjectId'
                  label='Przedmiot'
                  selectProps={{ placeholder: 'Wybierz przedmiot' }}
                  mt={5}
                  onChange={(e) => console.log((e.target as any).value)}
                >
                  {subjectsQuery.data &&
                    (subjectsQuery.data as SubjectType[]).map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.shortName})
                      </option>
                    ))}
                </SelectControl>
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

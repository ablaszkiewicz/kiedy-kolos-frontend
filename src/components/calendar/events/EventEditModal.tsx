import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { CheckboxContainer, CheckboxControl, InputControl, SelectControl, TextareaControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { Group, groupValidationSchema, UpdateGroupDto } from '../../../entities/Group';
import useEvents from '../../../hooks/useEvents';
import { editEventValidationSchema, Event, UpdateEventDto } from '../../../entities/Event';
import dayjs from 'dayjs';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';
import { EventDeleteModal } from './EventDeleteModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

interface FormikValues {
  date: string;
  subjectId: string;
  room: string;
  description: string;
  groups: string[];
}

export const EventEditModal = (props: Props) => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { query: groupsQuery } = useGroups();
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
    room: props.event.room,
    description: props.event.description,
    groups: props.event.groups.map((group) => group.id),
  };

  const editEvent = (values: FormikValues) => {
    const params = {
      id: props.event.id,
      date: values.date,
      subjectId: values.subjectId,
      groups: values.groups,
      room: values.room,
      description: values.description,
    } as UpdateEventDto;
    updateMutation.mutate(params);
  };

  return (
    <>
      <EventDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} event={props.event} />
      <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edytowanie wydarzenia</ModalHeader>
          <ModalCloseButton />

          <Formik initialValues={initialValues} onSubmit={editEvent} validationSchema={editEventValidationSchema}>
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <ModalBody>
                  <Flex gap={5}>
                    <InputControl name='date' label='Data' inputProps={{ type: 'datetime-local' }} w={'70%'} />
                    <InputControl name='room' label='Miejsce' w={'30%'} />
                  </Flex>

                  <SelectControl
                    name='subjectId'
                    label='Przedmiot'
                    selectProps={{ placeholder: 'Wybierz przedmiot' }}
                    mt={3}
                    onChange={(e) => console.log((e.target as any).value)}
                  >
                    {subjectsQuery.data &&
                      (subjectsQuery.data as SubjectType[]).map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name} ({subject.shortName})
                        </option>
                      ))}
                  </SelectControl>
                  <CheckboxContainer name='groups' label='Grupy' mt={3}>
                    {groupsQuery.data &&
                      groupsQuery.data.map((group) => (
                        <CheckboxControl name='groups' key={group.id} value={group.id}>
                          {group.name}
                        </CheckboxControl>
                      ))}
                  </CheckboxContainer>
                  <TextareaControl name='description' label='Opis' mt={3} />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={'3'} type='submit' isLoading={updateMutation.isLoading}>
                    Zapisz
                  </Button>
                  <Button colorScheme='red' mr={'3'} onClick={onDeleteModalOpen}>
                    Usuń
                  </Button>
                  <Button onClick={props.onClose}>Anuluj</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

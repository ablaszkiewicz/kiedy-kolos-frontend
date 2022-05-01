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
  Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import { CheckboxContainer, CheckboxControl, InputControl, SelectControl, TextareaControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { CreateEventDto, createEventValidationSchema } from '../../../entities/Event';
import { Group } from '../../../entities/Group';
import { SubjectType } from '../../../entities/Subject';
import useEvents from '../../../hooks/useEvents';
import useGroups from '../../../hooks/useGroups';
import useSubjects from '../../../hooks/useSubjects';
import useStore from '../../../zustand/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  time: string;
  subjectId: string;
  room: string;
  description: string;
  groups: string[];
}

export const EventCreateModal = (props: Props) => {
  const { query: groupsQuery } = useGroups();
  const { query: subjectsQuery } = useSubjects();
  const { postMutation: eventPostMutation } = useEvents();
  const clickedDate = useStore((state) => state.clickedDate);

  useEffect(() => {
    if (eventPostMutation.isSuccess) {
      props.onClose();
      eventPostMutation.reset();
    }
  }, [eventPostMutation.isSuccess]);

  const initialValues: FormikValues = {
    time: '',
    subjectId: '',
    room: '',
    description: '',
    groups: [],
  };

  const createEvent = (values: FormikValues) => {
    const formattedDate = clickedDate.format('YYYY-MM-DD');
    const date = `${formattedDate}T${values.time}:00`;
    const params: CreateEventDto = {
      date,
      subjectId: values.subjectId,
      groups: values.groups,
      room: values.room,
      description: values.description,
    };
    console.log(params);

    eventPostMutation.mutate(params);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie wydarzenia {dayjs(clickedDate).format('DD.MM')}</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createEvent} validationSchema={createEventValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <Flex gap={5}>
                  <InputControl name='time' label='Data' inputProps={{ type: 'time' }} w={'70%'} />
                  <InputControl name='room' label='Miejsce' inputProps={{ placeholder: '201 NE' }} w={'30%'} />
                </Flex>
                <SelectControl
                  name='subjectId'
                  label='Przedmiot'
                  selectProps={{ placeholder: 'Wybierz przedmiot' }}
                  mt={3}
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
                <TextareaControl
                  name='description'
                  label='Opis'
                  mt={3}
                  textareaProps={{ placeholder: 'Pamiętajcie, żeby wziąć ze sobą długopis i kartki' }}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={eventPostMutation.isLoading}>
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

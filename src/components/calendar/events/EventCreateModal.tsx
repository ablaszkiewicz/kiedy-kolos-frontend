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
import dayjs from 'dayjs';
import { Formik, Form } from 'formik';
import { InputControl, SelectControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import { SubjectType } from '../../../entities/Subject';
import useEvents from '../../../hooks/useEvents';
import useSubjects from '../../../hooks/useSubjects';
import useStore from '../../../zustand/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface FormikValues {
  time: string;
  subjectId: string;
}

export const EventCreateModal = (props: Props) => {
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
  };

  const createEvent = (values: FormikValues) => {
    const formattedDate = clickedDate.format('YYYY-MM-DD');
    const date = `${formattedDate}T${values.time}:00`;
    const params = { date, subjectId: values.subjectId } as any;
    console.log(params);

    eventPostMutation.mutate(params);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie wydarzenia {dayjs(clickedDate).format('DD.MM')}</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={createEvent} validationSchema={null}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='time' label='Godzina' inputProps={{ type: 'time' }} />
                <SelectControl
                  name='subjectId'
                  label='Przedmiot'
                  selectProps={{ placeholder: 'Wybierz przedmiot' }}
                  mt={5}
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

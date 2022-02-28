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
import { useState, useEffect } from 'react';
import { useSetState } from '../../hooks/useSetState';
import useYearCourses, { YearCourseType } from '../../hooks/useYearCourses';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  name: string;
  startYear: string;
}

export const YearCourseCreateModal = (props: Props) => {
  const { postMutation } = useYearCourses();
  const [state, setState] = useSetState({
    name: '',
    startYear: '',
  } as State);

  useEffect(() => {
    if (postMutation.isSuccess) {
      props.onClose();
      postMutation.reset();
    }
  }, [postMutation.isSuccess]);

  const createSubject = () => {
    postMutation.mutate({ id: 0, name: state.name, startYear: +state.startYear });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodawanie kierunku</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nazwa</FormLabel>
            <Input value={state.name} onChange={(e) => setState({ name: e.target.value })} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Rok rozpoczęcia</FormLabel>
            <Input value={state.startYear} onChange={(e) => setState({ startYear: e.target.value })} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => createSubject()} isLoading={postMutation.isLoading}>
            Stwórz
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Code,
} from '@chakra-ui/react';
import { Event } from '../../../entities/Event';
import useEvents from '../../../hooks/useEvents';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export const EventDeleteModal = (props: Props) => {
  const { deleteMutation } = useEvents();

  const deleteGroup = () => {
    deleteMutation.mutate(props.event.id);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie wydarzenia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć to wydarzenie??</Text>
          <Code mt={5}>{props.event.id}</Code>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => deleteGroup()} isLoading={deleteMutation.isLoading}>
            Usuń
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

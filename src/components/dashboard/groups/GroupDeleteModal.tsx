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
import { SubjectType } from '../../../entities/Subject';
import useSubjects from '../../../hooks/useSubjects';
import { Group } from '../../../entities/Group';
import useGroups from '../../../hooks/useGroups';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
}

export const GroupDeleteModal = (props: Props) => {
  const { deleteMutation } = useGroups();

  const deleteGroup = () => {
    deleteMutation.mutate(props.group.id);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie grupy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć tę grupę?</Text>
          <Code mt={5}>{props.group.name}</Code>
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

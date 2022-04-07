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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subject: SubjectType;
}

export const SubjectDeleteModal = (props: Props) => {
  const { deleteMutation } = useSubjects();

  const deleteSubject = () => {
    deleteMutation.mutate(props.subject.id);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie przedmiotu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć ten przedmiot?</Text>
          <Code mt={5}>{props.subject.name}</Code>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => deleteSubject()} isLoading={deleteMutation.isLoading}>
            Usuń
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

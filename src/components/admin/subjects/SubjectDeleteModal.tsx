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
import useSubjects, { SubjectType } from '../../../hooks/useSubjects';

interface Props {
  isOpen: any;
  onClose: any;
  subject: SubjectType;
}

export const SubjectDeleteModal = ({ isOpen, onClose, subject }: Props) => {
  const { deleteMutation } = useSubjects();

  const onDeleteButtonClick = () => {
    deleteMutation.mutate(subject.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie przedmiotu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć ten przedmiot?</Text>
          <Code mt={5}>{subject.name}</Code>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={'3'}
            onClick={() => onDeleteButtonClick()}
            isLoading={deleteMutation.isLoading}
          >
            Usuń
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

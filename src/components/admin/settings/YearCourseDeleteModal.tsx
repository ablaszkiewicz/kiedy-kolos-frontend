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
} from '@chakra-ui/react';
import useYearCourses from '../../../hooks/useYearCourses';

interface Props {
  isOpen: any;
  onClose: any;
  yearCourseId: number;
}

export const YearCourseDeleteModal = ({ isOpen, onClose, yearCourseId }: Props) => {
  const { deleteMutation } = useYearCourses();

  const onDeleteButtonClick = () => {
    deleteMutation.mutate(yearCourseId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie kierunku</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć ten kierunek?</Text>
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

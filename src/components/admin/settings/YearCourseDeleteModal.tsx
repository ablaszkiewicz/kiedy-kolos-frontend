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
  isOpen: boolean;
  onClose: () => void;
  yearCourseId: number;
}

export const YearCourseDeleteModal = (props: Props) => {
  const { deleteMutation } = useYearCourses();

  const deleteYearCourse = () => {
    deleteMutation.mutate(props.yearCourseId);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie kierunku</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Czy na pewno chcesz usunąć ten kierunek?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => deleteYearCourse()} isLoading={deleteMutation.isLoading}>
            Usuń
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

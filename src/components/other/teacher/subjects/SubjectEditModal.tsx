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
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { SubjectType } from '../../../../hooks/useSubjects';

interface Props {
  isOpen: any;
  onClose: any;
  subject: SubjectType;
}

export const SubjectEditModal = ({ isOpen, onClose, subject }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie przedmiotu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nazwa</FormLabel>
            <Input value={subject.name} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Skrócona nazwa</FormLabel>
            <Input />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'}>
            Edytuj
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

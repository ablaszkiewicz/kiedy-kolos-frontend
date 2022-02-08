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
import { useEffect, useState } from 'react';
import useSubjects, { SubjectType } from '../../../../hooks/useSubjects';

interface Props {
  isOpen: any;
  onClose: any;
  subject: SubjectType;
}

export const SubjectEditModal = ({ isOpen, onClose, subject }: Props) => {
  const [name, setName] = useState<string>(subject.name);
  const [shortName, setShortName] = useState<string>(subject.shortName);
  const { updateMutation } = useSubjects();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      onClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const onEditClicked = () => {
    updateMutation.mutate({ id: subject.id, name: name, shortName: shortName });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie przedmiotu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Nazwa</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Skrócona nazwa</FormLabel>
            <Input value={shortName} onChange={(e) => setShortName(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => onEditClicked()} isLoading={updateMutation.isLoading}>
            Edytuj
          </Button>
          <Button onClick={onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

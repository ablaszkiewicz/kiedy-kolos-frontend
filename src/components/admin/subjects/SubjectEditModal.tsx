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
import useSubjects, { SubjectType } from '../../../hooks/useSubjects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subject: SubjectType;
}

export const SubjectEditModal = (props: Props) => {
  const [name, setName] = useState<string>(props.subject.name);
  const [shortName, setShortName] = useState<string>(props.subject.shortName);
  const { updateMutation } = useSubjects();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const onEditClicked = () => {
    updateMutation.mutate({ id: props.subject.id, name: name, shortName: shortName });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
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
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

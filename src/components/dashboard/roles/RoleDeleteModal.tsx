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
  Alert,
  AlertIcon,
  Code,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { CreateGroupDto, groupValidationSchema } from '../../../entities/Group';
import useYearCourses from '../../../hooks/useYearCourses';
import { AddAdminDTO } from '../../../entities/YearCourse';
import { User } from '../../../entities/User';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const RoleDeleteModal = (props: Props) => {
  const { deleteAdminMutation } = useYearCourses();

  useEffect(() => {
    if (deleteAdminMutation.isSuccess) {
      props.onClose();
      deleteAdminMutation.reset();
    }
  }, [deleteAdminMutation.isSuccess]);

  const createGroup = () => {
    deleteAdminMutation.mutate(props.user.id);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie moderatora</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Czy na pewno chcesz odebrać temu użytkownikowi prawa moderatora?</Text>
          <Code mt={5}>{props.user.email}</Code>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => createGroup()} isLoading={deleteAdminMutation.isLoading}>
            Usuń
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

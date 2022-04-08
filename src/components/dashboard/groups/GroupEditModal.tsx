import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { Group, groupValidationSchema, UpdateGroupDto } from '../../../entities/Group';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
}

interface FormikValues {
  name: string;
}

export const GroupEditModal = (props: Props) => {
  const { updateMutation } = useGroups();

  useEffect(() => {
    if (updateMutation.isSuccess) {
      props.onClose();
      updateMutation.reset();
    }
  }, [updateMutation.isSuccess]);

  const initialValues: FormikValues = {
    name: props.group.name,
  };

  const editGroup = (values: FormikValues) => {
    const params: UpdateGroupDto = { id: props.group.id, name: values.name } as UpdateGroupDto;
    updateMutation.mutate(params);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edytowanie grupy</ModalHeader>
        <ModalCloseButton />

        <Formik initialValues={initialValues} onSubmit={editGroup} validationSchema={groupValidationSchema}>
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <ModalBody>
                <InputControl name='name' label='Nazwa' />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={'3'} type='submit' isLoading={updateMutation.isLoading}>
                  Edytuj
                </Button>
                <Button onClick={props.onClose}>Anuluj</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

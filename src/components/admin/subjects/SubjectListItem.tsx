import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, IconButton, VStack, Text, useDisclosure } from '@chakra-ui/react';
import { SubjectType } from '../../../hooks/useSubjects';
import { SubjectDeleteModal } from './SubjectDeleteModal';
import { SubjectEditModal } from './SubjectEditModal';

interface Props {
  subject: SubjectType;
}

export const SubjectListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const onEditButtonClick = () => {
    onEditModalOpen();
  };

  const onDeleteButtonClick = () => {
    onDeleteModalOpen();
  };

  return (
    <>
      <SubjectEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} subject={props.subject} />
      <SubjectDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} subject={props.subject} />
      <Flex borderWidth={'1px'} m={2} p={2} borderRadius={5}>
        <VStack spacing={0} alignItems={'baseline'}>
          <Text>{props.subject.shortName}</Text>
          <Text fontSize={'xs'}>{props.subject.name}</Text>
        </VStack>
        <Spacer />
        <Button mx={1} onClick={() => onEditButtonClick()}>
          Edytuj
        </Button>
        <IconButton onClick={() => onDeleteButtonClick()} aria-label='Skopiuj link' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

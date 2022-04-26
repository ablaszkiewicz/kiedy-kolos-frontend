import { Group } from '../../../entities/Group';
import { Flex, IconButton, Spacer, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { GroupEditModal } from './GroupEditModal';
import { GroupDeleteModal } from './GroupDeleteModal';

interface Props {
  group: Group;
}

export const GroupListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <GroupEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} group={props.group} />
      <GroupDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} group={props.group} />
      <Flex py={2} borderRadius={5} alignItems={'center'}>
        <Text my={'auto'}>{props.group.name}</Text>
        <Spacer />
        <IconButton onClick={onEditModalOpen} variant={'ghost'} aria-label='Edytuj przedmiot' icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Usuń przedmiot' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { User } from '../../../entities/User';
import { RoleDeleteModal } from './RoleDeleteModal';

interface Props {
  user: User;
}

export const RoleListItem = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RoleDeleteModal isOpen={isOpen} onClose={onClose} user={props.user} />
      <Flex py={2} alignItems={'center'}>
        <Text>{props.user.email}</Text>
        <Spacer />
        <IconButton onClick={onOpen} aria-label={'delete'} variant={'ghost'} icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

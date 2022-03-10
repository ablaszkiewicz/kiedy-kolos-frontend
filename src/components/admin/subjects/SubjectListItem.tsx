import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, IconButton, VStack, Text, useDisclosure } from '@chakra-ui/react';
import { SubjectType } from '../../../entities/Subject';
import { SubjectDeleteModal } from './SubjectDeleteModal';
import { SubjectEditModal } from './SubjectEditModal';

interface Props {
  subject: SubjectType;
}

export const SubjectListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <SubjectEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} subject={props.subject} />
      <SubjectDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} subject={props.subject} />
      <Flex py={2} borderRadius={5}>
        <VStack spacing={0} alignItems={'baseline'}>
          <Text>{props.subject.shortName}</Text>
          <Text fontSize={'xs'} color={'gray.400'}>
            {props.subject.name}
          </Text>
        </VStack>
        <Spacer />
        {/* <Button mx={1} onClick={onEditModalOpen} variant={'ghost'}>
          Edytuj
        </Button> */}
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Skopiuj link' icon={<EditIcon />} />
        <IconButton onClick={onDeleteModalOpen} variant={'ghost'} aria-label='Skopiuj link' icon={<DeleteIcon />} />
      </Flex>
    </>
  );
};

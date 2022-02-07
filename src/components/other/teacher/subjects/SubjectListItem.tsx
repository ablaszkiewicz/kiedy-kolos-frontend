import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, IconButton, VStack, Text, useDisclosure } from '@chakra-ui/react';
import useSubjects, { SubjectType } from '../../../../hooks/useSubjects';
import { SubjectDeleteModal } from './SubjectDeleteModal';
import { SubjectEditModal } from './SubjectEditModal';

interface Props {
  subject: SubjectType;
}

export const SubjectListItem = ({ subject }: Props) => {
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
      <SubjectEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} subject={subject} />
      <SubjectDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} subject={subject} />
      <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
        <VStack spacing={0} alignItems={'baseline'}>
          <Text>{subject.shortName}</Text>
          <Text fontSize={'xs'}>{subject.name}</Text>
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

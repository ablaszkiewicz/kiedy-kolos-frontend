import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { YearCourseDeleteModal } from './YearCourseDeleteModal';

export const SettingsPanel = () => {
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { yearCourseId } = useParams();
  return (
    <>
      <YearCourseDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} yearCourseId={yearCourseId!} />
      <Button colorScheme={'red'} onClick={onDeleteModalOpen}>
        Usuń kierunek
      </Button>
    </>
  );
};

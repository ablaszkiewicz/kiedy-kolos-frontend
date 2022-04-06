import { Box, Button, Divider, Flex, HStack, SimpleGrid, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';
import { AddIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { YearCourseDeleteModal } from './YearCourseDeleteModal';

export const SettingsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { yearCourseId } = useParams();

  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      backgroundColor={'gray.750'}
      p={7}
      shadow={'dark-lg'}
      overflowY={'hidden'}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Ustawienia
        </Text>
      </Flex>

      <Box>
        <YearCourseDeleteModal isOpen={isOpen} onClose={onClose} yearCourseId={yearCourseId!} />
        <Button onClick={onOpen}>Usuń kierunek</Button>
      </Box>
    </Flex>
  );
};

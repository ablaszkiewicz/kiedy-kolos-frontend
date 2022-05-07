import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
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
      flexGrow={1}
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

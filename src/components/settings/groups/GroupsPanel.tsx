import { Box, Button, Divider, Flex, HStack, SimpleGrid, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';
import { AddIcon } from '@chakra-ui/icons';

export const GroupsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query } = useSubjects();

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
          Grupy
        </Text>
        <Spacer />
        <Button variant={'ghost'} onClick={onCreateModalOpen} leftIcon={<AddIcon />}>
          Dodaj
        </Button>
      </Flex>

      <Box overflowY={'scroll'} css={scrollbarStyle}></Box>
    </Flex>
  );
};

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '24px',
  },
};

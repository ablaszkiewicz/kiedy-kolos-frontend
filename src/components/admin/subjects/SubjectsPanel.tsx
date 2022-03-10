import { Box, Button, Divider, Flex, HStack, SimpleGrid, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { SubjectListItem } from './SubjectListItem';
import { SubjectAdder } from './SubjectAdder';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';
import { SubjectCreateModal } from './SubjectCreateModal';
import { AddIcon } from '@chakra-ui/icons';

export const SubjectsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query } = useSubjects();

  return (
    <>
      <SubjectCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Box borderRadius={10} backgroundColor={'gray.700'} p={7} shadow={'dark-lg'}>
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Przedmioty
          </Text>
          <Spacer />
          <Button variant={'ghost'} onClick={onCreateModalOpen} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>

        {query.data &&
          query.data.map((subject: SubjectType, i: number) => (
            <div key={subject.id}>
              <SubjectListItem subject={subject} />
              {i < query.data.length - 1 && <Divider />}
            </div>
          ))}
      </Box>
    </>
  );
};

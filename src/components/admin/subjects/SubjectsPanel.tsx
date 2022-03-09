import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { SubjectListItem } from './SubjectListItem';
import { SubjectAdder } from './SubjectAdder';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';

export const SubjectsPanel = () => {
  const { query } = useSubjects();

  return (
    <>
      <SimpleGrid columns={[2, 2, 2, 3]} gap={6}>
        <Box>
          <Text>Lista przedmiotów:</Text>
          {query.data &&
            query.data.map((subject: SubjectType) => <SubjectListItem subject={subject} key={subject.id} />)}
        </Box>
        <Box>
          <Text>Dodaj przedmiot:</Text>
          <SubjectAdder />
        </Box>
      </SimpleGrid>
      <HStack spacing={'5em'} align={'start'}></HStack>
    </>
  );
};

import { Box, HStack, Text } from '@chakra-ui/react';
import useSubjects, { SubjectType } from '../../../../hooks/useSubjects';
import { SubjectListItem } from './SubjectListItem';
import { SubjectAdder } from './SubjectAdder';

export const SubjectsPanel = () => {
  const { query } = useSubjects();

  return (
    <>
      <HStack spacing={'5em'} align={'start'}>
        <Box>
          <Text>Lista przedmiotów:</Text>
          {query.data &&
            query.data.map((subject: SubjectType) => <SubjectListItem subject={subject} key={subject.id} />)}
        </Box>
        <Box>
          <Text>Dodaj przedmiot:</Text>
          <SubjectAdder />
        </Box>
      </HStack>
    </>
  );
};

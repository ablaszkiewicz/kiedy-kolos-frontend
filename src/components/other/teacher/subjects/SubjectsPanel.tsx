import { Box, HStack, Text } from '@chakra-ui/react';
import useSubjects, { SubjectType } from '../../../../hooks/useSubjects';
import { Subject } from './Subject';
import { SubjectAdder } from './SubjectAdder';

export const SubjectsPanel = () => {
  const { query } = useSubjects();

  return (
    <>
      <HStack spacing={'5em'} align={'start'}>
        <Box>
          <Text>Lista przedmiotów, których uczysz:</Text>
          {query.data && query.data.map((subject: SubjectType) => <Subject subject={subject} key={subject.id} />)}
        </Box>
        <Box>
          <Text>Dodaj przedmiot:</Text>
          <SubjectAdder />
        </Box>
      </HStack>
    </>
  );
};

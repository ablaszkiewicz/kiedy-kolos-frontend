import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Subject } from '../components/subjects/Subject';
import { SubjectAdder } from '../components/subjects/SubjectAdder';
import { SubjectYouTeach } from '../components/subjects/SubjectYouTeach';

export const SubjectsPanel = () => (
  <>
    <HStack spacing={'5em'} align={'start'}>
      <Box>
        <Text>Lista przedmiotów:</Text>
        <Subject name={'Przedmiot 1 '} teacher='Anna Bobkowska' />
        <Subject name={'Przedmiot 2'} teacher='Andrzej Sobecki' />
      </Box>
      <Box>
        <Text>Lista przedmiotów, których uczysz:</Text>
        <SubjectYouTeach name={'Przedmiot 1'} />
        <SubjectYouTeach name={'Przedmiot 2'} />
        <Text>Dodaj przedmiot:</Text>
        <SubjectAdder />
      </Box>
    </HStack>
  </>
);

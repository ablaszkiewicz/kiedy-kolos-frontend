import { Flex, Spacer, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import useSubjects from '../../../../hooks/useSubjects';

export const SubjectAdder = () => {
  const [name, setName] = useState('');
  const { mutation } = useSubjects();

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Input
        placeholder='Podaj nazwę przedmiotu...'
        justifySelf='flex-start'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Spacer />
      <Button mx={1} onClick={() => mutation.mutate(name)} isLoading={mutation.isLoading}>
        Dodaj
      </Button>
    </Flex>
  );
};

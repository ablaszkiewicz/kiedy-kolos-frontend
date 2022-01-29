import { Flex, Spacer, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import useSubjects from '../../../../hooks/useSubjects';

export const SubjectAdder = () => {
  const [name, setName] = useState('');
  const { postMutation } = useSubjects();

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Input placeholder='Podaj nazwę przedmiotu...' value={name} onChange={(e) => setName(e.target.value)} />
      <Spacer />
      <Button mx={1} onClick={() => postMutation.mutate({ id: 0, name: name })} isLoading={postMutation.isLoading}>
        Dodaj
      </Button>
    </Flex>
  );
};

import { Flex, Spacer, Button, Input, Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import useSubjects from '../../../../hooks/useSubjects';

export const SubjectAdder = () => {
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const { postMutation } = useSubjects();

  return (
    <Flex borderWidth={'1px'} width={'30em'} m={2} p={2} borderRadius={5}>
      <Flex>
        <Input placeholder='Pełna nazwa...' value={name} onChange={(e) => setName(e.target.value)} mr={2} />
        <Input placeholder='Krótka nazwa...' value={shortName} onChange={(e) => setShortName(e.target.value)} />
      </Flex>

      <Button
        ml={2}
        onClick={() => postMutation.mutate({ id: 0, name: name, shortName: shortName })}
        isLoading={postMutation.isLoading}
      >
        Dodaj
      </Button>
    </Flex>
  );
};

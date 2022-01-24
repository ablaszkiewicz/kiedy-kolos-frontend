import { Flex, Spacer, Button, Center, Input } from '@chakra-ui/react';

export const SubjectAdder = () => (
  <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
    <Input placeholder='Podaj nazwę przedmiotu...' justifySelf='flex-start' />
    <Spacer />
    <Button mx={1}>Dodaj</Button>
  </Flex>
);

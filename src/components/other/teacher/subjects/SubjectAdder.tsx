import { Flex, Spacer, Button, Input } from '@chakra-ui/react';
import useStore from '../../../../zustand/store';

export const SubjectAdder = () => {
  const test = useStore((state) => state.test);

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Input placeholder='Podaj nazwę przedmiotu...' justifySelf='flex-start' />
      <Spacer />
      <Button mx={1} onClick={() => test()}>
        Dodaj
      </Button>
    </Flex>
  );
};

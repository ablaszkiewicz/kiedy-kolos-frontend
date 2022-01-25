import { Flex, Spacer, Button, Center, Input } from '@chakra-ui/react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';

export const SubjectAdder = () => {
  const { user } = useAuth();

  const click = async () => {
    const { data } = await axios.get('protected', { headers: { Authorization: `Bearer ${user.access_token}` } });
    console.log(data);
  };

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Input placeholder='Podaj nazwę przedmiotu...' justifySelf='flex-start' />
      <Spacer />
      <Button mx={1} onClick={() => click()}>
        Dodaj
      </Button>
    </Flex>
  );
};

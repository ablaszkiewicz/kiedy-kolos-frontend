import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSetState } from '../hooks/useSetState';

interface State {
  email: string;
  password: string;
}

export const Register = () => {
  const [state, setState] = useSetState({
    email: '',
    password: '',
  } as State);

  const navigate = useNavigate();
  const { registerMutation } = useAuth();

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            join us ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' value={state.email} onChange={(e) => setState({ email: e.target.value })} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={state.password} onChange={(e) => setState({ password: e.target.value })} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={registerMutation.isLoading}
                onClick={() => registerMutation.mutate({ email: state.email, password: state.password })}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text color={'red'}>{registerMutation.isError ? (registerMutation as any).error.message : ''}</Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

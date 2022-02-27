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
import { Link as RouterLink, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSetState } from '../hooks/useSetState';
import { Path } from '../other/Paths';

interface State {
  email: string;
  password: string;
}

export const Login = () => {
  const [state, setState] = useSetState({
    email: '',
    password: '',
  } as State);

  const { loginMutation } = useAuth();
  const { state: routerState } = useLocation();
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Zaloguj się</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            lub załóż konto <RouterLink to={Path.REGISTER}>tutaj</RouterLink> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Adres email</FormLabel>
              <Input type='email' value={state.email} onChange={(e) => setState({ email: e.target.value })} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Hasło</FormLabel>
              <Input type='password' value={state.password} onChange={(e) => setState({ password: e.target.value })} />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={loginMutation.isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  loginMutation.mutate({ email: state.email, password: state.password });
                }}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text color={'red'}>{loginMutation.isError ? (loginMutation as any).error.message : ''}</Text>
          </Stack>
        </Box>
        {(routerState as any).customMessage && (
          <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={8}>
            <Text>{(routerState as any).customMessage}</Text>
          </Box>
        )}
      </Stack>
    </Flex>
  );
};

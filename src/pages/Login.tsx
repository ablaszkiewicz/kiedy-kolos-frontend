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
  Text
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useLoginQuery from '../hooks/useLoginQuery';
import {useSetState} from "../hooks/useSetState";

interface State {
  email: string;
  password: string;
}

export const Login = () => {
  const [state, setState] = useSetState({
    email: '',
    password: '',
  } as State);

  const navigate = useNavigate();
  const { loginQuery, isLoading, error } = useLoginQuery(() => navigate('/dashboard'));

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Zaloguj się</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            lub załóż konto <RouterLink to='/register'>tutaj</RouterLink> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Adres email</FormLabel>
              <Input
                type='email'
                value={state.email}
                onChange={(e) => setState({email: e.target.value})}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Hasło</FormLabel>
              <Input
                type='password'
                value={state.password}
                onChange={(e) => setState({password: e.target.value})}
              />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack> */}
              <Button
                isLoading={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  loginQuery(state.email, state.password);
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
            <Text>{error}</Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

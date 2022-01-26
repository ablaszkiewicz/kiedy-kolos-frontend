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
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

export const Login = () => {
  const login = useStore((state) => state.loginUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInClicked = async (e: any) => {
    e.preventDefault();
    const { data } = await axios.post('auth/login', { email: email, password: password });
    if (data.token != null && data.email != null) {
      login(data.email, data.token);
      navigate('/dashboard');
    }
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            or create an account{' '}
            <Link color={'blue.400'}>
              <RouterLink to='/register'>here</RouterLink>
            </Link>{' '}
            ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack> */}
              <Button
                onClick={(e) => signInClicked(e)}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

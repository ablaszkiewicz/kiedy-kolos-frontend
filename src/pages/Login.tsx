import { Box, Flex, Heading, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Login = () => {
  const { googleLoginMutation } = useAuth();
  const { state: routerState } = useLocation();
  const bgColor = useColorModeValue('white', 'gray.700');

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleLoginMutation.mutate(credentialResponse.credential!);
      document.getElementById('g_a11y_announcement')!.style.height = '0px';
    },
    cancel_on_tap_outside: false,
  });

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Zaloguj się kontem google</Heading>
          <Text fontSize={'lg'}>Powinieneś gdzieś zobaczyć baner do logowania</Text>
        </Stack>
        {routerState && (routerState as any).customMessage && (
          <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={8}>
            <Text>{(routerState as any).customMessage}</Text>
          </Box>
        )}
      </Stack>
    </Flex>
  );
};

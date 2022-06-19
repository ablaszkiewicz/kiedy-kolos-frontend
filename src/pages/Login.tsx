import { CopyIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, Text, Button, useToast, Spacer } from '@chakra-ui/react';
import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import copy from 'copy-to-clipboard';
import { detect } from 'detect-browser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export const Login = () => {
  const [supported, setSupported] = useState(false);
  const { googleLoginMutationRedirect } = useAuth();
  const { state: routerState } = useLocation();

  const toast = useToast();

  useEffect(() => {
    const browser = detect();

    if (
      browser?.name.includes('webview') ||
      browser?.name.includes('instagram') ||
      browser?.name.includes('facebook')
    ) {
      setSupported(false);
    } else {
      setSupported(true);
    }
  }, []);

  const copyToClipboard = () => {
    copy('https://kiedy-kolos.pl/#/login');
    toast({
      title: 'Skopiowano link do schowka',
      status: 'success',
      duration: 2000,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginMutationRedirect.mutate(tokenResponse.access_token);
    },
  });

  return (
    <Flex h={'100vh'} direction={'column'} textAlign={'center'} alignItems={'center'}>
      <Spacer />
      {supported && (
        <>
          <Heading mb={4} fontSize={'4xl'}>
            Zaloguj się
          </Heading>
          <Button onClick={() => login()} leftIcon={<FcGoogle />}>
            Zaloguj się przez google
          </Button>
        </>
      )}
      {!supported && (
        <>
          <Heading> Przeglądarka nieobsługiwana</Heading>
          <Text>Włącz stronę w pełnej wersji przeglądarki</Text>
          <Button leftIcon={<LinkIcon />} onClick={copyToClipboard}>
            Skopiuj link
          </Button>
        </>
      )}

      {routerState && (routerState as any).customMessage && (
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <Text>{(routerState as any).customMessage}</Text>
        </Box>
      )}
      <Spacer />
    </Flex>
  );
};

import { CopyIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, useColorModeValue, Text, Button, useToast } from '@chakra-ui/react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import copy from 'copy-to-clipboard';
import { detect } from 'detect-browser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Login = () => {
  const [supported, setSupported] = useState(false);
  const { googleLoginMutation } = useAuth();
  const { state: routerState } = useLocation();
  const bgColor = useColorModeValue('white', 'gray.700');

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

  const login = (response: CredentialResponse) => {
    googleLoginMutation.mutate(response.credential!);
    document.getElementById('g_a11y_announcement')!.style.height = '0px';
  };

  console.log(supported);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack align={'center'}>
        {supported && (
          <>
            <Heading mb={4} fontSize={'4xl'}>
              Zaloguj się kontem google
            </Heading>
            <GoogleLogin onSuccess={login} size={'medium'} auto_select={false} useOneTap />
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
      </Stack>

      {routerState && (routerState as any).customMessage && (
        <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={8}>
          <Text>{(routerState as any).customMessage}</Text>
        </Box>
      )}
    </Flex>
  );
};

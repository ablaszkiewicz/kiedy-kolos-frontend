import { Flex, Heading, Spacer, Button, Text } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';

export const CalendarViewNavbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { googleLoginMutation } = useAuth();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginMutation.mutate(tokenResponse.access_token);
    },
  });

  return (
    <Flex mb={2}>
      <Heading>Kalendarz</Heading>

      <Spacer />
      <Button
        onClick={() => {
          setIsLoading(true);
          login();
        }}
        leftIcon={<FcGoogle />}
        isLoading={isLoading}
      >
        Zaloguj się przez google
      </Button>
    </Flex>
  );
};

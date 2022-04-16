import { Box, Button, Flex, Heading, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import { Laptop } from '../components/landing/Laptop';

export const LandingPage = () => {
  return (
    <Flex p={4} m={0} h={['100vh']} direction={['column', 'row']} overflow={'hidden'}>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} order={[2, 1]}>
        <Spacer />
        <Heading textAlign={'center'} fontSize={'5xl'}>
          Skończ z tym
        </Heading>
        <Text textAlign={'center'} fontSize={'2xl'} opacity={0.6} fontWeight={'light'} mb={10}>
          Wszystkie uczelniane wydarzenia w jednym miejscu
        </Text>
        <Button alignSelf={'center'} colorScheme={'blue'} size={'lg'}>
          Załóż swoją tablicę
        </Button>
        <Spacer />
      </Flex>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} order={[1, 2]}>
        <Laptop />
      </Flex>
    </Flex>
  );
};

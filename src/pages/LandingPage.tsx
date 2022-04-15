import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Input, Spacer, Text, VStack } from '@chakra-ui/react';

export const LandingPage = () => {
  return (
    <Flex p={4} m={0} h={['100vh']} direction={'row'} overflow={'hidden'}>
      <Flex h={'100%'} direction={'column'} w={'50%'}>
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
      <Flex h={'100%'} direction={'column'} w={'50%'} alignItems={'center'}>
        <Spacer />
        <Flex
          h={'80%'}
          w={'60%'}
          backgroundColor={'gray.700'}
          p={2}
          borderRadius={'10'}
          shadow={'dark-lg'}
          direction={'column'}
          gap={2}
        >
          <Flex
            backgroundColor={'gray.900'}
            w={'100%'}
            h={'100%'}
            borderRadius={'10'}
            direction={'column'}
            p={3}
            alignItems={'baseline'}
            gap={1}
          >
            <VStack spacing={0} alignItems={'baseline'}>
              <Text ml={1} fontSize={'xs'}>
                Jerzy
              </Text>
              <Box backgroundColor={'gray.700'} p={2} borderRadius={10} maxW={'70%'}>
                <Text>Kiedy kolos z matematyki?</Text>
              </Box>
            </VStack>
            <VStack spacing={0} alignItems={'baseline'}>
              <Text ml={1} fontSize={'xs'}>
                Marzena
              </Text>
              <Box backgroundColor={'gray.700'} p={2} borderRadius={10} maxW={'70%'}>
                <Text>Do kiedy jest termin wysyłania projektu z analizy matematycznej?</Text>
              </Box>
            </VStack>
          </Flex>
          <Flex w={'100%'} borderRadius={'10'} direction={'row'} alignItems={'baseline'} gap={1}>
            <Input placeholder='Wiadomość...' backgroundColor={'gray.800'} disabled mr={1} />
            <Button colorScheme={'blue'} disabled>
              Wyślij
            </Button>
          </Flex>
        </Flex>
        <Spacer />
      </Flex>
    </Flex>
  );
};

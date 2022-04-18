import { Flex, Spacer, Heading, SimpleGrid, GridItem, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ref } from 'yup';

interface Props {
  refProp: any;
}

export function Statistics(props: Props) {
  return (
    <Flex
      p={4}
      m={0}
      h={['100vh']}
      direction={'column'}
      textAlign={'center'}
      ref={props.refProp}
      backgroundColor={'gray.900'}
    >
      <Spacer />
      <Heading fontSize={'5xl'} mb={10}>
        Statystyki
      </Heading>
      <SimpleGrid columns={[1, 5]} gap={[30, 0]}>
        <GridItem d={['none', 'unset']} />
        <Box>
          <Heading fontSize={'8xl'}>214</Heading>
          <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
            użytkowników
          </Text>
        </Box>
        <Box>
          <Heading fontSize={'8xl'}>5</Heading>
          <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
            tablic
          </Text>
        </Box>
        <Box>
          <Heading fontSize={'8xl'}>976</Heading>
          <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
            wydarzeń
          </Text>
        </Box>
      </SimpleGrid>
      <Spacer />
    </Flex>
  );
}

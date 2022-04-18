import { Flex, Spacer, Heading, SimpleGrid, GridItem, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ref } from 'yup';
import { Parallax, useParallax } from 'react-scroll-parallax';

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
      <Parallax speed={10}>
        <Heading fontSize={'5xl'} mb={10}>
          Statystyki
        </Heading>
      </Parallax>

      <SimpleGrid columns={[1, 5]} gap={[30, 0]}>
        <GridItem d={['none', 'unset']} />
        <Parallax speed={15}>
          <Box>
            <Heading fontSize={'8xl'}>214</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
              użytkowników
            </Text>
          </Box>
        </Parallax>
        <Parallax speed={20}>
          <Box>
            <Heading fontSize={'8xl'}>5</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
              tablic
            </Text>
          </Box>
        </Parallax>
        <Parallax speed={25}>
          <Box>
            <Heading fontSize={'8xl'}>976</Heading>
            <Text fontSize={'3xl'} fontWeight={'light'} opacity={0.8}>
              wydarzeń
            </Text>
          </Box>
        </Parallax>
      </SimpleGrid>
      <Spacer />
    </Flex>
  );
}

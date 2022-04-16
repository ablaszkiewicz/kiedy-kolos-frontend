import { Box, Button, Flex, GridItem, Heading, Input, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { use100vh } from 'react-div-100vh';
import { scrollbarStyle } from '../components/dashboard/shared/styles';
import { Laptop } from '../components/landing/hero/Laptop';
import useFullHeight from '../hooks/useFullHeight';

export const LandingPage = () => {
  const fullHeight = useFullHeight();

  return (
    <>
      <Flex p={4} m={0} h={fullHeight} direction={['column', 'row']} overflow={'hidden'}>
        <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} order={[2, 1]} textAlign={'center'}>
          <Spacer />
          <Heading fontSize={'5xl'}>Skończ z tym</Heading>
          <Text fontSize={'2xl'} opacity={0.6} fontWeight={'light'} mb={10}>
            Wszystkie uczelniane wydarzenia w jednym miejscu
          </Text>
          <Button alignSelf={'center'} colorScheme={'pink'} size={'lg'}>
            Załóż swoją tablicę
          </Button>
          <Spacer />
        </Flex>
        <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} order={[1, 2]}>
          <Laptop />
        </Flex>
      </Flex>
      <Flex p={4} m={0} h={fullHeight!} direction={'column'} textAlign={'center'}>
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
    </>
  );
};

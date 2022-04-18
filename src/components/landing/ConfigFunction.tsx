import { Flex, Spacer, Heading, Button, Text, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useScrollPercentage } from 'react-scroll-percentage';
import { number } from 'yup/lib/locale';

export const ConfigFunction = () => {
  return (
    <Flex p={4} m={0} h={['100vh']} direction={['column', 'row']}>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} pl={[0, 24]} order={[2, 'unset']}>
        <Spacer />
        <Heading fontSize={'5xl'}>Konfiguracja</Heading>
        <Text fontSize={'2xl'} opacity={0.6} fontWeight={'light'} mb={10}>
          Potężny panel zarządzania. <br />
          Dodawanie przedmiotów, grup oraz przypisywanie administratorów.
        </Text>
        <Spacer />
      </Flex>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} alignItems={'center'} order={[1, 'unset']}>
        <Spacer />
        <Image src={'Config.png'} shadow={'dark-lg'} w={['100%', '80%']} />

        <Spacer />
      </Flex>
    </Flex>
  );
};

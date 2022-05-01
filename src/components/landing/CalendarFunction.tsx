import { Flex, Spacer, Heading, Button, Text, Image, Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Parallax, useParallax } from 'react-scroll-parallax';

export const CalendarFunction = () => {
  const { ref: imageParallax } = useParallax<any>({ speed: -10 });

  return (
    <Flex p={4} m={0} h={['100vh']} direction={['column', 'row']}>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} alignItems={'center'} order={[1, 'unset']}>
        <Spacer />
        <Image src={'Calendar.png'} shadow={'dark-lg'} w={['100%', '80%']} ref={imageParallax} />

        <Spacer />
      </Flex>
      <Flex h={['50%', '100%']} direction={'column'} w={['100%', '50%']} order={[2, 'unset']}>
        <Spacer />
        <Heading fontSize={'5xl'}>Porządek</Heading>
        <Text fontSize={'2xl'} opacity={0.6} fontWeight={'light'} mb={10}>
          Wszystkie wydarzenia uporządkowane w jednym miejscu. <br />
          Dodatkowo wszystko podzielone na grupy.
        </Text>

        <Spacer />
      </Flex>
    </Flex>
  );
};

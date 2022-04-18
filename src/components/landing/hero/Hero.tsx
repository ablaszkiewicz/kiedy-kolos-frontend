import { Flex, Spacer, Heading, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useScrollPercentage } from 'react-scroll-percentage';
import { number } from 'yup/lib/locale';
import useFullHeight from '../../../hooks/useFullHeight';
import { Laptop } from './Laptop';

interface Props {
  scrollPercentage: number;
}

export const Hero = (props: Props) => {
  const fullHeight = useFullHeight();
  const [fullWidth, setFullWidth] = useState(window.innerWidth);
  const modelOffset = Math.round(window.innerWidth / 4);

  useEffect(() => {
    window.addEventListener('resize', () => setFullWidth(window.innerWidth));
  }, []);
  return (
    <Flex p={4} m={0} h={fullHeight} direction={['column', 'row']} overflow={'hidden'} position={['unset', 'relative']}>
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
      <Flex
        h={['50%', '100%']}
        direction={'column'}
        w={fullWidth}
        order={[1, 2]}
        position={['unset', 'absolute']}
        left={['unset', modelOffset]}
        m={-4}
      >
        <Laptop percentageInView={props.scrollPercentage} />
      </Flex>
    </Flex>
  );
};
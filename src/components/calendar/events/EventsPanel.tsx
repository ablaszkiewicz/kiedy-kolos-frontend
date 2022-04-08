import { AddIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, Text } from '@chakra-ui/react';
import React from 'react';
export const EventsPanel = () => {
  return (
    <Flex
      w={['100%', '30%']}
      backgroundColor={'gray.750'}
      h={'100%'}
      shadow={'dark-lg'}
      borderRadius={10}
      p={7}
      direction={'column'}
      flexGrow={1}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Wydarzenia
        </Text>
        <Spacer />
        <Button variant={'ghost'} leftIcon={<AddIcon />}>
          Dodaj
        </Button>
      </Flex>
    </Flex>
  );
};

import { AddIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import useEvents from '../../../hooks/useEvents';
import { EventCreateModal } from './EventCreateModal';

export const EventsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { query } = useEvents();

  return (
    <>
      <EventCreateModal isOpen={isOpen} onClose={onClose} />
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
          <Button variant={'ghost'} onClick={onOpen} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

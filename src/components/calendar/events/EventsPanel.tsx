import { AddIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, Text, useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';
import useAdmin from '../../../hooks/useAdmin';

import useEvents from '../../../hooks/useEvents';
import useStore from '../../../zustand/store';
import { EventCreateModal } from './EventCreateModal';
import { EventListItem } from './EventListItem';

export const EventsPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const clickedDate = useStore((state) => state.clickedDate);
  const { getEventsForDate } = useEvents();
  const events = getEventsForDate(dayjs(clickedDate));
  const { isAdmin } = useAdmin();

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
        overflow={'hidden'}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'} display={['none', 'unset']}>
            Wydarzenia {dayjs(clickedDate).format('DD.MM')}
          </Text>
          <Text fontWeight={'bold'} fontSize={'2xl'} display={['unset', 'none']}>
            {dayjs(clickedDate).format('DD.MM')}
          </Text>
          <Spacer />
          {isAdmin && (
            <Button variant={'ghost'} onClick={onOpen} leftIcon={<AddIcon />}>
              Dodaj
            </Button>
          )}
        </Flex>
        <Flex direction={'column'} gap={2} overflowY={'auto'}>
          {events && events.map((event) => <EventListItem key={event.id} event={event} />)}
        </Flex>
      </Flex>
    </>
  );
};

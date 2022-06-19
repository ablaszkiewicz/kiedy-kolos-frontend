import { Flex, Spacer, HStack, Badge, Text, SlideFade } from '@chakra-ui/react';
import { generateKeyPair } from 'crypto';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Event } from '../../../entities/Event';
import useEvents from '../../../hooks/useEvents';
import useStore from '../../../zustand/store';

interface Props {
  date: Dayjs;
  monthOffset: number;
}

export function DayCard(props: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const setClickedDate = useStore((state) => state.setClickedDate);
  const { query, getEventsForDate } = useEvents();
  const currentMonth = dayjs().add(props.monthOffset, 'month').format('MM');
  const cardMonth = props.date.format('MM');
  const isInCurrentMonth: boolean = currentMonth === cardMonth;
  const today = dayjs().format('YYYY-MM-DD');
  const clickedDate = useStore((state) => state.clickedDate);

  useEffect(() => {
    setEvents(getEventsForDate(props.date));
  }, [query.data]);

  const backgroundColor = () => {
    let clickedDateFormatted = dayjs().format('YYYY-MM-DD');
    try {
      clickedDateFormatted = clickedDate.format('YYYY-MM-DD');
    } catch (e) {}

    // selected
    if (props.date.format('YYYY-MM-DD') === clickedDateFormatted) {
      return 'blue.400';
    }

    // today
    if (props.date.format('YYYY-MM-DD') === today) {
      return 'blue.800';
    }

    // in current month
    if (isInCurrentMonth) {
      return 'gray.700';
    }

    // not in current month
    return 'gray.740';
  };

  return (
    <Flex
      direction={'column'}
      align={'center'}
      borderRadius={10}
      backgroundColor={backgroundColor()}
      minHeight={'0px'}
      p={2}
      gap={0}
      minW={0}
      h={'100%'}
      cursor={'pointer'}
      onClick={() => setClickedDate(props.date)}
      _hover={{
        borderWidth: '3px',
      }}
      transition={'background-color 0.2s'}
    >
      <Spacer />
      <Text fontWeight={'medium'} fontSize={'md'} opacity={isInCurrentMonth ? 1 : 0.5}>
        {props.date.format('DD')}
      </Text>
      {events && (
        <HStack spacing={0.5} flexWrap={'wrap'} gap={1} justifyContent={'center'}>
          {events.map((event) => (
            <Badge variant={'solid'} colorScheme={'red'} key={event.id}>
              {event.subject.shortName}
            </Badge>
          ))}
        </HStack>
      )}

      <Spacer />
    </Flex>
  );
}

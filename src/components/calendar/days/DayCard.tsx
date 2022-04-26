import { Flex, Spacer, HStack, Badge, Text, SlideFade } from '@chakra-ui/react';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Event } from '../../../entities/Event';
import useEvents from '../../../hooks/useEvents';
import useStore from '../../../zustand/store';

interface Props {
  date: Dayjs;
  monthOffset: number;
  direction: number;
}

export function DayCard(props: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const setClickedDate = useStore((state) => state.setClickedDate);
  const { getEventsForDate } = useEvents();
  const currentMonth = dayjs().add(props.monthOffset, 'month').format('MM');
  const cardMonth = props.date.format('MM');
  const isInCurrentMonth: boolean = currentMonth === cardMonth;
  const today = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    setEvents(getEventsForDate(props.date));
  });

  return (
    <SlideFade in={true} offsetX={100 * props.direction} offsetY={0}>
      <Flex
        direction={'column'}
        align={'center'}
        borderRadius={10}
        backgroundColor={
          dayjs(props.date).format('YYYY-MM-DD') === today ? 'blue.600' : isInCurrentMonth ? 'gray.700' : 'gray.740'
        }
        minHeight={'0px'}
        p={2}
        gap={0}
        minW={0}
        h={'100%'}
        cursor={'pointer'}
        onClick={() => setClickedDate(props.date)}
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
    </SlideFade>
  );
}

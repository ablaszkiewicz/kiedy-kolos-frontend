import { Flex, Spacer, HStack, Badge, Text, SlideFade } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Event } from '../../../entities/Event';
import useEvents from '../../../hooks/useEvents';

interface Props {
  day: string;
  monthOffset: number;
  direction: number;
}

export function DayCard(props: Props) {
  const { getEventsForDate } = useEvents();
  const currentMonth = dayjs().add(props.monthOffset, 'month').format('MM');
  const cardMonth = dayjs(props.day).format('MM');
  const isInCurrentMonth: boolean = currentMonth === cardMonth;
  const today = dayjs().format('YYYY-MM-DD');

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(getEventsForDate(dayjs(props.day)));
  });

  return (
    <SlideFade in={true} offsetX={100 * props.direction} offsetY={0}>
      <Flex
        direction={'column'}
        align={'center'}
        borderRadius={10}
        backgroundColor={props.day === today ? 'blue.600' : isInCurrentMonth ? 'gray.700' : 'gray.740'}
        minHeight={'0px'}
        p={2}
        gap={0}
        minW={0}
        h={'100%'}
      >
        <Spacer />
        <Text fontWeight={'medium'} fontSize={'md'} opacity={isInCurrentMonth ? 1 : 0.5}>
          {dayjs(props.day).format('DD')}
        </Text>
        {events && (
          <HStack spacing={1}>
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

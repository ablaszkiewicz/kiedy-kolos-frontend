import { Flex, Spacer, HStack, Badge, Text, SlideFade } from '@chakra-ui/react';
import { generateKeyPair } from 'crypto';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Event, getEventStatusColor } from '../../../entities/Event';
import useEvents, { EVENTS_QUERY_KEY } from '../../../hooks/useEvents';
import useStore from '../../../zustand/store';

interface Props {
  date: Dayjs;
  monthOffset: number;
}

export function DayCard(props: Props) {
  const { yearCourseId } = useParams();
  const setClickedDate = useStore((state) => state.setClickedDate);
  const { getEvents, getEventsForDate } = useEvents();
  const currentMonth = dayjs().add(props.monthOffset, 'month').format('MM');
  const cardMonth = props.date.format('MM');
  const isInCurrentMonth = currentMonth === cardMonth;
  const today = dayjs().format('YYYY-MM-DD');
  const clickedDate = useStore((state) => state.clickedDate);

  const eventsQuery = useQuery(EVENTS_QUERY_KEY, () => getEvents(yearCourseId!));

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
      borderWidth={3}
      borderColor={backgroundColor()}
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
        borderColor: 'gray.600',
      }}
      transition={'background-color 0.2s'}
    >
      <Spacer />
      <Text fontWeight={'medium'} fontSize={['xs', 'md']} opacity={isInCurrentMonth ? 1 : 0.5}>
        {props.date.format('DD')}
      </Text>

      <HStack spacing={0.5} flexWrap={'wrap'} gap={1} justifyContent={'center'}>
        {eventsQuery.data &&
          getEventsForDate(props.date, eventsQuery.data)?.map((event) => (
            <Badge variant={'solid'} colorScheme={getEventStatusColor(event.status)} key={event.id}>
              {event.subject.shortName}
            </Badge>
          ))}
      </HStack>

      <Spacer />
    </Flex>
  );
}

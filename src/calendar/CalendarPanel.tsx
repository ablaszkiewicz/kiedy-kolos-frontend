import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, SimpleGrid, Spacer, Grid, Text, IconButton, GridItem, Center, SlideFade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DayCard } from '../components/calendar/DayCard';
import useCalendar from '../hooks/useCalendar';
import { useSetState } from '../hooks/useSetState';

interface State {
  days: string[];
  offset: number;
  direction: number;
}

export const CalendarPanel = () => {
  const dayNames = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nie'];

  const [state, setState] = useSetState({
    days: [],
    offset: 0,
    direction: 1,
  } as State);

  const { getDaysInMonth, getMonthName } = useCalendar();

  useEffect(() => {
    setState({ days: getDaysInMonth(state.offset) });
  }, [state.offset]);

  return (
    <Flex
      direction={'column'}
      w={'70%'}
      h={'100%'}
      borderRadius={10}
      p={4}
      backgroundColor={'gray.750'}
      shadow={'dark-lg'}
    >
      <SimpleGrid columns={7} gap={2} mb={2}>
        {dayNames.map((name) => (
          <Flex key={name}>
            <Spacer />
            <Text opacity={0.6}>{name}</Text>
            <Spacer />
          </Flex>
        ))}
      </SimpleGrid>
      <Grid
        templateColumns={'repeat(7, 1fr)'}
        templateRows={'repeat(6, 1fr)'}
        gap={2}
        flexGrow={1}
        minHeight={0}
        overflow={'hidden'}
      >
        {state.days.map((day) => (
          <DayCard day={day} monthOffset={state.offset} direction={state.direction} key={state.offset + day} />
        ))}
        <GridItem colSpan={3} h={'100%'} my={'auto'}>
          <Center gap={4} backgroundColor={'gray.720'} borderRadius={10} h={'100%'}>
            <Spacer />
            <IconButton
              aria-label='left'
              icon={<ArrowBackIcon />}
              onClick={() => {
                setState({ offset: state.offset - 1 });
                setState({ direction: -1 });
              }}
            />
            <Text fontWeight={'medium'} fontSize={'2xl'} textAlign={'center'} width={'30%'}>
              {getMonthName(state.offset)}
            </Text>
            <IconButton
              aria-label='left'
              icon={<ArrowForwardIcon />}
              onClick={() => {
                setState({ offset: state.offset + 1 });
                setState({ direction: 1 });
              }}
            />
            <Spacer />
          </Center>
        </GridItem>
      </Grid>
    </Flex>
  );
};

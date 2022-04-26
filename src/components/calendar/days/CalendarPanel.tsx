import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex, SimpleGrid, Spacer, Grid, Text, IconButton, GridItem, Center, SlideFade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DayCard } from './DayCard';
import useCalendar from '../../../hooks/useCalendar';
import { useSetState } from '../../../hooks/useSetState';
import dayjs from 'dayjs';

enum SlideDirection {
  LEFT = -1,
  RIGHT = 1,
}

interface State {
  days: string[];
  monthOffset: number;
  direction: SlideDirection;
}

export const CalendarPanel = () => {
  const dayNames = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nie'];

  const [state, setState] = useSetState({
    days: [],
    monthOffset: 0,
    direction: SlideDirection.RIGHT,
  } as State);

  const { getDaysInMonth, getMonthName } = useCalendar();

  useEffect(() => {
    setState({ days: getDaysInMonth(state.monthOffset) });
  }, [state.monthOffset]);

  return (
    <Flex
      direction={'column'}
      w={['100%', '70%']}
      h={['60vh', '100%']}
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
          <DayCard
            date={dayjs(day)}
            monthOffset={state.monthOffset}
            direction={state.direction}
            key={state.monthOffset + day}
          />
        ))}
        <GridItem colSpan={3} h={'100%'} my={'auto'}>
          <Center gap={4} backgroundColor={'gray.720'} borderRadius={10} h={'100%'}>
            <Spacer />
            <IconButton
              aria-label='left'
              icon={<ArrowBackIcon />}
              onClick={() => {
                setState({ monthOffset: state.monthOffset - 1 });
                setState({ direction: SlideDirection.LEFT });
              }}
            />
            <Text fontWeight={'medium'} fontSize={'2xl'} textAlign={'center'} width={'30%'}>
              {getMonthName(state.monthOffset)}
            </Text>
            <IconButton
              aria-label='left'
              icon={<ArrowForwardIcon />}
              onClick={() => {
                setState({ monthOffset: state.monthOffset + 1 });
                setState({ direction: SlideDirection.RIGHT });
              }}
            />
            <Spacer />
          </Center>
        </GridItem>
      </Grid>
    </Flex>
  );
};

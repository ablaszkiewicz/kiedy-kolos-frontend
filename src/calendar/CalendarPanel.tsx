import { Flex, SimpleGrid, Spacer, Grid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DayCard } from '../components/calendar/DayCard';
import useCalendar from '../hooks/useCalendar';

export const CalendarPanel = () => {
  const [days, setDays] = useState<string[]>([]);
  const dayNames = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nie'];

  const { getDaysInMonth } = useCalendar();
  useEffect(() => {
    setDays(getDaysInMonth(0));
  }, []);

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
      <Grid templateColumns={'repeat(7, 1fr)'} templateRows={'repeat(6, 1fr)'} gap={2} flexGrow={1} minHeight={0}>
        {days.map((day) => (
          <DayCard day={day} monthOffset={0} key={day} />
        ))}
      </Grid>
    </Flex>
  );
};

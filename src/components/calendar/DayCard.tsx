import { Flex, Spacer, HStack, Badge, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React from 'react';
export function DayCard({ day, monthOffset }: any) {
  const currentMonth = dayjs().add(monthOffset, 'month').format('MM');
  const monthThisCardIsIn = dayjs(day).format('MM');
  const isInCurrentMonth = currentMonth === monthThisCardIsIn;
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <Flex
      direction={'column'}
      align={'center'}
      borderRadius={10}
      backgroundColor={day === today ? 'blue.600' : isInCurrentMonth ? 'gray.700' : 'gray.740'}
      //shadow={i == 16 ? 'md' : 'inner'}
      minHeight={'0px'}
      p={2}
      gap={0}
      minW={0}
    >
      <Spacer />
      <Text fontWeight={'medium'} fontSize={'2xl'} opacity={isInCurrentMonth ? 1 : 0.5}>
        {dayjs(day).format('DD')}
      </Text>
      <HStack spacing={1}>
        {day.events &&
          day.events.map((event: any) => (
            <Badge variant={'solid'} colorScheme={event.bg}>
              Ako
            </Badge>
          ))}
      </HStack>
      <Spacer />
    </Flex>
  );
}

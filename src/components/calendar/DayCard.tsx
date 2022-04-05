import { Flex, Spacer, HStack, Badge, Text, SlideFade } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface Props {
  day: string;
  monthOffset: number;
  direction: number;
}

export function DayCard(props: Props) {
  const currentMonth = dayjs().add(props.monthOffset, 'month').format('MM');
  const monthThisCardIsIn = dayjs(props.day).format('MM');
  const isInCurrentMonth = currentMonth === monthThisCardIsIn;
  const today = dayjs().format('YYYY-MM-DD');

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
        <Text fontWeight={'medium'} fontSize={'2xl'} opacity={isInCurrentMonth ? 1 : 0.5}>
          {dayjs(props.day).format('DD')}
        </Text>
        <HStack spacing={1}>
          <Badge variant={'solid'} colorScheme={'red'}>
            Ako
          </Badge>
        </HStack>
        <Spacer />
      </Flex>
    </SlideFade>
  );
}

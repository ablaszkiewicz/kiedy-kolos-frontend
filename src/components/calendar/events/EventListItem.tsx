import { Badge, Flex, Text } from '@chakra-ui/react';
import { Event } from '../../../entities/Event';
import { BsClockFill, BsDot, BsFillHouseDoorFill } from 'react-icons/bs';
import dayjs from 'dayjs';

interface Props {
  event: Event;
}

export const EventListItem = (props: Props) => {
  return (
    <Flex w={'100%'} gap={2} backgroundColor={'gray.700'} direction={'column'} p={5} borderRadius={10}>
      <Flex justifyContent={'space-between'}>
        <Text fontWeight={'semibold'} fontSize={'lg'} lineHeight={1}>
          {props.event.subject.name}
        </Text>
        <Badge colorScheme={'red'} variant={'solid'}>
          egzamin
        </Badge>
      </Flex>

      <Flex>
        <Flex direction={'column'} w={'30%'} fontSize={'sm'} color={'gray.300'}>
          <Flex gap={2} alignItems={'center'}>
            <BsFillHouseDoorFill />
            <Text>NE AUD P1</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} fontSize={'sm'} color={'gray.300'}>
            <BsClockFill />
            <Text>{dayjs(props.event.date).format('hh:mm')}</Text>
          </Flex>
        </Flex>
        <Text w={'70%'}>To jest opis danego wydarzenia</Text>
      </Flex>
    </Flex>
  );
};

import { Flex, Text } from '@chakra-ui/react';
import { Event } from '../../../entities/Event';
import { BsClockFill, BsDot, BsFillHouseDoorFill } from 'react-icons/bs';

interface Props {
  event: Event;
}

export const EventListItem = (props: Props) => {
  return (
    <Flex w={'100%'} gap={2} backgroundColor={'gray.700'} direction={'column'} p={3} borderRadius={10}>
      <Text fontWeight={'semibold'} fontSize={'lg'}>
        {props.event.subject.name}
      </Text>
      <Flex>
        <Flex direction={'column'} w={'30%'} fontSize={'sm'} color={'gray.400'}>
          <Flex gap={2} alignItems={'center'}>
            <BsFillHouseDoorFill />
            <Text>NE AUD P1</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} fontSize={'sm'} color={'gray.400'}>
            <BsClockFill />
            <Text>14:30</Text>
          </Flex>
          <Flex gap={2} alignItems={'center'} fontSize={'sm'} color={'gray.400'}>
            <BsDot />
            <Text>Kolokwium</Text>
          </Flex>
        </Flex>
        <Text w={'70%'}>To jest opis danego wydarzenia</Text>
      </Flex>
    </Flex>
  );
};

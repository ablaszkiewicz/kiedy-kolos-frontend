import { Badge, Flex, IconButton, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Event } from '../../../entities/Event';
import { BsClockFill, BsDot, BsFillHouseDoorFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import { DeleteIcon } from '@chakra-ui/icons';
import { EventDeleteModal } from './EventDeleteModal';
import { EventEditModal } from './EventEditModal';

interface Props {
  event: Event;
}

export const EventListItem = (props: Props) => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  return (
    <>
      <EventEditModal isOpen={isEditModalOpen} onClose={onEditModalClose} event={props.event} />
      <EventDeleteModal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose} event={props.event} />
      <Flex
        w={'100%'}
        gap={2}
        backgroundColor={'gray.700'}
        direction={'column'}
        p={5}
        borderRadius={10}
        onClick={onEditModalOpen}
        cursor={'pointer'}
      >
        <Flex align={'self-start'}>
          <Text fontWeight={'semibold'} fontSize={'lg'} lineHeight={1}>
            {props.event.subject.name}
          </Text>
          <Spacer />
          <Badge colorScheme={'red'} variant={'solid'}>
            egzamin
          </Badge>
          {/* <IconButton aria-label='Delete' icon={<DeleteIcon />} ml={4} onClick={onDeleteModalOpen} /> */}
        </Flex>

        <Flex>
          <Flex direction={'column'} w={'30%'} fontSize={'sm'} color={'gray.300'}>
            <Flex gap={2} alignItems={'center'}>
              <BsFillHouseDoorFill />
              <Text>NE AUD P1</Text>
            </Flex>
            <Flex gap={2} alignItems={'center'} fontSize={'sm'} color={'gray.300'}>
              <BsClockFill />
              <Text>{dayjs(props.event.date).utc().format('hh:mm')}</Text>
            </Flex>
          </Flex>
          <Text w={'70%'}>To jest opis danego wydarzenia</Text>
        </Flex>
      </Flex>
    </>
  );
};

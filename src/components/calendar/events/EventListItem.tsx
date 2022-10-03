import { Badge, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { Event, getEventStatusColor, getEventStatusText, Status } from '../../../entities/Event';
import { BsClockFill, BsDot, BsFillHouseDoorFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { EventDeleteModal } from './EventDeleteModal';
import { EventEditModal } from './EventEditModal';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { EventStatusMenu } from './EventStatusMenu';

interface Props {
  event: Event;
}

export const EventListItem = (props: Props) => {
  const { isAdmin } = useRole();
  const { isLoggedIn } = useAuth();

  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  const editEvent = () => {
    if (isAdmin) {
      onEditModalOpen();
    }
  };

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
        onClick={editEvent}
        cursor={'pointer'}
        _hover={{
          backgroundColor: 'gray.600',
        }}
        transitionDuration={'0.1s'}
      >
        <Flex align={'self-start'}>
          <Text fontWeight={'semibold'} fontSize={'lg'} lineHeight={1}>
            {props.event.subject.name}
          </Text>
          <Spacer />

          {isLoggedIn && <EventStatusMenu event={props.event} />}
        </Flex>

        <Flex>
          <Flex direction={'column'} w={'30%'} fontSize={'sm'} color={'gray.300'}>
            {props.event.room.length > 0 && (
              <Flex gap={2} alignItems={'center'}>
                <BsFillHouseDoorFill />
                <Text>{props.event.room}</Text>
              </Flex>
            )}
            <Flex gap={2} alignItems={'center'} fontSize={'sm'} color={'gray.300'}>
              <BsClockFill />
              <Text>{dayjs(props.event.date).utc().format('HH:mm')}</Text>
            </Flex>
            {/* <Badge colorScheme={'gray'} variant={'solid'} mr={2} alignSelf={'flex-start'} mt={1}>
              egzamin
            </Badge> */}
          </Flex>
          <Text w={'70%'}>{props.event.description}</Text>
        </Flex>
      </Flex>
    </>
  );
};

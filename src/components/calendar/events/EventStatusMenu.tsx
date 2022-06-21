import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, Badge, MenuList, MenuItem } from '@chakra-ui/react';
import { getStatusText } from 'http-status-codes';
import { Event, getEventStatusColor, getEventStatusText, Status } from '../../../entities/Event';
import useEvents from '../../../hooks/useEvents';

interface Props {
  event: Event;
}

export const EventStatusMenu = (props: Props) => {
  const { updateStatusMutation } = useEvents();

  const updateEventStatus = (status: Status) => {
    updateStatusMutation.mutate({ eventId: props.event.id, status });
  };

  return (
    <Menu>
      <MenuButton
        as={Badge as any}
        colorScheme={getEventStatusColor(props.event.status)}
        variant={'solid'}
        onClick={(e) => e.stopPropagation()}
      >
        {getEventStatusText(props.event.status)} <ChevronDownIcon mb={1} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            updateEventStatus(Status.NEW);
          }}
        >
          {getEventStatusText(Status.NEW)}
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            updateEventStatus(Status.COMPLETED);
          }}
        >
          {getEventStatusText(Status.COMPLETED)}
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            updateEventStatus(Status.NOT_APPLICABLE);
          }}
        >
          {getEventStatusText(Status.NOT_APPLICABLE)}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

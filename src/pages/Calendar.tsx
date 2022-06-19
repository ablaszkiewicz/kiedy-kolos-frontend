import { CalendarPanel } from '../components/calendar/days/CalendarPanel';
import { EventsPanel } from '../components/calendar/events/EventsPanel';
import useAuth from '../hooks/useAuth';
import { Flex } from '@chakra-ui/react';
import { Navbar } from '../components/navbar/Navbar';
import { CalendarViewNavbar } from '../components/navbar/CalendarViewNavbar';

export const Calendar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Flex p={[2, 4]} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      {isLoggedIn && <Navbar pageTitle={'Kalendarz'} />}
      {!isLoggedIn && <CalendarViewNavbar />}

      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel />
        <EventsPanel />
      </Flex>
    </Flex>
  );
};

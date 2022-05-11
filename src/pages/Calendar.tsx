import { useNavigate, useParams } from 'react-router-dom';
import { CalendarPanel } from '../components/calendar/days/CalendarPanel';
import { EventsPanel } from '../components/calendar/events/EventsPanel';
import useAuth from '../hooks/useAuth';
import { Path } from '../other/Paths';
import { MdDashboard } from 'react-icons/md';
import { HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { Flex, Heading, Spacer, Button, Text } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { Navbar } from '../components/navbar/Navbar';

export const Calendar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { yearCourseId } = useParams();

  return (
    <Flex p={[2, 4]} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      <Navbar pageTitle={'Kalendarz'} />

      <Flex flexGrow={1} gap={[2, 2, 4]} direction={['column', 'row']} overflow={'hidden'} m={-10} p={10}>
        <CalendarPanel />
        <EventsPanel />
      </Flex>
    </Flex>
  );
};

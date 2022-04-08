import { useNavigate, useParams } from 'react-router-dom';
import { CalendarPanel } from '../components/calendar/days/CalendarPanel';
import { EventsPanel } from '../components/calendar/events/EventsPanel';
import useAuth from '../hooks/useAuth';
import { Path } from '../other/Paths';
import { MdDashboard } from 'react-icons/md';
import { HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';
import { Flex, Heading, Spacer, Button, Text } from '@chakra-ui/react';

export const Calendar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { yearCourseId } = useParams();

  return (
    <Flex p={4} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Kalendarz</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.DASHBOARD + `/${yearCourseId}`)} leftIcon={<MdDashboard />}>
          <Text display={['none', 'unset']}>Panel zarządzania</Text>
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
          <Text display={['none', 'unset']}>Wybór kierunku</Text>
        </Button>
        <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
          <Text display={['none', 'unset']}>Wyloguj</Text>
        </Button>
      </Flex>

      <Flex flexGrow={1} gap={4} direction={['column', 'row']}>
        <CalendarPanel />
        <EventsPanel />
      </Flex>
    </Flex>
  );
};

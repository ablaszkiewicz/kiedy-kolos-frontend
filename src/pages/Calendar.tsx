import { AddIcon, ArrowBackIcon, HamburgerIcon, SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarPanel } from '../calendar/CalendarPanel';
import { EventsPanel } from '../components/calendar/EventsPanel';
import useAuth from '../hooks/useAuth';
import { Path } from '../other/Paths';

export const Calendar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { yearCourseId } = useParams();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Kalendarz</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.DASHBOARD + `/${yearCourseId}`)} leftIcon={<HamburgerIcon />}>
          Panel zarządzania
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>

      <HStack flexGrow={1} spacing={4}>
        <CalendarPanel />
        <EventsPanel />
      </HStack>
    </Flex>
  );
};

import { Button, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';
import { ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';
import { Path } from '../other/Paths';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { SubjectsPanel } from '../components/dashboard/subjects/SubjectsPanel';
import { GroupsPanel } from '../components/dashboard/groups/GroupsPanel';
import { RolesPanel } from '../components/dashboard/roles/RolesPanel';
import { SettingsPanel } from '../components/dashboard/settings/SettingsPanel';
import { HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { yearCourseId } = useParams();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Panel zarządzania</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.CALENDAR + `/${yearCourseId}`)} leftIcon={<CalendarIcon />}>
          Kalendarz
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
          Wyloguj
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 1, 3]} h={'100%'} overflowY={'hidden'} spacing={4} p={5} m={-5}>
        <SubjectsPanel />
        <GroupsPanel />
        <Flex direction={'column'} gap={4} overflowY={'hidden'} p={5} m={-5}>
          <RolesPanel />
          <SettingsPanel />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

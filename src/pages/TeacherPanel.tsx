import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import useStore from '../zustand/store';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Path } from '../other/Paths';
import { SubjectsPanel } from '../components/admin/subjects/SubjectsPanel';
import { SettingsPanel } from '../components/admin/settings/SettingsPanel';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { CalendarPanel } from '../components/admin/calendar/CalendarPanel';

export const TeacherPanel = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Flex p={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={4} mb={0} p={1}>
        <Heading>Kalendarz</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>

      <Tabs isLazy display={'flex'} flexDir={'column'} flexGrow={1} overflow={'hidden'} p={10} m={-10}>
        {/* <TabList px={5}>
          <Tab>Kalendarz</Tab>
          <Tab>Przedmioty i grupy</Tab>
          <Tab>Ustawienia</Tab>
        </TabList> */}

        <TabPanels display={'flex'} flexGrow={1} overflow={'hidden'}>
          <TabPanel display={'flex'} flexDir={'column'} flexGrow={1} overflow={'hidden'}>
            <CalendarPanel />
          </TabPanel>
          <TabPanel display={'flex'} flexDir={'column'} flexGrow={1} overflow={'hidden'}>
            <SimpleGrid columns={[1, 2, 2, 3]} gap={6} p={4} m={-4} flexGrow={1} overflow={'hidden'}>
              <SubjectsPanel />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

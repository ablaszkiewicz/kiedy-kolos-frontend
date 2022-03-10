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
import useYearCourses, { YearCourseType } from '../hooks/useYearCourses';
import { Path } from '../other/Paths';
import { SubjectsPanel } from '../components/admin/subjects/SubjectsPanel';
import { SettingsPanel } from '../components/admin/settings/SettingsPanel';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const TeacherPanel = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Flex p={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex mb={5} p={5} pb={0}>
        <Heading>Panel starosty {user.email}</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <ColorModeSwitcher />
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>

      <Tabs isLazy display={'flex'} flexDir={'column'} flexGrow={1} overflow={'hidden'} p={10} m={-10}>
        <TabList px={5}>
          <Tab>Kalendarz</Tab>
          <Tab>Grupy</Tab>
          <Tab>Przedmioty</Tab>
          <Tab>Ustawienia</Tab>
        </TabList>

        <TabPanels display={'flex'} flexGrow={1} overflow={'hidden'}>
          <TabPanel>
            <p>Kalendarz</p>
          </TabPanel>
          <TabPanel>
            <p>Grupy</p>
          </TabPanel>
          <TabPanel display={'flex'} flexDir={'column'} flexGrow={1} overflow={'hidden'}>
            <SimpleGrid columns={[1, 2, 2, 3]} gap={6} p={5} m={-4} flexGrow={1} overflow={'hidden'}>
              <SubjectsPanel />
              <SubjectsPanel />
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

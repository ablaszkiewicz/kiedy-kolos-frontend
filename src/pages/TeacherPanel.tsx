import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Box, Heading, Button, Select } from '@chakra-ui/react';
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
    <Box p={5}>
      <Flex mb={5}>
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
      <Tabs isLazy>
        <TabList>
          <Tab>Kalendarz</Tab>
          <Tab>Grupy</Tab>
          <Tab>Przedmioty</Tab>
          <Tab>Ustawienia</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Kalendarz</p>
          </TabPanel>
          <TabPanel>
            <p>Grupy</p>
          </TabPanel>
          <TabPanel>
            <SubjectsPanel />
          </TabPanel>
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

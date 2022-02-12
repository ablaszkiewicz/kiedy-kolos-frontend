import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Box, Heading, Button, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubjectsPanel } from '../components/other/admin/subjects/SubjectsPanel';
import useStore from '../zustand/store';
import { ColorModeSwitcher } from '../components/other/other/ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const TeacherPanel = () => {
  const user = useStore((state) => state.user);
  const logoutUser = useStore((state) => state.logoutUser);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [user]);

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading>Panel starosty {user.email}</Heading>
        <Spacer />
        <Select flexBasis={0} flexGrow={0.5} flexShrink={2}>
          <option>Kierunek 1</option>
          <option>Kierunek 2</option>
        </Select>
        <ColorModeSwitcher />
        <Button ml={3} onClick={() => logoutUser()}>
          Wyloguj
        </Button>
      </Flex>
      <Tabs isLazy>
        <TabList>
          <Tab>Kalendarz</Tab>
          <Tab>Grupy</Tab>
          <Tab>Przedmioty</Tab>
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
        </TabPanels>
      </Tabs>
    </Box>
  );
};

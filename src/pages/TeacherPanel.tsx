import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Spacer,
  Text,
  Button,
  Center,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubjectsPanel } from '../components/other/teacher/subjects/SubjectsPanel';
import axios from 'axios';
import useStore from '../zustand/store';
import { ColorModeSwitcher } from '../components/other/other/ColorModeSwitcher';

export const TeacherPanel = () => {
  const login = useStore((state) => state.loginUser);
  const email = useStore((state) => state.user.email);

  useEffect(() => {
    tryLogin();
  }, []);

  const tryLogin = async () => {
    //const { data } = await axios.get('login', { headers: { Authorization: `Bearer ${'abc'}` } });
    const { data } = await axios.post('auth/login', { email: 'anna@pg.edu.pl', password: '123' });
    login(data.email, data.token);
  };

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading>Panel nauczyciela</Heading>
        <Spacer />
        <ColorModeSwitcher justifySelf='flex-end' />
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

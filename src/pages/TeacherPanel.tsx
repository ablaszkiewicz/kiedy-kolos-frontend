import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Text, Button, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubjectsPanel } from '../components/other/teacher/subjects/SubjectsPanel';
import axios from 'axios';

export const TeacherPanel = () => {
  useEffect(() => {
    tryLogin();
  }, []);

  const tryLogin = async () => {
    //const { data } = await axios.get('login', { headers: { Authorization: `Bearer ${'abc'}` } });
    const { data } = await axios.post('auth/login', { email: 'anna@pg.edu.pl', password: '123' });
    console.log(data);
  };

  return (
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
  );
};

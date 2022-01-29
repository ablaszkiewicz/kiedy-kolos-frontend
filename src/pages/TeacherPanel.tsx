import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Box, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubjectsPanel } from '../components/other/teacher/subjects/SubjectsPanel';
import useStore from '../zustand/store';
import { ColorModeSwitcher } from '../components/other/other/ColorModeSwitcher';
import { useNavigate } from 'react-router-dom';

export const TeacherPanel = () => {
  const email = useStore((state) => state.user.email);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.token === null || user.email === null) {
      navigate('/login');
    }
  }, [user]);

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading>Panel nauczyciela {email}</Heading>
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

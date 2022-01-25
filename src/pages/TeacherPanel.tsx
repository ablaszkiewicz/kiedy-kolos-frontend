import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Text, Button, Center } from '@chakra-ui/react';
import { SubjectsPanel } from '../components/other/teacher/subjects/SubjectsPanel';

export const TeacherPanel = () => (
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

import { Button, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';
import { SubjectsPanel } from '../components/dashboard/subjects/SubjectsPanel';
import { GroupsPanel } from '../components/dashboard/groups/GroupsPanel';
import { RolesPanel } from '../components/dashboard/roles/RolesPanel';
import { SettingsPanel } from '../components/dashboard/settings/SettingsPanel';
import { Navbar } from '../components/navbar/Navbar';

export const Dashboard = () => {
  return (
    <Flex p={4} m={0} h={['unset', '100vh']} direction={'column'} overflow={'hidden'}>
      <Navbar pageTitle={'Panel zarządzania'} />
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

import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon, CalendarIcon } from '@chakra-ui/icons';
import { SubjectCreateModal } from '../components/admin/subjects/SubjectCreateModal';
import { SubjectListItem } from '../components/admin/subjects/SubjectListItem';
import { SubjectType } from '../entities/Subject';
import useSubjects from '../hooks/useSubjects';
import { Path } from '../other/Paths';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { SubjectsPanel } from '../components/admin/subjects/SubjectsPanel';
import { GroupsPanel } from '../components/admin/groups/GroupsPanel';
import { RolesPanel } from '../components/admin/roles/RolesPanel';
import { SettingsPanel } from '../components/admin/settings/SettingsPanel';

export const Settings = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query } = useSubjects();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { yearCourseId } = useParams();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Ustawienia</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.CALENDAR + `/${yearCourseId}`)} leftIcon={<CalendarIcon />}>
          Kalendarz
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>
      <SimpleGrid columns={3} flexGrow={1} overflowY={'hidden'} spacing={4} p={5} m={-5}>
        <SubjectsPanel />
        <GroupsPanel />
        <Flex direction={'column'} gap={4}>
          <RolesPanel />
          <SettingsPanel />
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '24px',
  },
};

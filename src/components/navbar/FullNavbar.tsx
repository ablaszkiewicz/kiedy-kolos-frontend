import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, Heading, Spacer, Button, Text, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Path } from '../../other/Paths';
import { SiHackaday } from 'react-icons/si';
import useAdmin from '../../hooks/useAdmin';

interface Props {
  pageTitle: string;
}

export const FullNavbar = (props: Props) => {
  const navigate = useNavigate();
  const { yearCourseId } = useParams();
  const { logout } = useAuth();
  const { isAdmin } = useAdmin();

  return (
    <Flex m={0} p={0} mb={2}>
      <Heading>{props.pageTitle}</Heading>
      <Spacer />
      <Button
        ml={3}
        onClick={() => navigate(Path.CTF)}
        leftIcon={<SiHackaday />}
        colorScheme={props.pageTitle === 'CTF' ? 'blue' : 'gray'}
      >
        <Text>CTF</Text>
      </Button>
      <Button
        ml={3}
        onClick={() => navigate(Path.CALENDAR + `/${yearCourseId}`)}
        leftIcon={<CalendarIcon />}
        colorScheme={props.pageTitle === 'Kalendarz' ? 'blue' : 'gray'}
      >
        <Text>Kalendarz</Text>
      </Button>
      {isAdmin && (
        <Button
          ml={3}
          onClick={() => navigate(Path.DASHBOARD + `/${yearCourseId}`)}
          leftIcon={<MdDashboard />}
          colorScheme={props.pageTitle === 'Panel zarządzania' ? 'blue' : 'gray'}
        >
          <Text>Panel zarządzania</Text>
        </Button>
      )}

      <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
        <Text>Wybór kierunku</Text>
      </Button>
      <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
        <Text>Wyloguj</Text>
      </Button>
    </Flex>
  );
};

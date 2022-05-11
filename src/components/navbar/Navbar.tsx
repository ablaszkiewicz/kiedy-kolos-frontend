import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, Heading, Spacer, Button, Text } from '@chakra-ui/react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Path } from '../../other/Paths';

interface Props {
  pageTitle: string;
}

export const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { yearCourseId } = useParams();
  const { logout } = useAuth();

  return (
    <Flex m={0} p={0} mb={2}>
      <Heading>{props.pageTitle}</Heading>
      <Spacer />
      <Button
        onClick={() => navigate(Path.CALENDAR + `/${yearCourseId}`)}
        leftIcon={<CalendarIcon />}
        colorScheme={props.pageTitle === 'Kalendarz' ? 'blue' : 'gray'}
      >
        <Text display={['none', 'unset']}>Kalendarz</Text>
      </Button>
      <Button
        ml={3}
        onClick={() => navigate(Path.DASHBOARD + `/${yearCourseId}`)}
        leftIcon={<MdDashboard />}
        colorScheme={props.pageTitle === 'Panel zarządzania' ? 'blue' : 'gray'}
      >
        <Text display={['none', 'unset']}>Panel zarządzania</Text>
      </Button>
      <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
        <Text display={['none', 'unset']}>Wybór kierunku</Text>
      </Button>
      <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
        <Text display={['none', 'unset']}>Wyloguj</Text>
      </Button>
    </Flex>
  );
};

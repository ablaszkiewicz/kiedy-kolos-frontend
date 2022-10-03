import { CalendarIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Flex,
  Spacer,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Path } from '../../other/Paths';
import { SiHackaday } from 'react-icons/si';
import { BsHeart } from 'react-icons/bs';
import useRole from '../../hooks/useRole';
import useYearCourses from '../../hooks/useYearCourses';

interface Props {
  pageTitle: string;
}

export const MobileNavbar = (props: Props) => {
  const navigate = useNavigate();
  const { yearCourseId } = useParams();
  const { isAdmin, isUser } = useRole();
  const { logout } = useAuth();

  const { addUserMutation, deleteUserMutation } = useYearCourses();

  const addMeToYearCourse = () => {
    addUserMutation.mutate();
  };
  const removeMeFromYearCourse = () => {
    deleteUserMutation.mutate();
  };

  return (
    <Flex m={0} p={0} mb={2}>
      <Heading noOfLines={1}>{props.pageTitle}</Heading>
      <Spacer />

      <Menu>
        <MenuButton zIndex={100} backgroundColor={'gray.700'} borderRadius={5} px={4} noOfLines={1}>
          {props.pageTitle}
          <HamburgerIcon ml={1} />
        </MenuButton>
        <MenuList>
          {isAdmin && <MenuItem isDisabled>Jesteś administratorem</MenuItem>}
          {!isAdmin && isUser && <MenuItem onClick={removeMeFromYearCourse}>Wypisz się z kierunku</MenuItem>}
          {!isAdmin && !isUser && <MenuItem onClick={addMeToYearCourse}>Dołącz do kierunku</MenuItem>}
          <MenuItem onClick={() => navigate(Path.CALENDAR + `/${yearCourseId}`)}>Kalendarz</MenuItem>

          {isAdmin && (
            <MenuItem onClick={() => navigate(Path.DASHBOARD + `/${yearCourseId}`)}>Panel zarządzania</MenuItem>
          )}
          <MenuItem onClick={() => navigate(Path.EXPLORER)}>Wybór kierunku</MenuItem>
          <MenuItem onClick={() => logout()}>wyloguj</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

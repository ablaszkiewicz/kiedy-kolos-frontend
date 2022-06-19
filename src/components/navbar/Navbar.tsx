import { CalendarIcon } from '@chakra-ui/icons';
import { Flex, Heading, Spacer, Button, Text, Show, Hide } from '@chakra-ui/react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Path } from '../../other/Paths';
import { SiHackaday } from 'react-icons/si';
import { FullNavbar } from './FullNavbar';
import { MobileNavbar } from './MobileNavbar';

interface Props {
  pageTitle: string;
}

export const Navbar = (props: Props) => {
  return (
    <>
      <Show above={'sm'}>
        <FullNavbar pageTitle={props.pageTitle} />
      </Show>
      <Hide above={'sm'}>
        <MobileNavbar pageTitle={props.pageTitle} />
      </Hide>
    </>
  );
};

import {
  Flex,
  Spacer,
  Box,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
  Grid,
  Center,
  VStack,
  HStack,
  Text,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useYearCourses from '../hooks/useYearCourses';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';

import { YearCourseCard } from '../components/explorer/YearCourseCard';
import { YearCourseCreateModal } from '../components/explorer/YearCourseCreateModal';
import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { YearCourseType } from '../entities/YearCourse';
import { HiOutlineLogout } from 'react-icons/hi';

export const Explorer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { query: yearCourseQuery } = useYearCourses();
  const { logout } = useAuth();

  return (
    <Flex p={4} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      <YearCourseCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex mb={5}>
        <Spacer />
        <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
          Wyloguj
        </Button>
      </Flex>
      <Center flexGrow={1} flexDirection={'column'}>
        <HStack gap={6} w={'100%'} mt={-10}>
          <Spacer />
          {yearCourseQuery.data &&
            yearCourseQuery.data.map((yearCourse: YearCourseType) => (
              <YearCourseCard key={yearCourse.id} yearCourse={yearCourse} />
            ))}
          <Button ml={5} onClick={onOpen} rightIcon={<PlusSquareIcon />} variant={'outline'} w={'20%'} h={'100%'}>
            Dodaj kierunek
          </Button>
          <Spacer />
        </HStack>
      </Center>
    </Flex>
  );
};

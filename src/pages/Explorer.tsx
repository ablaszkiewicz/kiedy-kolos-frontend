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
  VisuallyHidden,
} from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useYearCourses from '../hooks/useYearCourses';
import { YearCourseCard } from '../components/explorer/YearCourseCard';
import { YearCourseCreateModal } from '../components/explorer/YearCourseCreateModal';
import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { YearCourseType } from '../entities/YearCourse';
import { HiOutlineLogout } from 'react-icons/hi';
import { SiHackaday } from 'react-icons/si';
import { Path } from '../other/Paths';
import { useNavigate } from 'react-router-dom';
import useMyDetails from '../hooks/useMyDetails';

export const Explorer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const { query: myDetailsQuery } = useMyDetails();

  return (
    <Flex p={4} m={0} h={['100vh']} direction={'column'} overflow={'hidden'}>
      <YearCourseCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex mb={5}>
        <Spacer />
        {/* <Button ml={3} onClick={() => navigate(Path.CTF)} leftIcon={<SiHackaday />}>
          <Text display={['none', 'unset']}>CTF</Text>
        </Button> */}
        <Button ml={3} onClick={() => logout()} leftIcon={<HiOutlineLogout />}>
          Wyloguj
        </Button>
      </Flex>
      <Flex flexGrow={1} flexDirection={'column'} justifyContent={'center'}>
        <Flex
          direction={['column', 'column', 'row']}
          gap={6}
          w={'100%'}
          mt={-10}
          justifyContent={'center'}
          align={'center'}
        >
          {myDetailsQuery.data &&
            myDetailsQuery.data.yearCoursesAdminOf.map((yearCourse: YearCourseType) => (
              <YearCourseCard key={yearCourse.id} yearCourse={yearCourse} isAdmin={true} />
            ))}
          {myDetailsQuery.data &&
            myDetailsQuery.data.yearCoursesUserOf.map((yearCourse: YearCourseType) => (
              <YearCourseCard key={yearCourse.id} yearCourse={yearCourse} isAdmin={false} />
            ))}
          <Button
            ml={[0, 0, 5]}
            onClick={onOpen}
            rightIcon={<PlusSquareIcon />}
            variant={'outline'}
            w={['80%', '80%', '20%']}
            h={'100%'}
            minH={'10em'}
          >
            Dodaj kierunek
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

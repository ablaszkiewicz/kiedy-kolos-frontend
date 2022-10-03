import { Flex, Spacer, Button, useDisclosure } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { YearCourseCard } from '../components/explorer/YearCourseCard';
import { YearCourseCreateModal } from '../components/explorer/YearCourseCreateModal';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { YearCourseType } from '../entities/YearCourse';
import { HiOutlineLogout } from 'react-icons/hi';
import useMyDetails, { MY_DETAILS_QUERY_KEY } from '../hooks/useMyDetails';
import { useQuery } from 'react-query';

export const Explorer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth();
  const { getMyDetails } = useMyDetails();
  const myDetailsQuery = useQuery(MY_DETAILS_QUERY_KEY, getMyDetails);

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

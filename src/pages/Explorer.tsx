import { Flex, Spacer, Box, Heading, Button, SimpleGrid, useDisclosure, Grid } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useYearCourses from '../hooks/useYearCourses';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';

import { YearCourseCard } from '../components/explorer/YearCourseCard';
import { YearCourseCreateModal } from '../components/explorer/YearCourseCreateModal';
import { AddIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { YearCourseType } from '../entities/YearCourse';

export const Explorer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { query: yearCourseQuery } = useYearCourses();
  const { logout } = useAuth();

  return (
    <Box p={5}>
      <YearCourseCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex mb={5}>
        <Heading>Eksplorator kierunków</Heading>
        <Button ml={5} onClick={onOpen} rightIcon={<PlusSquareIcon />} variant={'outline'}>
          Dodaj kierunek
        </Button>
        <Spacer />
        <ColorModeSwitcher />
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={6}>
        {yearCourseQuery.data &&
          yearCourseQuery.data.map((yearCourse: YearCourseType) => (
            <YearCourseCard key={yearCourse.id} yearCourse={yearCourse} />
          ))}
      </SimpleGrid>
    </Box>
  );
};

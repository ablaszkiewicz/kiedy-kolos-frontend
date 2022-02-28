import { Flex, Spacer, Box, Heading, Button, SimpleGrid } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import useYearCourses, { YearCourseType } from '../hooks/useYearCourses';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';
import { SubjectCard } from '../components/explorer/SubjectCard';

export const Explorer = () => {
  const { query: yearCourseQuery } = useYearCourses();
  const { logout } = useAuth();

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading>Eksplorator kierunków</Heading>
        <Spacer />
        <ColorModeSwitcher />
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>
      <Box p={5}>
        <SimpleGrid columns={[1, 2, 3, 4, 5]} gap={6}>
          {yearCourseQuery.data &&
            yearCourseQuery.data.map((yearCourse: YearCourseType) => (
              <SubjectCard key={yearCourse.id} yearCourse={yearCourse} />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

import { Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Spacer, Box, Heading, Button, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import useStore from '../zustand/store';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useYearCourses, { YearCourseType } from '../hooks/useYearCourses';
import { Path } from '../other/Paths';
import { SubjectsPanel } from '../components/admin/subjects/SubjectsPanel';
import { SettingsPanel } from '../components/admin/settings/SettingsPanel';
import { ColorModeSwitcher } from '../components/other/ColorModeSwitcher';

export const TeacherPanel = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const { query: yearCourseQuery } = useYearCourses();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(Path.LOGIN);
    }
  }, [user]);

  useEffect(() => {
    if (!yearCourseQuery.data) return;

    console.log('Passed null data check');
    if (yearCourseId === undefined) {
      navigate(`/dashboard/${yearCourseQuery.data[0].id}`);
    }
  }, [yearCourseQuery.data]);

  return (
    <Box p={5}>
      <Flex mb={5}>
        <Heading>Panel starosty {user.email}</Heading>
        <Spacer />
        <Select flexBasis={0} flexGrow={0.5} flexShrink={2}>
          {yearCourseQuery.data &&
            yearCourseQuery.data.map((yearCourse: YearCourseType) => (
              <option value={yearCourse.id} key={yearCourse.id}>
                {yearCourse.name}
              </option>
            ))}
        </Select>
        <ColorModeSwitcher />
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>
      <Tabs isLazy>
        <TabList>
          <Tab>Kalendarz</Tab>
          <Tab>Grupy</Tab>
          <Tab>Przedmioty</Tab>
          <Tab>Ustawienia</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Kalendarz</p>
          </TabPanel>
          <TabPanel>
            <p>Grupy</p>
          </TabPanel>
          <TabPanel>
            <SubjectsPanel />
          </TabPanel>
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

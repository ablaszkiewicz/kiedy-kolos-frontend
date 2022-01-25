import { ChakraProvider, Box, theme, Heading, Flex, Spacer } from '@chakra-ui/react';
import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './hooks/UserContext';
import { ColorModeSwitcher } from './components/other/other/ColorModeSwitcher';
import { TeacherPanel } from './pages/TeacherPanel';

export const App = () => {
  const [user, setUser] = useLocalStorage('user', {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChakraProvider theme={theme}>
        <Box p={5}>
          <Flex mb={5}>
            <Heading>Panel nauczyciela</Heading>
            <Spacer />
            <ColorModeSwitcher justifySelf='flex-end' />
          </Flex>
          <TeacherPanel />
        </Box>
      </ChakraProvider>
    </UserContext.Provider>
  );
};

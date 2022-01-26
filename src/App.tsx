import { ChakraProvider, theme } from '@chakra-ui/react';
import { TeacherPanel } from './pages/TeacherPanel';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <TeacherPanel />
    </ChakraProvider>
  );
};

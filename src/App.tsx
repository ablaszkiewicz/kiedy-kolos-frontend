import { ChakraProvider, Box, theme, Heading, Flex, Spacer } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { TeacherPanel } from './teacher/TeacherPanel';

export const App = () => (
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
);

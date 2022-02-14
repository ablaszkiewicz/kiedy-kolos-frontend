import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TeacherPanel } from './pages/AdminPanel';
import theme from './theme';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router basename='/'>
          <Routes>
            <Route path='/dashboard'>
              <Route path='' element={<TeacherPanel />} />
              <Route path=':yearCourseId' element={<TeacherPanel />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

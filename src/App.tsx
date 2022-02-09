import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { TeacherPanel } from './pages/AdminPanel';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/dashboard' element={<TeacherPanel />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

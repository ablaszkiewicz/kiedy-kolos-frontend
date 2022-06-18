import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HashRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Explorer } from './pages/Explorer';
import theme from './theme';
import { Path } from './other/Paths';
import { RequireAuthRoute } from './components/other/RequireAuthRoute';
import { UnauthorizedHandler } from './components/other/UnauthorizedHandler';
import { Calendar } from './pages/Calendar';
import { Dashboard } from './pages/Dashboard';
import { AnimatedTransition } from './components/other/AnimatedTransition';
import { LandingPage } from './pages/LandingPage';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Ctf } from './pages/Ctf';
import { CtfResults } from './pages/CtfResults';
import './style.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <GoogleOAuthProvider clientId='1060931195564-bhb97i4td9s9qahdot8lgudq18k2tg35.apps.googleusercontent.com'>
      <ParallaxProvider>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Router basename='/'>
              <UnauthorizedHandler />
              <Routes>
                <Route element={<AnimatedTransition />}>
                  <Route path='*' element={<Navigate to={Path.LANDING_PAGE} />} />

                  <Route path={Path.LANDING_PAGE} element={<LandingPage />} />
                  <Route path={Path.LOGIN} element={<Login />} />
                  <Route path={Path.REGISTER} element={<Register />} />

                  <Route element={<RequireAuthRoute />}>
                    <Route path={Path.EXPLORER} element={<Explorer />} />
                    <Route path={Path.CALENDAR + '/:yearCourseId'} element={<Calendar />} />
                    <Route path={Path.DASHBOARD + '/:yearCourseId'} element={<Dashboard />} />
                    <Route path={Path.CTF} element={<Ctf />} />
                    <Route path={Path.CTF_RESULTS} element={<CtfResults />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </QueryClientProvider>
        </ChakraProvider>
      </ParallaxProvider>
    </GoogleOAuthProvider>
  );
};

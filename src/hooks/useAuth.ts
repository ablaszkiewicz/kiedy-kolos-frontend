import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Path } from '../other/Paths';
import { tokenExpired } from '../zustand/jwtExpiration';
import useStore from '../zustand/store';
import useMyDetails from './useMyDetails';
import useYearCourses from './useYearCourses';

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
}

export default function useAuth() {
  const queryClient = useQueryClient();
  const loginToStore = useStore((state) => state.loginUser);
  const logoutUserFromStore = useStore((state) => state.logoutUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const { query } = useMyDetails(false);

  const login = async (credentials: Credentials) => {
    const response = await axios.post('auth/login', { email: credentials.email, password: credentials.password });
    return response.data;
  };

  const googleLogin = async (token: string) => {
    const response = await axios.post('auth/google/login', { googleToken: token });
    return response.data;
  };

  const register = async (credentials: Credentials) => {
    const response = await axios.post('users', { email: credentials.email, password: credentials.password });
    return response.data;
  };

  const logout = () => {
    logoutUserFromStore();
    queryClient.clear();
    delete axios.defaults.headers.common['Authorization'];
  };

  const loginMutation = useMutation(login, {
    onSuccess: async (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
      await query.refetch();
      navigate(Path.EXPLORER);
    },
  });

  const googleLoginMutation = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
      await query.refetch();
    },
  });

  const googleLoginMutationRedirect = useMutation(googleLogin, {
    onSuccess: async (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
      await query.refetch();
      navigate(Path.EXPLORER);
    },
  });

  const registerMutation = useMutation(register, {
    onSuccess: () => {
      navigate(Path.LOGIN);
    },
  });

  const isLoggedIn: boolean = !(
    user === null ||
    user.token === null ||
    user.email === null ||
    tokenExpired(user.token)
  );

  return { loginMutation, googleLoginMutation, googleLoginMutationRedirect, registerMutation, isLoggedIn, logout };
}

import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useStore from '../zustand/store';

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  token: string;
}

export default function useAuth() {
  const loginToStore = useStore((state) => state.loginUser);
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const login = async (credentials: Credentials) => {
    const response = await axios.post('auth/login', { email: credentials.email, password: credentials.password });
    return response.data;
  };

  const register = async (credentials: Credentials) => {
    const response = await axios.post('users', { email: credentials.email, password: credentials.password });
    return response.data;
  };

  const loginMutation = useMutation(login, {
    onSuccess: (response: LoginResponse) => {
      loginToStore(response.email, response.token);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation(register, {
    onSuccess: () => {
      navigate('/login');
    },
  });

  const isLoggedIn: boolean = !(user === null || user.token === null || user.email === null);

  return { loginMutation, registerMutation, isLoggedIn };
}

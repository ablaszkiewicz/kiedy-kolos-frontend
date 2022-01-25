import axios from 'axios';
import { useContext, useState } from 'react';
import UserContext from './UserContext';

export default function useAuth() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const [error, setError] = useState('');

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post('auth/login', { email, password });
      setUser(data);
    } catch (error) {
      setError('Wrong credentials');
    }
  };

  const logout = async () => {
    try {
      await axios.get('users/logout');
      setUser({});
    } catch (error: any) {
      setError(error.message);
    }
  };

  return { user, error, login, logout };
}

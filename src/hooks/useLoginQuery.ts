import axios from 'axios';
import { useState } from 'react';
import useStore from '../zustand/store';

export default function useLoginQuery(callback: () => void) {
  const login = useStore((state) => state.loginUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const loginQuery = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('auth/login', { email: email, password: password });
      if (data.token != null && data.email != null) {
        login(data.email, data.token);
        setIsLoading(false);
        callback();
        return;
      }
    } catch (err: any) {
      if (err.response.data) {
        setError(err.response.data.message);
      }
    }
    setIsLoading(false);
  };

  return { loginQuery, isLoading, error };
}

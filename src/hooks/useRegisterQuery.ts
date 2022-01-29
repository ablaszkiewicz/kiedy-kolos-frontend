import axios from 'axios';
import { useState } from 'react';

export default function useRegisterQuery(callback: () => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const registerQuery = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post('users', { email: email, password: password });
      setIsLoading(false);
      callback();
      return;
    } catch (error: any) {
      if (error.response.data) {
        setError(error.response.data.message);
      }
    }
    setIsLoading(false);
  };

  return { registerQuery, isLoading, error };
}

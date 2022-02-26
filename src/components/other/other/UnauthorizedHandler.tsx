import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response ? error.response.status : null;
        if (statusCode === 401) {
          navigate('/login', { state: { customMessage: 'Widzisz ten ekran, ponieważ zostałeś wylogowany' } });
        }
      }
    );
  }, []);

  return null;
};

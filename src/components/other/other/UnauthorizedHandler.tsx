import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HttpCode } from '../../../other/HttpStatusCodes';
import { Path } from '../../../other/Paths';

export const UnauthorizedHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response ? error.response.status : null;
        if (statusCode === HttpCode.UNAUTHORIZED) {
          navigate(Path.LOGIN, { state: { customMessage: 'Widzisz ten ekran, ponieważ zostałeś wylogowany' } });
        }
      }
    );
  }, []);

  return null;
};

import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../other/Paths';
import { StatusCodes } from 'http-status-codes';

export const UnauthorizedHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode: StatusCodes = error.response ? error.response.status : null;
        if (statusCode === StatusCodes.UNAUTHORIZED) {
          navigate(Path.LOGIN, { state: { customMessage: 'Widzisz ten ekran, ponieważ zostałeś wylogowany' } });
        }
      }
    );
  }, []);

  return null;
};

import jwtDecode from 'jwt-decode';
import useStore from './store';

interface Token {
  exp: number;
}

export const tokenExpired = (token: string | null): boolean => {
  if (token !== null) {
    const currentTime = new Date().getTime() / 1000;
    const decoded = jwtDecode<Token>(token);
    const expirationTime = decoded.exp;

    return currentTime > expirationTime;
  } else {
    return true;
  }
};

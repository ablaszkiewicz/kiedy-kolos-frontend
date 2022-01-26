import jwtDecode from 'jwt-decode';
import useStore from './store';

interface Token {
  exp: number;
}

export const checkTokenExpiration = (token: string | null) => {
  if (token !== null) {
    const currentTime = new Date().getTime() / 1000;
    const decoded = jwtDecode<Token>(token);
    const expirationTime = decoded.exp;

    if (currentTime > expirationTime) {
      useStore.getState().logoutUser();
    }
    console.log('Token will expire in: ', expirationTime - currentTime);
  }
};

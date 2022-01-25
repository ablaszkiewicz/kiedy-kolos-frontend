import { createContext } from 'react';

interface UserContext {
  user: any;
  setUser: any;
}

export default createContext<UserContext>({ user: null, setUser: null });

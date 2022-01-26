import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';
import { checkTokenExpiration } from './jwtExpiration';

const store = (set: any) => ({
  ...createAuthSlice(set),
  test: () => set(),
});

const useStore = create(devtools(store));

useStore.subscribe((state) => checkTokenExpiration(state.user.token));

export default useStore;

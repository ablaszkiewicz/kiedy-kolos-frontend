import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';
import { checkTokenExpiration } from './jwtExpiration';

const store = (set: any) => ({
  ...createAuthSlice(set),
  test: () => set(),
});

const useStore = create(
  persist(devtools(store), {
    name: 'auth-storage',
  })
);

useStore.subscribe((state) => checkTokenExpiration(state.user.token));

export default useStore;

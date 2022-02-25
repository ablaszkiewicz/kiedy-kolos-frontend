import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';

const store = (set: any) => ({
  ...createAuthSlice(set),
});

const useStore = create(
  persist(devtools(store, { name: 'hwdp' }), {
    name: 'auth-storage',
  })
);

export default useStore;

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { createAuthSlice } from './authSlice';
import axios from "axios";

const store = (set: any) => ({
  ...createAuthSlice(set),
});

const useStore = create(
  persist(devtools(store, { name: 'hwdp' }), {
    name: 'auth-storage',
  })
);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + useStore.getState().user.token;

export default useStore;

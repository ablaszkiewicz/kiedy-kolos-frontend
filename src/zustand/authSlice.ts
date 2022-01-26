import produce from 'immer';

export const createAuthSlice = (set: any) => ({
  user: { email: null, token: null },
  loginUser: (newEmail: string, newToken: string) =>
    set((state: any) => {
      state.user = { email: newEmail, token: newToken };
    }),
  logoutUser: () =>
    set((state: any) => {
      state.user = { email: null, token: null };
    }),
});

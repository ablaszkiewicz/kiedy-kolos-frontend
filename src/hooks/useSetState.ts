import { useReducer } from 'react';

export const useSetState = <S>(initialState: S): [S, (state: Partial<S>) => void] => {
  const [state, setState] = useReducer((state: any, newState: any) => ({ ...state, ...newState }), initialState);
  return [state, setState];
};

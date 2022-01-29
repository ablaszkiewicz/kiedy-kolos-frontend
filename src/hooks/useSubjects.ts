import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useStore from '../zustand/store';

export type SubjectType = {
  id: number;
  name: string;
};

export default function useSubjects() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = useStore((state) => state.user.token);

  // api fetch methods
  const getSubjects = async () => {
    const response = await axios.get('users/me/subjects', { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };
  const postSubject = async (name: string) => {
    const response = await axios.post('/subjects', { name: name }, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };

  // queries
  const query = useQuery('subjects', getSubjects);

  // mutations
  const mutation = useMutation(postSubject, {
    onMutate: async (name) => {
      const newSubject = { id: 123, name: name };
      await queryClient.cancelQueries('subjects');
      const previousSubjects = queryClient.getQueryData('subjects');
      queryClient.setQueryData('subjects', (old: any) => [...old, newSubject]);
      return previousSubjects;
    },
    onError: (err, name, context: any) => {
      queryClient.setQueryData('todos', context.previousTodos);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('subjects');
      toast({
        title: 'Dodano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, mutation };
}

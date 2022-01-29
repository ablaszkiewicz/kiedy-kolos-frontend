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
  const postSubject = async (subject: SubjectType) => {
    const response = await axios.post('users/me/subjects', subject, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };
  const deleteSubject = async (id: number) => {
    const response = await axios.delete(`users/me/subjects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };

  // queries
  const query = useQuery('subjects', getSubjects);

  // mutations
  const postMutation = useMutation(postSubject, {
    onSuccess: (subject: SubjectType) => {
      queryClient.setQueryData('subjects', (old: any) => [...old, subject]);
      toast({
        title: 'Dodano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteSubject, {
    onMutate: async (id: number) => {
      await queryClient.cancelQueries('subjects');
      const previousSubjects = queryClient.getQueryData<SubjectType[]>('subjects');
      queryClient.setQueryData('subjects', (old: any) => [...old].filter((subject) => subject.id != id));
      return { previousSubjects };
    },

    onError: (err, name, context: any) => {
      queryClient.setQueryData('subjects', context.previousSubjects);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('subjects');
      toast({
        title: 'Usunięto przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, deleteMutation };
}

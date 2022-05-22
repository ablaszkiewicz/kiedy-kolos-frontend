import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { User } from '../entities/User';
import useStore from '../zustand/store';

export interface Result {
  user: User;
  task1: number;
  task2: number;
  task3: number;
  task4: number;
}

export function useCtf() {
  const queryClient = useQueryClient();
  const user = useStore((store) => store.user);

  const getResults = async (): Promise<Result[]> => {
    const response = await axios.get('results');
    return response.data;
  };

  const getIndividualResults = async (): Promise<Result> => {
    const response = await axios.get('users/me/results');
    return response.data;
  };

  const checkTask1 = async (): Promise<void> => {
    const response = await axios.post(`users/me/results/1`);
    return response.data;
  };
  const checkTask2 = async (flag: string): Promise<void> => {
    const response = await axios.post(`users/me/results/2/${flag}`);
    return response.data;
  };
  const checkTask3 = async (): Promise<void> => {
    const response = await axios.post(`users/me/results/3`);
    return response.data;
  };
  const checkTask4 = async (flag: string): Promise<void> => {
    const response = await axios.post(`users/me/results/4/${flag}`);
    return response.data;
  };

  const enroll = async (): Promise<void> => {
    const response = await axios.post(`users/me/results`);
    return response.data;
  };

  const checkTask1Mutation = useMutation(checkTask1, {
    onSuccess: () => {
      queryClient.invalidateQueries('individualResults');
    },
  });

  const checkTask2Mutation = useMutation(checkTask2, {
    onSuccess: () => {
      queryClient.invalidateQueries('individualResults');
    },
  });
  const checkTask3Mutation = useMutation(checkTask3, {
    onSuccess: () => {
      queryClient.invalidateQueries('individualResults');
    },
  });
  const checkTask4Mutation = useMutation(checkTask4, {
    onSuccess: () => {
      queryClient.invalidateQueries('individualResults');
    },
  });
  const enrollMutation = useMutation(enroll, {
    onSuccess: () => {
      queryClient.invalidateQueries('individualResults');
    },
  });

  const individualResultsQuery = useQuery('individualResults', getIndividualResults);
  const resultsQuery = useQuery('results', getResults);

  return {
    individualResultsQuery,
    resultsQuery,
    checkTask1Mutation,
    checkTask2Mutation,
    checkTask3Mutation,
    checkTask4Mutation,
    enrollMutation,
  };
}

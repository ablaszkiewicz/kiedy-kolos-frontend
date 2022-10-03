import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { SubjectType } from '../entities/Subject';
import { EVENTS_QUERY_KEY } from './useEvents';

const SUBJECTS_QUERY_KEY: string = 'subjects';

export default function useSubjects() {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  const getSubjects = async () => {
    const response = await axios.get(`yearCourses/${yearCourseId}/subjects`);
    return response.data;
  };

  const postSubject = async (subject: SubjectType) => {
    const response = await axios.post(`yearCourses/${yearCourseId}/subjects`, subject);
    return response.data;
  };

  const updateSubject = async (subject: SubjectType) => {
    const response = await axios.put(`yearCourses/${yearCourseId}/subjects/${subject.id}`, subject);
    return response.data;
  };

  const deleteSubject = async (id: number) => {
    const response = await axios.delete(`yearCourses/${yearCourseId}/subjects/${id}`);
    return response.data;
  };

  const query = useQuery(SUBJECTS_QUERY_KEY, getSubjects);

  const postMutation = useMutation(postSubject, {
    onSuccess: (subject: SubjectType) => {
      queryClient.invalidateQueries(SUBJECTS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Dodano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateSubject, {
    onSuccess: (subject: SubjectType) => {
      queryClient.invalidateQueries(SUBJECTS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Zaktualizowano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteSubject, {
    onSuccess: (subject: SubjectType) => {
      queryClient.invalidateQueries(SUBJECTS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Usunięto przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation };
}

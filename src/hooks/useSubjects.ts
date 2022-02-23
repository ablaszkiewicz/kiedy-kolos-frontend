import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import useStore from '../zustand/store';

export type SubjectType = {
  id: number;
  name: string;
  shortName: string;
};

const SUBJECTS_QUERY_KEY: string = 'subjects';

export default function useSubjects() {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const token: string | null = useStore((state) => state.user.token);
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
      queryClient.setQueryData(SUBJECTS_QUERY_KEY, (old: any) => [...old, subject]);
      toast({
        title: 'Dodano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateSubject, {
    onSuccess: (subject: SubjectType) => {
      const subjects: SubjectType[] = queryClient.getQueryData(SUBJECTS_QUERY_KEY)!;
      const index: number = subjects.findIndex((subjectTmp) => subjectTmp.id === subject.id);
      subjects[index] = subject;
      queryClient.setQueryData(SUBJECTS_QUERY_KEY, (_) => subjects);
      toast({
        title: 'Zaktualizowano przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteSubject, {
    onSuccess: (subject: SubjectType) => {
      queryClient.setQueryData(SUBJECTS_QUERY_KEY, (old: any) =>
        old.filter((subjectTmp: SubjectType) => subjectTmp.id != subject.id)
      );
      toast({
        title: 'Usunięto przedmiot',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation };
}

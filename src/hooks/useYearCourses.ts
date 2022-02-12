import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import useStore from '../zustand/store';

export type YearCourseType = {
  id: number;
  name: string;
};

export default function useYearCourses() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = useStore((state) => state.user.token);

  // api fetch methods
  const getYearCourses = async () => {
    const response = await axios.get('yearCourses', { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  };
  const postYearCourse = async (yearCourse: YearCourseType) => {
    const response = await axios.post('yearCourses', yearCourse, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  const updateYearCourse = async (yearCourse: YearCourseType) => {
    const response = await axios.put(`yearCourses`, yearCourse, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  const deleteYearCourse = async (id: number) => {
    const response = await axios.delete(`yearCourses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  // queries
  const query = useQuery('yearCourses', getYearCourses);

  // mutations
  const postMutation = useMutation(postYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      queryClient.setQueryData('yearCourses', (old: any) => [...old, yearCourse]);
      toast({
        title: 'Dodano kierunek',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      const yearCourses: YearCourseType[] = queryClient.getQueryData('yearCourses')!;
      const index = yearCourses.findIndex((yearCourseTmp) => yearCourseTmp.id === yearCourse.id);
      yearCourses[index] = yearCourse;
      queryClient.setQueryData('yearCourses', (old: any) => yearCourses);
      toast({
        title: 'Zaktualizowano kierunek',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      queryClient.setQueryData('yearCourses', (old: any) =>
        old.filter((yearCourseTmp: YearCourseType) => yearCourseTmp.id != yearCourse.id)
      );
      toast({
        title: 'Usunięto kierunek',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation };
}

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';

const YEAR_COURSES_QUERY_KEY: string = 'yearCourses';

export type YearCourseType = {
  id: number;
  name: string;
  startYear: number;
};

export default function useYearCourses() {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const getYearCourses = async () => {
    const response = await axios.get('users/me/yearCourses');
    return response.data;
  };

  const postYearCourse = async (yearCourse: YearCourseType) => {
    const response = await axios.post(YEAR_COURSES_QUERY_KEY, yearCourse);
    return response.data;
  };

  const updateYearCourse = async (yearCourse: YearCourseType) => {
    const response = await axios.put(`yearCourses`, yearCourse);
    return response.data;
  };

  const deleteYearCourse = async (id: number) => {
    const response = await axios.delete(`yearCourses/${id}`);
    return response.data;
  };

  const query = useQuery(YEAR_COURSES_QUERY_KEY, getYearCourses);

  const postMutation = useMutation(postYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      queryClient.setQueryData(YEAR_COURSES_QUERY_KEY, (old: any) => [...old, yearCourse]);
      toast({
        title: 'Dodano kierunek',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      const yearCourses: YearCourseType[] = queryClient.getQueryData(YEAR_COURSES_QUERY_KEY)!;
      const index = yearCourses.findIndex((yearCourseTmp) => yearCourseTmp.id === yearCourse.id);
      yearCourses[index] = yearCourse;
      queryClient.setQueryData(YEAR_COURSES_QUERY_KEY, (_) => yearCourses);
      toast({
        title: 'Zaktualizowano kierunek',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      queryClient.setQueryData(YEAR_COURSES_QUERY_KEY, (old: any) =>
        old.filter((yearCourseTmp: YearCourseType) => yearCourseTmp.id !== yearCourse.id)
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

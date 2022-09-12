import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { AddAdminDTO, CreateYearCourseDTO, YearCourseType } from '../entities/YearCourse';
import { MY_DETAILS_QUERY_KEY } from './useMyDetails';
import { YEAR_COURSE_QUERY_KEY } from './useRole';

const YEAR_COURSES_QUERY_KEY: string = 'yearCourses';

export default function useYearCourses(disableAutoRefetch = false) {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();

  const { yearCourseId } = useParams();

  const postYearCourse = async (dto: CreateYearCourseDTO) => {
    const response = await axios.post(YEAR_COURSES_QUERY_KEY, dto);
    return response.data;
  };

  const updateYearCourse = async (yearCourse: YearCourseType) => {
    const response = await axios.put(`yearCourses`, yearCourse);
    return response.data;
  };

  const deleteYearCourse = async (id: string) => {
    const response = await axios.delete(`yearCourses/${id}`);
    return response.data;
  };

  const addAdmin = async (dto: AddAdminDTO) => {
    const response = await axios.post(`yearCourses/${yearCourseId}/admins`, dto);
    return response.data;
  };

  const deleteAdmin = async (adminId: string) => {
    const response = await axios.delete(`yearCourses/${yearCourseId}/admins/${adminId}`);
    return response.data;
  };

  const addUser = async () => {
    const response = await axios.post(`yearCourses/${yearCourseId}/users`);
    return response.data;
  };

  const deleteUser = async () => {
    const response = await axios.delete(`yearCourses/${yearCourseId}/users`);
    return response.data;
  };

  const postMutation = useMutation(postYearCourse, {
    onSuccess: (yearCourse: YearCourseType) => {
      queryClient.invalidateQueries(MY_DETAILS_QUERY_KEY);

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
      queryClient.setQueryData(YEAR_COURSES_QUERY_KEY, (_: any) => yearCourses);
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

  const addAdminMutation = useMutation(addAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(YEAR_COURSES_QUERY_KEY);
      toast({
        title: 'Dodano moderatora',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteAdminMutation = useMutation(deleteAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(YEAR_COURSES_QUERY_KEY);
      toast({
        title: 'Usunięto moderatora',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(YEAR_COURSES_QUERY_KEY);
      queryClient.invalidateQueries(YEAR_COURSE_QUERY_KEY);
      toast({
        title: 'Dodano Cię do kierunku',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(YEAR_COURSES_QUERY_KEY);
      queryClient.invalidateQueries(YEAR_COURSE_QUERY_KEY);

      toast({
        title: 'Usunięto Cię z kierunku',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return {
    postMutation,
    updateMutation,
    deleteMutation,
    addAdminMutation,
    deleteAdminMutation,
    addUserMutation,
    deleteUserMutation,
  };
}

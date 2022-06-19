import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { YearCourseType } from '../entities/YearCourse';
import useStore from '../zustand/store';
import useAuth from './useAuth';

const YEAR_COURSE_QUERY_KEY: string = 'yearCourse';

export default function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const email = useStore((store) => store.user.email);
  const { isLoggedIn } = useAuth();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  const getYearCourse = async (): Promise<YearCourseType> => {
    const response = await axios.get(`yearCourses/${yearCourseId}`);
    return response.data;
  };

  const query = useQuery(YEAR_COURSE_QUERY_KEY, getYearCourse);

  useEffect(() => {
    if (!query.data) {
      return;
    }

    console.log(query.data);

    if (query.data.admins?.some((admin) => admin.email === email)) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [query.data]);

  //const isAdmin = isLoggedIn && query.data?.admins?.some((admin) => admin.email === email);

  return { isAdmin };
}

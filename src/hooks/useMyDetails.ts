import axios from 'axios';
import { useQuery } from 'react-query';
import { MyDetails } from '../entities/MyDetails';

export const MY_DETAILS_QUERY_KEY = 'myDetails';

export default function useMyDetails(enableAutoRefetch = true) {
  const getMyDetails = async (): Promise<MyDetails> => {
    const response = await axios.get('users/me');
    return response.data;
  };

  const query = useQuery(MY_DETAILS_QUERY_KEY, getMyDetails, { enabled: enableAutoRefetch });

  const yearCourses = query.data ? [...query.data.yearCoursesAdminOf, ...query.data.yearCoursesUserOf] : [];

  return { query, yearCourses };
}

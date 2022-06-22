import { YearCourseType } from './YearCourse';

export interface MyDetails {
  id: string;
  email: string;
  yearCoursesAdminOf: YearCourseType[];
  yearCoursesUserOf: YearCourseType[];
}

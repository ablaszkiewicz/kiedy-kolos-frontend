import { User } from './User';
import Yup from './yup';

export type YearCourseType = {
  id: string;
  name: string;
  startYear: number;
  admins?: User[];
  users?: User[];
};

export interface CreateYearCourseDTO {
  name: string;
  startYear: number;
}

export interface AddAdminDTO {
  email: string;
}

export const yearCourseValidationSchema = Yup.object({
  name: Yup.string().required(),
  startYear: Yup.number()
    .required()
    .max(new Date().getFullYear())
    .min(new Date().getFullYear() - 5),
});

import Yup from './yup';

export type YearCourseType = {
  id: number;
  name: string;
  startYear: number;
};

export const yearCourseValidationSchema = Yup.object({
  name: Yup.string().required(),
  startYear: Yup.number()
    .required()
    .max(new Date().getFullYear())
    .min(new Date().getFullYear() - 5),
});

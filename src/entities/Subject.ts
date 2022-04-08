import Yup from './yup';

export type SubjectType = {
  id: number;
  name: string;
  shortName: string;
};

export const subjectValidationSchema = Yup.object({
  name: Yup.string().required(),
  shortName: Yup.string().required().max(4),
});

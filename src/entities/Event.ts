import { SubjectType } from './Subject';
import Yup from './yup';

export interface Event {
  id: string;
  date: Date;
  subjectId: string;
  subject: SubjectType;
}

export interface CreateEventDto {
  date: string;
  subjectId: string;
}

export const editEventValidationSchema = Yup.object({
  time: Yup.string().required(),
  subjectId: Yup.string().required(),
});

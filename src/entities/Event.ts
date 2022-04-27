import { SubjectType } from './Subject';
import Yup from './yup';

export interface Event {
  id: string;
  date: string;
  subjectId: string;
  subject: SubjectType;
}

export interface CreateEventDto {
  date: string;
  subjectId: string;
}

export interface UpdateEventDto {
  id: string;
  date: string;
  subjectId: string;
}

export const createEventValidationSchema = Yup.object({
  time: Yup.string().required(),
  subjectId: Yup.string().required(),
});

export const editEventValidationSchema = Yup.object({
  date: Yup.string().required(),
  subjectId: Yup.string().required(),
});

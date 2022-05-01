import { Group } from './Group';
import { SubjectType } from './Subject';
import Yup from './yup';

export interface Event {
  id: string;
  date: string;
  subjectId: string;
  subject: SubjectType;
  room: string;
  description: string;
  groups: Group[];
}

export interface CreateEventDto {
  date: string;
  subjectId: string;
  groups: string[];
  room: string;
  description: string;
}

export interface UpdateEventDto {
  id: string;
  date: string;
  subjectId: string;
  groups: string[];
  room: string;
  description: string;
}

export const createEventValidationSchema = Yup.object({
  time: Yup.string().required(),
  subjectId: Yup.string().required(),
  groups: Yup.array().min(1),
});

export const editEventValidationSchema = Yup.object({
  date: Yup.string().required(),
  subjectId: Yup.string().required(),
  groups: Yup.array().min(1),
});

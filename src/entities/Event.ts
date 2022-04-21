import { SubjectType } from './Subject';

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

import { Group } from './Group';
import { SubjectType } from './Subject';
import Yup from './yup';

export enum Status {
  NEW,
  COMPLETED,
  NOT_APPLICABLE,
}

export interface Event {
  id: string;
  date: string;
  subjectId: string;
  subject: SubjectType;
  room: string;
  description: string;
  groups: Group[];
  status: Status;
}

export interface UpdateEventStatus {
  eventId: string;
  status: Status;
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

export const getStatusText = (status: Status) => {
  switch (status) {
    case Status.NEW:
      return 'Nowe';
    case Status.COMPLETED:
      return 'Ukończone';
    case Status.NOT_APPLICABLE:
      return 'Nie dotyczy';
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.NEW:
      return 'yellow';
    case Status.COMPLETED:
      return 'green';
    case Status.NOT_APPLICABLE:
      return 'gray';
  }
};

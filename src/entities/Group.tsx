import Yup from './yup';

export interface Group {
  id: string;
  name: string;
  yearCourseId: string;
}

export interface CreateGroupParams {
  dto: CreateGroupDto;
}

export interface UpdateGroupParams extends CreateGroupParams {
  id: string;
}

export interface CreateGroupDto {
  name: string;
}

export const groupValidationSchema = Yup.object({
  name: Yup.string().required(),
});
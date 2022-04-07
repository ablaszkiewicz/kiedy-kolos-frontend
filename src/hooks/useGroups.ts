import { useToast } from '@chakra-ui/react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CreateGroupParams, Group, UpdateGroupParams } from '../entities/Group';

const GROUPS_QUERY_KEY: string = 'groups';

export default function useGroups() {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  const getGroups = async (): Promise<Group[]> => {
    const response = await axios.get(`yearCourse/${yearCourseId}/groups`);
    return response.data;
  }

  const postGroup = async (payload: CreateGroupParams): Promise<Group> => {
    const response = await axios.post(`yearCourse/${yearCourseId}/groups`, payload.dto);
    return response.data;
  }

  const updateGroup = async (params: UpdateGroupParams): Promise<Group> => {
    const response = await axios.put(`/groups/${params.id}`, params.dto);
    return response.data;
  }

  const deleteGroup = async (id: string): Promise<Group> => {
    const response = await axios.delete(`/groups/${id}`);
    return response.data;
  }

  const query = useQuery(GROUPS_QUERY_KEY, getGroups);

  const postMutation = useMutation(postGroup, {
    onSuccess: (group: Group) => {
      queryClient.setQueryData(GROUPS_QUERY_KEY, (old: any) => [...old, group]);
      toast({
        title: 'Dodano grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateGroup, {
    onSuccess: (group: Group) => {
      const groups: Group[] = queryClient.getQueryData(GROUPS_QUERY_KEY)!;
      const index: number = groups.findIndex((g) => g.id === group.id);
      groups[index] = group;
      queryClient.setQueryData(GROUPS_QUERY_KEY, (_) => groups);
      toast({
        title: 'Zaktualizowano grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteGroup, {
    onSuccess: (group: Group) => {
      queryClient.setQueryData(GROUPS_QUERY_KEY, (old: any) =>
        old.filter((g: Group) => g.id !== group.id)
      );
      toast({
        title: 'Usunięto grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation };
}
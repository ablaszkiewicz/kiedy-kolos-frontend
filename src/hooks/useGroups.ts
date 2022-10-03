import { useToast } from '@chakra-ui/react';
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CreateGroupDto, Group, UpdateGroupDto } from '../entities/Group';
import { EVENTS_QUERY_KEY } from './useEvents';

const GROUPS_QUERY_KEY: string = 'groups';

export default function useGroups() {
  const toast = useToast();
  const queryClient: QueryClient = useQueryClient();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  const getGroups = async (): Promise<Group[]> => {
    const response = await axios.get(`yearCourse/${yearCourseId}/groups`);
    return response.data;
  };

  const postGroup = async (payload: CreateGroupDto): Promise<Group> => {
    const response = await axios.post(`yearCourse/${yearCourseId}/groups`, payload);
    return response.data;
  };

  const updateGroup = async (payload: UpdateGroupDto): Promise<Group> => {
    const response = await axios.put(`/groups/${payload.id}`, payload);
    return response.data;
  };

  const deleteGroup = async (id: string): Promise<Group> => {
    const response = await axios.delete(`/groups/${id}`);
    return response.data;
  };

  const query = useQuery(GROUPS_QUERY_KEY, getGroups);

  const postMutation = useMutation(postGroup, {
    onSuccess: (group: Group) => {
      queryClient.invalidateQueries(GROUPS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Dodano grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateGroup, {
    onSuccess: (group: Group) => {
      queryClient.invalidateQueries(GROUPS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Zaktualizowano grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteGroup, {
    onSuccess: (group: Group) => {
      queryClient.invalidateQueries(GROUPS_QUERY_KEY);
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Usunięto grupę',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { query, postMutation, updateMutation, deleteMutation };
}

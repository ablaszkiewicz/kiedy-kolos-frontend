import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Event, UpdateEventStatus } from '../entities/Event';
import { EVENTS_QUERY_KEY } from './useEvents';

export default function useEventStatuses() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateEventStatus = async (payload: UpdateEventStatus): Promise<Event> => {
    const response = await axios.post(`event-statuses`, payload);
    return response.data;
  };

  const updateMutation = useMutation(updateEventStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Zaktualizowano status wydarzenia',
        status: 'success',
        duration: 2000,
      });
    },
  });

  return { updateMutation };
}

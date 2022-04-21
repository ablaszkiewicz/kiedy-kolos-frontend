import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Event } from '../entities/Event';

const EVENTS_QUERY_KEY = 'events';

export default function useEvents() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { yearCourseId } = useParams<{ yearCourseId: string }>();

  const getEvents = async (): Promise<Event[]> => {
    const response = await axios.get(`yearCourse/${yearCourseId}/events`);
    return response.data;
  };

  const postEvent = async (payload: Event): Promise<Event> => {
    const response = await axios.post(`yearCourse/${yearCourseId}/events`, payload);
    return response.data;
  };

  const query = useQuery(EVENTS_QUERY_KEY, getEvents);

  const postMutation = useMutation(postEvent, {
    onSuccess: (event: Event) => {
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      //queryClient.setQueryData(EVENTS_QUERY_KEY, (old: any) => [...old, event]);
      toast({
        title: 'Dodano wydarzenie',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const getEventsForDate = (date: Dayjs): Event[] => {
    return query.data?.filter((event: Event) => {
      return dayjs(event.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD');
    })!;
  };

  return { query, postMutation, getEventsForDate };
}

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { CreateEventDto, Event, UpdateEventDto } from '../entities/Event';

const EVENTS_QUERY_KEY = 'events';

export default function useEvents(disableAutoRefetch = false, injectedYearCourseId?: string) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { yearCourseId } = useParams();

  const getEvents = async (): Promise<Event[]> => {
    let computedYearCourseId;
    if (!yearCourseId) {
      computedYearCourseId = injectedYearCourseId;
    } else {
      computedYearCourseId = yearCourseId;
    }

    console.log('Getting events for ' + computedYearCourseId);
    const response = await axios.get(`yearCourse/${computedYearCourseId}/events`);
    return response.data;
  };

  const postEvent = async (payload: CreateEventDto): Promise<Event> => {
    const response = await axios.post(`yearCourse/${yearCourseId}/events`, payload);
    return response.data;
  };

  const updateEvent = async (payload: UpdateEventDto): Promise<Event> => {
    const response = await axios.put(`events/${payload.id}`, payload);
    return response.data;
  };

  const deleteEvent = async (id: string): Promise<Event> => {
    const response = await axios.delete(`events/${id}`);
    return response.data;
  };

  const query = useQuery(EVENTS_QUERY_KEY, getEvents, { enabled: !disableAutoRefetch });

  const postMutation = useMutation(postEvent, {
    onSuccess: (event: Event) => {
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Dodano wydarzenie',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const updateMutation = useMutation(updateEvent, {
    onSuccess: (event: Event) => {
      queryClient.invalidateQueries(EVENTS_QUERY_KEY);
      toast({
        title: 'Zaktualizowano wydarzenie',
        status: 'success',
        duration: 2000,
      });
    },
  });

  const deleteMutation = useMutation(deleteEvent, {
    onSuccess: (event: Event) => {
      queryClient.setQueryData(EVENTS_QUERY_KEY, (old: any) => old.filter((e: Event) => e.id !== event.id));
      toast({
        title: 'Usunięto wydarzenie',
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

  return { query, postMutation, updateMutation, deleteMutation, getEventsForDate };
}

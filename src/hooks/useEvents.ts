import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
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

  const query = useQuery(EVENTS_QUERY_KEY, getEvents);

  return { query };
}

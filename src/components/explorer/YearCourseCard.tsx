import { Badge, Button, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { YearCourseType } from '../../entities/YearCourse';
import useEvents, { EVENTS_QUERY_KEY } from '../../hooks/useEvents';
import { Path } from '../../other/Paths';

interface Props {
  isAdmin: boolean;
  yearCourse: YearCourseType;
}

export const YearCourseCard = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { getEvents } = useEvents();
  const eventsQuery = useQuery(EVENTS_QUERY_KEY, () => getEvents(props.yearCourse.id), { enabled: false });

  const navigateToDashboard = async (yearCourse: YearCourseType) => {
    setIsLoading(true);
    await eventsQuery.refetch();

    navigate(`${Path.CALENDAR}/${yearCourse.id}`);
  };

  return (
    <Flex borderRadius={5} p={5} backgroundColor={'gray.700'} shadow={'dark-lg'} w={['80%', '80%', '20%']}>
      <VStack alignItems={'baseline'} w={'100%'}>
        <Flex w={'100%'} align={'self-start'}>
          <Text>{props.yearCourse.name}</Text>
          <Spacer />
          <Badge colorScheme={props.isAdmin ? 'red' : 'green'} variant={'solid'}>
            {props.isAdmin ? 'admin' : 'user'}
          </Badge>
        </Flex>

        <Text>{props.yearCourse.startYear}</Text>
        <Spacer />
        <Button w={'100%'} onClick={() => navigateToDashboard(props.yearCourse)} isLoading={isLoading}>
          Wybierz
        </Button>
      </VStack>
    </Flex>
  );
};

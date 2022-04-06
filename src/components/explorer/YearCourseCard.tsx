import { Button, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { YearCourseType } from '../../entities/YearCourse';
import { Path } from '../../other/Paths';

interface Props {
  yearCourse: YearCourseType;
}

export const YearCourseCard = (props: Props) => {
  const navigate = useNavigate();

  const navigateToDashboard = (yearCourse: YearCourseType) => {
    navigate(`${Path.CALENDAR}/${yearCourse.id}`);
  };

  return (
    <Flex borderRadius={5} p={5} backgroundColor={'gray.700'} shadow={'dark-lg'}>
      <VStack alignItems={'baseline'} w={'100%'}>
        <Text>{props.yearCourse.name}</Text>
        <Text>{props.yearCourse.startYear}</Text>
        <Spacer />
        <Button w={'100%'} onClick={() => navigateToDashboard(props.yearCourse)}>
          Wybierz
        </Button>
      </VStack>
    </Flex>
  );
};

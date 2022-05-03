import { Badge, Button, Flex, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { YearCourseType } from '../../entities/YearCourse';
import { Path } from '../../other/Paths';
import useStore from '../../zustand/store';

interface Props {
  yearCourse: YearCourseType;
}

export const YearCourseCard = (props: Props) => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  const navigateToDashboard = (yearCourse: YearCourseType) => {
    navigate(`${Path.CALENDAR}/${yearCourse.id}`);
  };

  const isAdmin = () => {
    const admins = props.yearCourse.admins;
    return admins && admins.some((admin) => admin.email === user.email);
  };

  return (
    <Flex borderRadius={5} p={5} backgroundColor={'gray.700'} shadow={'dark-lg'} w={['80%', '80%', '20%']}>
      <VStack alignItems={'baseline'} w={'100%'}>
        <Flex w={'100%'} align={'self-start'}>
          <Text>{props.yearCourse.name}</Text>
          <Spacer />
          <Badge colorScheme={'red'} variant={'solid'}>
            {isAdmin() ? 'admin' : 'user'}
          </Badge>
        </Flex>

        <Text>{props.yearCourse.startYear}</Text>
        <Spacer />
        <Button w={'100%'} onClick={() => navigateToDashboard(props.yearCourse)}>
          Wybierz
        </Button>
      </VStack>
    </Flex>
  );
};

import { Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { scrollbarStyle } from '../shared/styles';
import { RoleCreateModal } from './RoleCreateModal';
import { useParams } from 'react-router-dom';
import { RoleListItem } from './RoleListItem';
import { useQuery } from 'react-query';
import { YEAR_COURSE_QUERY_KEY } from '../../../hooks/useRole';
import useYearCourses from '../../../hooks/useYearCourses';

export const RolesPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { yearCourseId } = useParams();

  const { getYearCourse } = useYearCourses();

  const yearCourseDataQuery = useQuery(YEAR_COURSE_QUERY_KEY, () => getYearCourse(yearCourseId!));

  return (
    <>
      <RoleCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        backgroundColor={'gray.750'}
        p={7}
        shadow={'dark-lg'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Role
          </Text>
          <Spacer />
          <Button variant={'ghost'} onClick={onOpen} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {yearCourseDataQuery.data?.admins!.map((admin, index) => (
            <div key={admin.id}>
              <RoleListItem user={admin} />

              {index < yearCourseDataQuery.data?.admins!.length - 1 && <Divider />}
            </div>
          ))}
        </Box>
      </Flex>
    </>
  );
};

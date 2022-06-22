import { Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { scrollbarStyle } from '../shared/styles';
import { RoleCreateModal } from './RoleCreateModal';
import useYearCourses from '../../../hooks/useYearCourses';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { YearCourseType } from '../../../entities/YearCourse';
import { RoleListItem } from './RoleListItem';
import useMyDetails from '../../../hooks/useMyDetails';
import axios from 'axios';

export const RolesPanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { yearCourseId } = useParams();
  const [yearCourse, setYearCourse] = useState<YearCourseType>();

  useEffect(() => {
    initializeYearCourseData();
  });

  const initializeYearCourseData = async () => {
    const response = await axios.get(`/yearCourses/${yearCourseId}`);
    setYearCourse(response.data);
  };

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
          {yearCourse &&
            yearCourse.admins!.map((admin, index) => (
              <div key={admin.id}>
                <RoleListItem user={admin} />

                {index < yearCourse.admins!.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
};

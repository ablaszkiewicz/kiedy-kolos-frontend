import { Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { SubjectListItem } from './SubjectListItem';
import useSubjects from '../../../hooks/useSubjects';
import { SubjectType } from '../../../entities/Subject';
import { SubjectCreateModal } from './SubjectCreateModal';
import { AddIcon } from '@chakra-ui/icons';
import { scrollbarStyle } from '../shared/styles';

export const SubjectsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query } = useSubjects();

  return (
    <>
      <SubjectCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
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
            Przedmioty
          </Text>
          <Spacer />
          <Button variant={'ghost'} onClick={onCreateModalOpen} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {query.data &&
            query.data.map((subject: SubjectType, i: number) => (
              <div key={subject.id}>
                <SubjectListItem subject={subject} />
                {i < query.data.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
};

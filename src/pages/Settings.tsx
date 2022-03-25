import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { SubjectCreateModal } from '../components/admin/subjects/SubjectCreateModal';
import { SubjectListItem } from '../components/admin/subjects/SubjectListItem';
import { SubjectType } from '../entities/Subject';
import useSubjects from '../hooks/useSubjects';
import { Path } from '../other/Paths';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Settings = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query } = useSubjects();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Ustawienia</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>
      <SimpleGrid columns={3} flexGrow={1} overflowY={'hidden'}>
        <Flex direction={'column'} flexGrow={1} overflowY={'hidden'} p={10} m={-10}>
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
        </Flex>
      </SimpleGrid>
    </Flex>
  );
};

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '24px',
  },
};

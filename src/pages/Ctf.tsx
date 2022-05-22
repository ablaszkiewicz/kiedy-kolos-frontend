import { Button, Flex, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { AutomaticTask } from '../components/ctf/AutomaticTask';
import { FlagTask } from '../components/ctf/FlagTask';
import { useCtf } from '../hooks/useCtf';
import { Path } from '../other/Paths';

export const Ctf = () => {
  const navigate = useNavigate();
  const {
    individualResultsQuery: query,
    checkTask1Mutation,
    checkTask2Mutation,
    checkTask3Mutation,
    checkTask4Mutation,
    enrollMutation,
  } = useCtf();

  useEffect(() => {
    if (!query.data) {
      enrollToCtf();
    }
  }, [query.data]);

  const enrollToCtf = () => {
    enrollMutation.mutate();
  };

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Sekcja CTF</Heading>
        <Spacer />
        <Button ml={3} onClick={() => navigate(Path.CTF_RESULTS)} leftIcon={<HiOutlineViewGrid />}>
          <Text display={['none', 'unset']}>Wyniki CTF</Text>
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
          <Text display={['none', 'unset']}>Wybór kierunku</Text>
        </Button>
      </Flex>
      <VStack w={'100%'} flexGrow={1} mt={10} gap={6}>
        <AutomaticTask
          completed={query.data?.task1 == 1}
          taskNumber={1}
          checkMethod={checkTask1Mutation}
          description={'Stwórz kierunek z datą rozpoczęcia "1000"'}
        />
        <FlagTask
          completed={query.data?.task2 == 1}
          taskNumber={2}
          checkMethod={checkTask2Mutation}
          description={'Istnieje kierunek, który nazywa się "kryjewsobieflage ...". Znajdziesz w nim flagę.'}
        />
        <AutomaticTask
          completed={query.data?.task3 == 1}
          taskNumber={3}
          checkMethod={checkTask3Mutation}
          description={
            'Istnieje kierunek, którego UUID to "29872d18-715d-446d-b341-0ddd262364dc". Spróbuj nadać sobie do niego prawa administratora'
          }
        />
        <FlagTask
          completed={query.data?.task4 == 1}
          taskNumber={4}
          checkMethod={checkTask4Mutation}
          description={'Istnieje użytkownik, którego UUID to "b97c3d02-ea33-49a1-9537-dbdb0872c953". Email to flaga.'}
        />
      </VStack>
    </Flex>
  );
};

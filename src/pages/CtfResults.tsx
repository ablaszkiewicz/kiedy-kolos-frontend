import {
  Button,
  Flex,
  Heading,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { SiHackaday } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useCtf } from '../hooks/useCtf';
import { Path } from '../other/Paths';

export const CtfResults = () => {
  const { resultsQuery } = useCtf();
  const navigate = useNavigate();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Wyniki CTF</Heading>
        <Spacer />
        <Button ml={3} onClick={() => navigate(Path.CTF)} leftIcon={<SiHackaday />}>
          <Text display={['none', 'unset']}>CTF</Text>
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<HiOutlineViewGrid />}>
          <Text display={['none', 'unset']}>Wybór kierunku</Text>
        </Button>
      </Flex>
      <Flex justifyContent={'space-around'} mt={10}>
        <TableContainer w={'80%'}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Użytkownik</Th>
                <Th isNumeric>Zadanie 1</Th>
                <Th isNumeric>Zadanie 2</Th>
                <Th isNumeric>Zadanie 3</Th>
                <Th isNumeric>Zadanie 4</Th>
                <Th isNumeric>Czas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {resultsQuery.data?.map((result) => (
                <Tr>
                  <Td>{result.user.email}</Td>
                  <Td isNumeric>{result.task1}</Td>
                  <Td isNumeric>{result.task2}</Td>
                  <Td isNumeric>{result.task3}</Td>
                  <Td isNumeric>{result.task4}</Td>
                  <Td isNumeric>-</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

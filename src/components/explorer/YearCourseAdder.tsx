import { Button, Flex, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { YearCourseCreateModal } from './YearCourseCreateModal';

export const YearCourseAdder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <YearCourseCreateModal isOpen={isOpen} onClose={onClose} />
      <Flex borderWidth={1} borderRadius={5} p={5}>
        <VStack alignItems={'baseline'} w={'100%'}>
          <Text>Dodaj nowy kierunek</Text>
          <Button w={'100%'} onClick={onOpen}>
            Dodaj
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

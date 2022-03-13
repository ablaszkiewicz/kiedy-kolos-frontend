import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, HStack, SimpleGrid, Spacer, Text } from '@chakra-ui/react';

export const CalendarPanel = () => {
  const days = Array.apply(null, Array(35)).map(function () {});

  console.log(days);

  return (
    <HStack w={'100%'} h={'100%'} flexGrow={1}>
      <Flex w={'70%'} h={'100%'} borderRadius={10}>
        <SimpleGrid columns={7} flexGrow={1} gap={2}>
          {days.map((day, i) => (
            <Flex height={'auto'} backgroundColor={'gray.700'} borderRadius={10} shadow={'xl'} p={2}>
              <Spacer />
              <Text fontWeight={'bold'}>{i}</Text>
            </Flex>
          ))}
          {/* <Flex backgroundColor={'red'} height={'20px'} width={'20px'}></Flex> */}
        </SimpleGrid>
      </Flex>
      <Flex
        w={'30%'}
        backgroundColor={'gray.700'}
        h={'100%'}
        shadow={'xl'}
        borderRadius={10}
        p={7}
        direction={'column'}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Wydarzenia
          </Text>
          <Spacer />
          <Button variant={'ghost'} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>
      </Flex>
    </HStack>
  );
};

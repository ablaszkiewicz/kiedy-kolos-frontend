import { Flex, Spacer, Text, Button, VStack } from '@chakra-ui/react';

interface Props {
  name: string;
  teacher: string;
}

export const Subject = ({ name, teacher }: Props) => {
  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <VStack align={'baseline'} spacing={0}>
        <Text>{name}</Text>
        <Text fontSize={'xs'}>{teacher}</Text>
      </VStack>
      <Spacer />
      <Button mx={1}>Zacznij uczyć</Button>
    </Flex>
  );
};

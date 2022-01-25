import { LinkIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Text, Button, Center, IconButton, useToast, VStack } from '@chakra-ui/react';
import useAuth from '../../../../hooks/useAuth';

interface Props {
  name: string;
  teacher: string;
}

export const Subject = ({ name, teacher }: Props) => {
  const { user, login, error } = useAuth();

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <VStack align={'baseline'} spacing={0}>
        <Text>{name}</Text>
        <Text fontSize={'xs'}>{teacher}</Text>
      </VStack>
      <Spacer />
      <Button mx={1} onClick={() => login('anna@pg.edu.pl', '123')}>
        Zacznij uczyć
      </Button>
    </Flex>
  );
};

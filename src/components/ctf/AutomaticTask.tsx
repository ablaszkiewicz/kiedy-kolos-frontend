import {
  Flex,
  FormLabel,
  Input,
  Button,
  Text,
  FormControl,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

interface Props {
  completed: boolean;
  taskNumber: number;
  description: string;
  checkMethod: any;
}

export const AutomaticTask = (props: Props) => {
  return (
    <Flex w={'40%'} backgroundColor={'gray.750'} borderRadius={10} p={7} direction={'column'}>
      <Text fontWeight={'bold'} fontSize={'2xl'} mb={4}>
        Zadanie {props.taskNumber}
      </Text>

      <Text>{props.description}</Text>

      {!props.completed && (
        <Alert
          mt={3}
          status='warning'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          borderRadius={10}
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Nie wykryto ukończenia flagi
          </AlertTitle>
          <AlertDescription maxWidth='sm'>Ta flaga sprawdza się automatycznie.</AlertDescription>
          <Button mt={2} onClick={() => props.checkMethod.mutate()} isLoading={props.checkMethod.isLoading}>
            Sprawdź
          </Button>
        </Alert>
      )}
      {props.completed && (
        <Alert
          mt={3}
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          borderRadius={10}
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={1} fontSize='lg'>
            Ukończono flagę
          </AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Code,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

export const Ctf = () => {
  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'}>
      <Heading>Sekcja CTF</Heading>
      <VStack w={'100%'} flexGrow={1} mt={10} gap={6}>
        <Flex w={'40%'} backgroundColor={'gray.750'} borderRadius={10} p={7} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'2xl'} mb={4}>
            Zadanie 1
          </Text>
          <Text mb={2}>Stwórz kierunek z datą rozpoczęcia:</Text>
          <Code borderRadius={10} p={2} mb={2}>
            1000
          </Code>

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
            <AlertDescription maxWidth='sm'>Ta flaga sprawdza się automatycznie</AlertDescription>
          </Alert>
        </Flex>

        <Flex w={'40%'} backgroundColor={'gray.750'} borderRadius={10} p={7} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'2xl'} mb={4}>
            Zadanie 2
          </Text>
          <Text mb={2}>Istnieje kierunek, który nazywa się:</Text>
          <Code borderRadius={10} p={2} mb={2}>
            kryjewsobieflage
          </Code>
          <Text>Znajdziesz w nim flagę</Text>

          <FormControl mt={10}>
            <FormLabel htmlFor='flag1'>Flaga</FormLabel>
            <Input id='flag1' type='email' />
          </FormControl>

          <Button mt={2}>Sprawdź</Button>
        </Flex>
        <Flex w={'40%'} backgroundColor={'gray.750'} borderRadius={10} p={7} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'2xl'} mb={4}>
            Zadanie 3
          </Text>
          <Text mb={2}>Istnieje kierunek, którego UUID to:</Text>
          <Code borderRadius={10} p={2} mb={2}>
            123e4567-e89b-12d3-a456-426614174000
          </Code>
          <Text mb={2}>Spróbuj sobie do niego nadać prawa administratora</Text>

          <Alert
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
          </Alert>
        </Flex>
        <Flex w={'40%'} backgroundColor={'gray.750'} borderRadius={10} p={7} direction={'column'}>
          <Text fontWeight={'bold'} fontSize={'2xl'} mb={4}>
            Zadanie 4
          </Text>
          <Text mb={2}>Użytkownik </Text>

          <Alert
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
          </Alert>
        </Flex>
      </VStack>
    </Flex>
  );
};

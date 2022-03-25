import { AddIcon, ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Circle, Flex, Grid, Heading, HStack, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateSchema } from 'yup';
import useAuth from '../hooks/useAuth';
import { Path } from '../other/Paths';

export const Calendar = () => {
  const [days, setDays] = useState<any[]>([]);
  const freeDays = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34];
  const dayNames = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nie'];

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const daysTemp = [];

    for (let i = 0; i < 35; i++) {
      const day: any = {};
      const events = [];
      if (Math.random() > 0.6) {
        events.push({ bg: 'red' });
        if (Math.random() > 0.5) {
          if (Math.random() > 0.5) {
            events.push({ bg: 'green' });
          }
          events.push({ bg: 'yellow' });
        }
      }
      day.events = events;
      daysTemp.push(day);
    }
    setDays(daysTemp);
  }, []);

  const { yearCourseId } = useParams();

  return (
    <Flex p={4} m={0} h={['auto', '100vh']} direction={'column'} overflow={'hidden'}>
      <Flex m={0} p={0} mb={2}>
        <Heading>Kalendarz</Heading>
        <Spacer />
        <Button onClick={() => navigate(Path.SETTINGS + `/${yearCourseId}`)} leftIcon={<SettingsIcon />}>
          Ustawienia
        </Button>
        <Button ml={3} onClick={() => navigate(Path.EXPLORER)} leftIcon={<ArrowBackIcon />}>
          Wybór kierunku
        </Button>
        <Button ml={3} onClick={() => logout()}>
          Wyloguj
        </Button>
      </Flex>

      <HStack flexGrow={1} spacing={4}>
        <Flex direction={'column'} w={'70%'} h={'100%'} borderRadius={10} p={4} backgroundColor={'gray.750'}>
          <SimpleGrid columns={7} gap={2} mb={2}>
            {dayNames.map((name) => (
              <Flex>
                <Spacer />
                <Text opacity={0.6}>{name}</Text>
                <Spacer />
              </Flex>
            ))}
          </SimpleGrid>
          <Grid templateColumns={'repeat(7, 1fr)'} templateRows={'repeat(5, 1fr)'} gap={2} flexGrow={1} minHeight={0}>
            {days.map((day, i) => (
              <Flex
                direction={'column'}
                align={'center'}
                borderRadius={10}
                backgroundColor={i == 16 ? 'blue.600' : freeDays.includes(i) ? 'gray.700' : 'gray.700'}
                shadow={i == 16 ? 'md' : 'inner'}
                minHeight={'0px'}
                p={2}
                gap={2}
              >
                <Spacer />
                <Text fontWeight={'medium'} fontSize={'2xl'}>
                  {i}
                </Text>
                <HStack spacing={1}>
                  {day.events &&
                    day.events.map((event: any) => (
                      <Badge variant={'solid'} colorScheme={event.bg}>
                        Ako
                      </Badge>
                    ))}
                </HStack>
                <Spacer />
              </Flex>
            ))}
          </Grid>
        </Flex>
        <Flex
          w={'30%'}
          backgroundColor={'gray.750'}
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
    </Flex>
  );
};

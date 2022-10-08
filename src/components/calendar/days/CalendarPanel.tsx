import { ArrowBackIcon, ArrowForwardIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Flex,
  SimpleGrid,
  Spacer,
  Grid,
  Text,
  IconButton,
  GridItem,
  Center,
  SlideFade,
  Button,
  useDisclosure,
  Badge,
  Avatar,
  AvatarBadge,
  Show,
  Hide,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { DayCard } from './DayCard';
import useCalendar from '../../../hooks/useCalendar';
import { useSetState } from '../../../hooks/useSetState';
import dayjs from 'dayjs';
import useStore from '../../../zustand/store';
import { BsBell, BsBellFill, BsFilter } from 'react-icons/bs';
import { FiltersModal } from './FiltersModal';
import useGroups from '../../../hooks/useGroups';
import { MobileIconButton } from '../../other/MobileIconButton';

enum SlideDirection {
  LEFT = -1,
  RIGHT = 1,
}

interface State {
  days: string[];
  monthOffset: number;
  direction: SlideDirection;
}

export const CalendarPanel = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dayNames = ['pon', 'wt', 'śr', 'czw', 'pt', 'sob', 'nie'];
  const setClickedDate = useStore((state) => state.setClickedDate);
  const { query } = useGroups();
  const visibleGroupIds = useStore((state) => state.visibleGroupIds);

  const [state, setState] = useSetState({
    days: [],
    monthOffset: 0,
    direction: SlideDirection.RIGHT,
  } as State);

  const { getDaysInMonth, getMonthName } = useCalendar();

  useEffect(() => {
    setClickedDate(dayjs());
  }, []);

  useEffect(() => {
    setState({ days: getDaysInMonth(state.monthOffset) });
  }, [state.monthOffset]);

  const anyGroupSelected = query.data?.some((group) => visibleGroupIds.includes(group.id));

  return (
    <Flex
      direction={'column'}
      w={['100%', '70%']}
      h={['60vh', '100%']}
      borderRadius={10}
      p={[2, 4]}
      backgroundColor={'gray.750'}
      shadow={'dark-lg'}
    >
      <FiltersModal isOpen={isOpen} onClose={onClose} />
      <Center gap={[1, 3]} backgroundColor={''} borderRadius={10} mb={[0, 2]}>
        <Flex flex={'1 1 0'} position={'relative'}>
          <MobileIconButton icon={<BsBellFill />} onClick={onOpen} label={'Powiadomienia'} warning />
          <Spacer />
        </Flex>

        <Spacer />
        <Flex alignItems={'center'} flex={'1 1 0'} gap={3}>
          <IconButton
            aria-label='left'
            icon={<ArrowBackIcon />}
            onClick={() => {
              setState({ monthOffset: state.monthOffset - 1 });
              setState({ direction: SlideDirection.LEFT });
            }}
          />
          <Flex direction={'column'} textAlign={'center'}>
            <SlideFade
              in={true}
              key={state.monthOffset}
              offsetX={20 * state.direction}
              offsetY={0}
              style={{ width: '100%' }}
            >
              <Text fontWeight={'medium'} fontSize={'2xl'} width={'100%'}>
                {getMonthName(state.monthOffset)}
              </Text>
            </SlideFade>
            <Text w={'100%'} fontSize={'sm'} color={'gray.400'}>
              {dayjs().add(state.monthOffset, 'month').format('YYYY')}
            </Text>
            <Text h={0} opacity={0}>
              Thisisthelongest
            </Text>
          </Flex>
          <IconButton
            aria-label='left'
            icon={<ArrowForwardIcon />}
            onClick={() => {
              setState({ monthOffset: state.monthOffset + 1 });
              setState({ direction: SlideDirection.RIGHT });
            }}
          />
        </Flex>

        <Spacer />
        <Flex flex={'1 1 0'} alignContent={'end'}>
          <Spacer />
          <MobileIconButton icon={<BsFilter />} onClick={onOpen} label={'Filtry'} warning={!anyGroupSelected} />
        </Flex>
      </Center>
      <SimpleGrid columns={7} gap={2} mb={2}>
        {dayNames.map((name) => (
          <Flex key={name}>
            <Spacer />
            <Text opacity={0.6}>{name}</Text>
            <Spacer />
          </Flex>
        ))}
      </SimpleGrid>

      <SlideFade
        in={true}
        key={state.monthOffset}
        offsetX={75 * state.direction}
        offsetY={0}
        style={{ height: '100%', overflow: 'hidden', flexGrow: ' 1' }}
      >
        <Grid
          templateColumns={'repeat(7, 1fr)'}
          templateRows={'repeat(6, 1fr)'}
          gap={[1, 2]}
          flexGrow={1}
          minHeight={0}
          height={'100%'}
          overflow={'hidden'}
        >
          {state.days.map((day) => (
            <DayCard date={dayjs(day)} monthOffset={state.monthOffset} key={state.monthOffset + day} />
          ))}
        </Grid>
      </SlideFade>
    </Flex>
  );
};

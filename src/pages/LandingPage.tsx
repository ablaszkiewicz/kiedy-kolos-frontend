import { Box, Flex, GridItem, Heading, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import { useScrollPercentage } from 'react-scroll-percentage';
import { CalendarFunction } from '../components/landing/CalendarFunction';
import { ConfigFunction } from '../components/landing/ConfigFunction';
import { ElasticFunction } from '../components/landing/ElasticFunction';
import { Hero } from '../components/landing/hero/Hero';
import { Statistics } from '../components/landing/Statistics';

export const LandingPage = () => {
  const [ref, percentage] = useScrollPercentage({
    threshold: 0,
  });

  return (
    <>
      <Hero scrollPercentage={percentage} />
      <Statistics refProp={ref} />
      <CalendarFunction />
      <ConfigFunction />
      <ElasticFunction />
    </>
  );
};

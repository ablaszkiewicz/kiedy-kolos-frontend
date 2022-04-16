import { Box, ScaleFade, SlideFade, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Props {
  message: string;
  author: string;
  scrollFunction: () => void;
}

export const MessageListItem = (props: Props) => {
  useEffect(() => {
    props.scrollFunction();
  }, []);

  return (
    <SlideFade in offsetX={'-20px'} offsetY={'0px'}>
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        <Text style={{ fontSize: '14px', marginLeft: '3px' }}>{props.author}</Text>
        <Box backgroundColor={'#2D3748'} style={{ borderRadius: 10, alignSelf: 'baseline', padding: 5 }}>
          {props.message}
        </Box>
      </Box>
    </SlideFade>
  );
};

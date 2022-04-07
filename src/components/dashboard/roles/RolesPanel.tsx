import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { scrollbarStyle } from '../shared/styles';

export const RolesPanel = () => {
  return (
    <Flex
      direction={'column'}
      borderRadius={10}
      backgroundColor={'gray.750'}
      p={7}
      shadow={'dark-lg'}
      overflowY={'hidden'}
      flexGrow={10}
    >
      <Flex mb={4}>
        <Text fontWeight={'bold'} fontSize={'2xl'}>
          Role
        </Text>
        <Spacer />
        <Button variant={'ghost'} leftIcon={<AddIcon />}>
          Dodaj
        </Button>
      </Flex>

      <Box overflowY={'scroll'} css={scrollbarStyle}></Box>
    </Flex>
  );
};

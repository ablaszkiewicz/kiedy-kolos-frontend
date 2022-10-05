import { Box, Button, Divider, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { scrollbarStyle } from '../shared/styles';
import useGroups from '../../../hooks/useGroups';
import { Group } from '../../../entities/Group';
import { GroupListItem } from './GroupsListItem';
import { GroupCreateModal } from './GroupCreateModal';

export const GroupsPanel = () => {
  const { isOpen: isCreateModalOpen, onOpen: onCreateModalOpen, onClose: onCreateModalClose } = useDisclosure();
  const { query: groupsQuery } = useGroups();

  return (
    <>
      <GroupCreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      <Flex
        direction={'column'}
        borderRadius={10}
        backgroundColor={'gray.750'}
        p={7}
        shadow={'dark-lg'}
        overflowY={'hidden'}
        flexGrow={1}
      >
        <Flex mb={4}>
          <Text fontWeight={'bold'} fontSize={'2xl'}>
            Grupy
          </Text>
          <Spacer />
          <Button variant={'ghost'} onClick={onCreateModalOpen} leftIcon={<AddIcon />}>
            Dodaj
          </Button>
        </Flex>

        <Box overflowY={'scroll'} css={scrollbarStyle}>
          {groupsQuery.data
            ?.sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((group: Group, index: number) => (
              <div key={group.id}>
                <GroupListItem group={group} />
                {index < groupsQuery.data.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      </Flex>
    </>
  );
};

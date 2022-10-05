import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Checkbox,
  CheckboxGroup,
  Flex,
} from '@chakra-ui/react';
import { InputControl } from 'formik-chakra-ui';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useGroups from '../../../hooks/useGroups';
import useStore from '../../../zustand/store';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FiltersModal = (props: Props) => {
  const { yearCourseId } = useParams();

  const visibleGroupIds = useStore((state) => state.visibleGroupIds);
  const addVisibleGroupId = useStore((state) => state.addVisibleGroupId);
  const removeVisibleGroupId = useStore((state) => state.removeVisibleGroupId);
  const { query } = useGroups();

  const onCheckboxChange = (groupId: string, value: boolean) => {
    if (value) {
      addVisibleGroupId(groupId);
    } else {
      removeVisibleGroupId(groupId);
    }
  };
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtry</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text mb={5}>
            Na kalendarzu oraz w pasku wydarzeń będziesz widział tylko wydarzenia dotyczące poniższych grup
          </Text>
          <Flex direction={'column'}>
            {query.data
              ?.sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((group) => (
                <Checkbox
                  key={group.id}
                  onChange={(e) => onCheckboxChange(e.target.value, e.target.checked)}
                  value={group.id}
                  defaultChecked={visibleGroupIds.includes(group.id)}
                >
                  {group.name}
                </Checkbox>
              ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose}>Wyjdź</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

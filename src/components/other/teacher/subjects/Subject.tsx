import { DeleteIcon, LinkIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Button, Center, IconButton, useToast } from '@chakra-ui/react';
import useSubjects, { SubjectType } from '../../../../hooks/useSubjects';

interface Props {
  subject: SubjectType;
}

export const Subject = ({ subject }: Props) => {
  const toast = useToast();
  const { deleteMutation } = useSubjects();

  const onLinkButtonClick = () => {
    toast({
      title: 'Link do dołączenia',
      description: 'Skopiowano link do dołączenia do schowka',
      status: 'success',
      duration: 2000,
    });
  };

  const onDeleteButtonClick = () => {
    deleteMutation.mutate(subject.id!);
  };

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Center>{subject.name}</Center>
      <Spacer />
      <IconButton onClick={() => onLinkButtonClick()} aria-label='Skopiuj link' icon={<LinkIcon />} />
      <Button mx={1}>Pokaż</Button>
      <IconButton onClick={() => onDeleteButtonClick()} aria-label='Skopiuj link' icon={<DeleteIcon />} />
    </Flex>
  );
};

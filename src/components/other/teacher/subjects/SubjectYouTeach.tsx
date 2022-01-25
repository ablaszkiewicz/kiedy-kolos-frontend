import { LinkIcon } from '@chakra-ui/icons';
import { Flex, Spacer, Text, Button, Center, IconButton, useToast } from '@chakra-ui/react';

interface Props {
  name: string;
}

export const SubjectYouTeach = ({ name }: Props) => {
  const toast = useToast();
  const onLinkButtonClick = () => {
    toast({
      title: 'Link do dołączenia',
      description: 'Skopiowano link do dołączenia do schowka',
      status: 'success',
      duration: 1500,
    });
  };

  return (
    <Flex borderWidth={'1px'} width={'24em'} m={2} p={2} borderRadius={5}>
      <Center>{name}</Center>
      <Spacer />
      <IconButton onClick={() => onLinkButtonClick()} aria-label='Skopiuj link' icon={<LinkIcon />} />
      <Button mx={1}>Pokaż</Button>
    </Flex>
  );
};

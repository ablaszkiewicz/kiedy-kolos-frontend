import { Button, Hide, Badge, Text, Show, IconButton } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';

interface Props {
  onClick: () => void;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  label: string;
  warning?: boolean;
  disabled?: boolean;
}

export const MobileIconButton = (props: Props) => {
  const warning = (
    <Badge left={6} top={2} position={'absolute'} variant={'solid'} colorScheme={'red'}>
      !
    </Badge>
  );

  return (
    <>
      <Show below='md'>
        <IconButton aria-label='button' icon={props.icon} onClick={props.onClick} disabled={props.disabled}>
          {props.warning && warning}
        </IconButton>
      </Show>
      <Hide below='md'>
        <Button leftIcon={props.icon} onClick={props.onClick} disabled={props.disabled}>
          {props.label}
          {props.warning && warning}
        </Button>
      </Hide>
    </>
  );
};

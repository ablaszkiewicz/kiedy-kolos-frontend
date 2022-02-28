import { Flex, Button, Input } from '@chakra-ui/react';
import { useSetState } from '../../../hooks/useSetState';
import useSubjects from '../../../hooks/useSubjects';

interface State {
  name: string;
  shortName: string;
}

export const SubjectAdder = () => {
  const [state, setState] = useSetState({
    name: '',
    shortName: '',
  } as State);
  const { postMutation } = useSubjects();

  return (
    <Flex borderWidth={'1px'} m={2} p={2} borderRadius={5}>
      <Input
        placeholder='Skrót'
        value={state.shortName}
        onChange={(e) => setState({ shortName: e.target.value })}
        mr={2}
        flexBasis={0}
        flexGrow={1}
      />
      <Input
        placeholder='Pełna nazwa'
        value={state.name}
        onChange={(e) => setState({ name: e.target.value })}
        flexBasis={0}
        flexGrow={3}
      />

      <Button
        ml={2}
        onClick={() => postMutation.mutate({ id: 0, name: state.name, shortName: state.shortName })}
        isLoading={postMutation.isLoading}
        flexShrink={0}
      >
        Dodaj
      </Button>
    </Flex>
  );
};

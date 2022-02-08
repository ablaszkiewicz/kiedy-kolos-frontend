import { Flex, Button, Input} from '@chakra-ui/react';
import useSubjects from '../../../../hooks/useSubjects';
import {useSetState} from "../../../../hooks/useSetState";

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
	<Flex borderWidth={'1px'} width={'30em'} m={2} p={2} borderRadius={5}>
	  <Flex>
		<Input
			placeholder='Pełna nazwa...'
			value={state.name}
			onChange={(e) => setState({name: e.target.value})}
			mr={2}
		/>
		<Input
			placeholder='Krótka nazwa...'
			value={state.shortName}
			onChange={(e) => setState({shortName: e.target.value})}
		/>
	  </Flex>

	  <Button
		ml={2}
		onClick={() => postMutation.mutate({ id: 0, name: state.name, shortName: state.shortName })}
		isLoading={postMutation.isLoading}
	  >
		Dodaj
	  </Button>
	</Flex>
  );
};

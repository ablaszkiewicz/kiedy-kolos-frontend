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
  Code,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useSetState } from '../../../hooks/useSetState';
import useSubjects from '../../../hooks/useSubjects';
import useYearCourses from '../../../hooks/useYearCourses';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  yearCourseId: number;
}

interface State {
  text: string;
}

export const YearCourseDeleteModal = (props: Props) => {
  const { deleteMutation } = useYearCourses();
  const { query } = useSubjects();
  const [state, setState] = useSetState({
    text: '',
  } as State);
  const safetyText = 'wściekły tygrys';

  const deleteYearCourse = () => {
    if (state.text != safetyText) {
      return;
    }
    deleteMutation.mutate(props.yearCourseId);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Usuwanie kierunku</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {query.data && query.data.length > 0
              ? 'Usunięcie kierunku spowoduje także usunięcie  przedmiotów, group i ustawień z nim związanych'
              : 'Czy na pewno chcesz usunąć kierunek?'}
          </Text>
          <Text mt={5}>Aby potwierdzić usunięcie, przepisz ten tekst</Text>
          <Code my={2}>{safetyText}</Code>
          <FormControl>
            <FormLabel>Tekst</FormLabel>
            <Input
              value={state.text}
              onChange={(e) => setState({ text: e.target.value })}
              onPaste={(e) => e.preventDefault()}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={'3'} onClick={() => deleteYearCourse()} isLoading={deleteMutation.isLoading}>
            Usuń
          </Button>
          <Button onClick={props.onClose}>Anuluj</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

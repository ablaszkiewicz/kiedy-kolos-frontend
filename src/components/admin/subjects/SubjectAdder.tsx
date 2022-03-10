import { Flex, Button, Input, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { subjectValidationSchema } from '../../../entities/Subject';
import { useSetState } from '../../../hooks/useSetState';
import useSubjects from '../../../hooks/useSubjects';

interface State {
  name: string;
  shortName: string;
}

export const SubjectAdder = () => {
  const { postMutation } = useSubjects();

  const initialValues = {
    name: '',
    shortName: '',
  };

  const addSubject = (values: any) => {
    postMutation.mutate({ id: 0, name: values.name, shortName: values.shortName });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={addSubject} validationSchema={subjectValidationSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Flex borderWidth={'1px'} p={2} borderRadius={5}>
            {/* <InputControl name='name' inputProps={{ placeholder: 'Krótka' }} mr={2} flexBasis={0} flexGrow={1} />
            <InputControl name='shortName' inputProps={{ placeholder: 'Długa nazwa' }} flexBasis={0} flexGrow={3} /> */}
            <Button ml={2} isLoading={postMutation.isLoading} flexShrink={0} type='submit'>
              Dodaj
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

import { FormLabel, forwardRef, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import { useEffect, useState } from 'react';

import DatePickerReact from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePicker = ({ label, ...props }: any) => {
  const [field, meta, helpers] = useField(props);
  const [startDate, setStartDate] = useState(new Date());

  const DateInput = forwardRef(({ value, onClick }: any, ref): any => (
    <Input type='text' onClick={onClick} value={value} readOnly />
  ));

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <DatePickerReact
        dateFormat='dd / MM / yyyy'
        selected={startDate}
        onChange={(date: Date) => {
          setStartDate(date);
          helpers.setValue(date);
        }}
        customInput={<DateInput />}
      />
      {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
    </>
  );
};

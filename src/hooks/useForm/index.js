import {useState} from 'react';

export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);
  return [
    values,
    (key, value) => {
      if (key === 'reset') return setValues(initialValues);
      return setValues({...values, [key]: value});
    },
  ];
};

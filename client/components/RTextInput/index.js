//@flow

import React from 'react';
import TextInput from '../TextInput';

/**
 * render text input
 * this is for redux-form component for Field
 * INFO: http://redux-form.com/6.8.0/docs/api/Field.md/
 */

type Props = {
  label: string,
  translate: Function,
  meta: {
    touched: boolean,
    error: boolean,
  },
  input: Object,
};

const RTextInput = ({
  label,
  translate,
  meta: { touched, error },
  input,
  ...others
}: Props) => (
  <TextInput
    {...others}
    {...input}
    hintText={label}
    errorMessage={touched && error ? translate(error) : void 0}
  />
);

export default RTextInput;

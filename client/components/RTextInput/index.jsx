import React from 'react';
import TextInput from '../TextInput';

/**
 * render text input
 * this is for redux-form component for Field
 * INFO: http://redux-form.com/6.8.0/docs/api/Field.md/
 */

const RTextInput = ({
  className,
  input,
  label,
  meta: {
    touched,
    error
  },
  ...custom
}) => (<TextInput
  className={className}
  hintText={label}
  errorMessage={touched && error
  ? error
  : void 0}
  {...input}
  {...custom} 
/>);

export default RTextInput;
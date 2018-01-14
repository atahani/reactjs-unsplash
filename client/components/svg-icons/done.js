//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {}

const DoneIcon = ({...others}: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path
      d="M13.1 18.1l-5.6-5.6c-.6-.6-1.5-.6-2 0l-2.1 2.1c-.6.6-.6 1.5 0 2l8.7 8.7c.6.6 1.5.6 2 0l14.5-14.5c.6-.6.6-1.5 0-2l-2.1-2.1c-.6-.6-1.5-.6-2 0l-11.4 11.4z" 
    />
  </SvgIcon>
);

export default DoneIcon;
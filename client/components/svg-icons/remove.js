//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {}

const RemoveIcon = ({...others}: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path
      d="M26.5 19c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-21c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h21z" 
    />
  </SvgIcon>
);

export default RemoveIcon;
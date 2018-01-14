//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {}

const CloseIcon = ({...others}: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path
      d="M25.193 22.364l-2.828 2.828-15.556-15.556 2.828-2.828zM9.636 25.193l-2.828-2.828 15.556-15.556 2.828 2.828z" 
    />
  </SvgIcon>
);

export default CloseIcon;
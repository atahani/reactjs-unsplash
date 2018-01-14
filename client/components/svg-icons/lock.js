//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {}

const LockIcon = ({...others}: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path
      d="M27.4 15.2h-1.6v-5.4c0-2.5-1-5.1-2.9-7-1.5-1.8-4-2.8-6.9-2.8s-5.1 1.3-7 2.9c-1.9 1.9-2.8 4.1-2.8 6.9v5.4h-1.6c-.6 0-1.3.6-1.3 1.3v14.3c0 .6.7 1.2 1.3 1.2h22.8c.6 0 1.3-.6 1.3-1.3v-14.2c0-.7-.7-1.3-1.3-1.3zm-16.5-5.4c0-1.6.6-2.9 1.6-3.8 1-.9 2.2-1.6 3.5-1.6s2.5.6 3.5 1.6c1 .9 1.6 2.2 1.6 3.8v5.4h-10.2v-5.4z" 
    />
  </SvgIcon>
);

export default LockIcon;
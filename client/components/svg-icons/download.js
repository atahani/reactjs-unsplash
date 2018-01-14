//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {}

const DownloadIcon = ({...others}: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path
      d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z" 
    />
  </SvgIcon>
);

export default DownloadIcon;
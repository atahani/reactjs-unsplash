//@flow

import React from 'react';
import SvgIcon from '../SvgIcon';

type Props = {};

const LikeIcon = ({ ...others }: Props) => (
  <SvgIcon viewBox="0 0 32 32" {...others}>
    <path d="M17.4 29c-.8.8-2 .8-2.8 0l-12.3-12.8c-3.1-3.1-3.1-8.2 0-11.4 3.1-3.1 8.2-3.1 11.3 0l2.4 2.8 2.3-2.8c3.1-3.1 8.2-3.1 11.3 0 3.1 3.1 3.1 8.2 0 11.4l-12.2 12.8z" />
  </SvgIcon>
);

export default LikeIcon;

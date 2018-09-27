//flow

import styled from 'styled-components';
import { Link as _Li } from 'react-router-dom';
import { activeLinkColor, linkColor } from '../../style/colors';

const Link = styled(_Li)`
  color: ${linkColor};
  &:hover {
    color: ${activeLinkColor};
  }
`;

export default Link;

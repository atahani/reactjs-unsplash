//@flow

import styled from 'styled-components';
import { secondaryColor1, primaryColor1 } from '../../style/colors';

const ExtLink = styled.a`
  padding: 6px;
  color: ${secondaryColor1};
  text-decoration: underline;
  transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  &:hover,
  &:focus {
    color: ${primaryColor1};
  }
`;

export default ExtLink;

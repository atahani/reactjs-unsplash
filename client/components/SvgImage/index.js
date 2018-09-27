//@flow

//$FlowFixMe we should import Node as type but the eslint doesn't happy
import React, { Node } from 'react';
import styled from 'styled-components';
import { primaryColor1 } from '../../style/colors';

const SvgImg = styled.svg`
  display: inline-block;
  color: ${props => props.color};
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  user-select: 'none';
  ${props =>
    props.fillFromParent
      ? ``
      : `fill: ${props.hovered ? props.hoverColor : props.color};`};
`;

type Props = {
  children: Node,
  viewBox: string,
  size?: number,
  color?: string,
  fillFromParent?: boolean,
};

const SvgImage = ({
  children,
  viewBox,
  size,
  color,
  fillFromParent,
  ...others
}: Props) => (
  <SvgImg
    {...others}
    size={size}
    color={color}
    fillFromParent={fillFromParent}
    viewBox={viewBox}
  >
    {children}
  </SvgImg>
);

SvgImage.defaultProps = {
  size: 20,
  color: primaryColor1,
  fillFromParent: false,
};

export default SvgImage;

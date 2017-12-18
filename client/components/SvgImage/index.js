import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {primaryColor1} from '../../style/colors';

const SvgImg = styled.svg `
  display: inline-block;
  color: ${props => props.color};
  height: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  user-select: 'none';
  ${props => props.fillFromParent
  ? ``
  : `fill: ${props.hovered
    ? props.hoverColor
    : props.color};`}
`;

const SvgImage = ({
  className,
  children,
  viewBox,
  size,
  color,
  fillFromParent
}) => (
  <SvgImg
    className={className}
    size={size}
    color={color}
    fillFromParent={fillFromParent}
    viewBox={viewBox}
  >
    {children}
  </SvgImg>
);

SvgImage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  viewBox: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  fillFromParent: PropTypes.bool
};

SvgImage.defaultProps = {
  size: 20,
  color: primaryColor1,
  fillFromParent: false
};

export default SvgImage;
//@flow

//$FlowFixMe we should import Node as type but the eslint doesn't happy
import React, { Node } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  primaryColor1,
  secondaryColor1,
  white,
  borderInAvtiveColor,
  borderAvtiveColor,
} from '../../style/colors';

const Btn = styled.button`
  display: inline-block;
  margin-right: 8px;
  color: ${props => (props.primary ? white : secondaryColor1)};
  fill: ${props => (props.primary ? props.primaryColor : secondaryColor1)};
  background-color: ${props => (props.primary ? props.primaryColor : white)};
  height: 32px;
  padding: 0 11px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 29px;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  border-color: ${borderInAvtiveColor};
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
  text-align: center;
  user-select: none;
  text-decoration: none;
  ${props =>
    props.disabled
      ? `
    opacity: 0.6;
    cursor: not-allowed;
  `
      : ``} ${props =>
    props.primary
      ? ``
      : `
    &:hover,
    &:focus {
      color: ${props.primaryColor};
      fill: ${props.primaryColor};
      border-color: ${`${borderAvtiveColor} !important`};
    }
  `};
`;

type Props = {
  label?: string,
  onClick?: Function,
  children?: Node,
  disabled?: boolean,
  primary?: boolean,
  primaryColor?: string,
  type?: string,
  href?: string,
  target?: string,
};

const Button = ({
  disabled,
  label,
  children,
  primary,
  primaryColor,
  href,
  onClick,
  type,
  ...others
}: Props) => {
  const handleOnClick = e => {
    if (onClick) {
      onClick(e);
    }
  };
  const btn = () => (
    <Btn
      type={type}
      disabled={disabled}
      primary={primary}
      primaryColor={primaryColor}
      onClick={handleOnClick}
      {...others}>
      {children ? children : label}
    </Btn>
  );
  const main = () => {
    if (href) {
      return (
        <Link {...others} to={href}>
          {btn()}
        </Link>
      );
    }
    return btn();
  };
  return main();
};

Button.defaultProps = {
  primary: false,
  disabled: false,
  primaryColor: primaryColor1,
  type: 'button',
  label: '',
};

export default Button;

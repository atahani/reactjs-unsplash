//@flow

import React from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import {
  inputBgColor,
  textColor2,
  errorColor,
  warnColor,
  successColor,
} from '../../style/colors';

const Input = styled.input`
  background-color: ${inputBgColor};
  background-color: ${props =>
    props.msgColor ? lighten(0.27, props.msgColor) : inputBgColor};
  border: ${props =>
    props.msgColor
      ? `1px solid${darken(0.1, props.msgColor)}`
      : '1px solid transparent'};
  box-shadow: none;
  position: relative;
  padding: 12px;
  height: 36px;
  width: ${props => (props.fullWidth ? '100%' : '200px')};
  border-radius: ${props => (props.rounded ? '20px' : '3px')};
  box-sizing: border-box;
  font-family: inherit;
  font-size: 14px;
  font-weight: normal;
  outline: none;
  line-height: 16px;
  color: ${textColor2};
  ${props =>
    props.disabled
      ? `
    opacity: 0.6;
  `
      : ``} &:focus {
    border-color: ${darken(0.1, inputBgColor)};
    background-color: ${props =>
      props.msgColor
        ? lighten(0.27, props.msgColor)
        : lighten(0.07, inputBgColor)};
    -webkit-box-shadow: 0 0 0 1000px
      ${props =>
        props.msgColor
          ? lighten(0.27, props.msgColor)
          : lighten(0.07, inputBgColor)}
      inset !important;
  }
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px
      ${props =>
        props.msgColor ? lighten(0.27, props.msgColor) : inputBgColor}
      inset;
  }
`;

const AreaInput = styled.textarea`
  resize: none;
  background-color: ${props =>
    props.msgColor ? lighten(0.27, props.msgColor) : inputBgColor};
  width: ${props => (props.fullWidth ? '100%' : 'none')};
  border: ${props =>
    props.msgColor ? `1px solid${darken(0.1, props.msgColor)}` : '0px'};
  box-shadow: none;
  position: relative;
  border-radius: 3px;
  padding: ${props => (props.multiLanguage ? '10px 10px 24px 10px' : '10px')};
  box-sizing: border-box;
  font-family: IRANSans, Helvetica, Verdana, sans-serif;
  font-size: 14px;
  font-weight: normal;
  outline: none;
  color: ${textColor2};
  ${props =>
    props.disabled
      ? `
    opacity: 0.6;
  `
      : ``} &:focus {
    outline: ${`${darken(0.35, inputBgColor)} auto 1px !important`};
    background-color: ${props =>
      props.msgColor
        ? `${props.msgColor} !important`
        : `${lighten(0.07, inputBgColor)} !important`};
  }
`;

const Messgae = styled.p`
  color: ${props => props.color};
  font-size: 13px;
  padding: 6px 3px;
`;

const getColorOfMessage = msgType => {
  switch (msgType) {
    case 'error':
      return errorColor;
    case 'warn':
      return warnColor;
    case 'success':
      return successColor;
  }
};

type Props = {
  wrapperStyle?: Object,
  disabled?: boolean,
  fullWidth?: boolean,
  rounded?: boolean,
  hintText?: string,
  multiLine?: boolean,
  message?: ?string,
  messageType?: 'error' | 'warn' | 'success',
  messageColor?: string,
};

const TextInput = ({
  wrapperStyle,
  disabled,
  fullWidth,
  hintText,
  multiLine,
  message,
  messageType,
  messageColor,
  rounded,
  ...others
}: Props) => {
  const msgColor = messageColor ? messageColor : getColorOfMessage(messageType);
  const input = () => {
    if (multiLine) {
      return (
        <AreaInput
          {...others}
          disabled={disabled}
          placeholder={hintText}
          fullWidth={fullWidth}
          msgColor={message ? msgColor : void 0}
          {...others}
        />
      );
    }
    return (
      <Input
        {...others}
        type="text"
        disabled={disabled}
        placeholder={hintText}
        rounded={rounded}
        msgColor={message ? msgColor : void 0}
        fullWidth={fullWidth}
        {...others}
      />
    );
  };
  const msg = () => {
    if (message) {
      return <Messgae>{message}</Messgae>;
    }
  };
  return (
    <div style={wrapperStyle}>
      {input()}
      {msg()}
    </div>
  );
};

TextInput.defaultProps = {
  wrapperStyle: {},
  fullWidth: false,
  rounded: false,
  disabled: false,
  hintText: '',
  multiLine: false,
  message: null,
  messageType: 'error',
  messageColor: errorColor,
};

export default TextInput;

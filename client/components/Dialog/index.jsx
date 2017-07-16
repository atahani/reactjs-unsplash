import React, {Component} from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import {rgba} from 'polished';
import {media} from '../../style/util';
import {white} from '../../style/colors';

// the dialog background
const Overlay = styled.div `
  background-color: ${rgba(0, 0, 0, 0.6)};
  position: fixed;
  overflow: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: block;
  z-index: 900;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div `
  background-color: ${white};
  border-radius: 3px;
  box-shadow: 0 2px 6px 0 ${rgba(0, 0, 0, .44)};
  padding: 0;
  ${media.tablet `
      width: 100%;
      border-radius: 0px;
      box-shadow: none;
  `}
`;

/**
 * Inner Component to handle onRequestClose on overlay area
 * NOTE: can't stateless component since we use from react-onclickoutside
 */
class Inner extends Component {
  handleClickOutside() {
    this
      .props
      .onRequestClose();
  }

  render() {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    );
  }
}

Inner.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onRequestClose: PropTypes.func.isRequired
};

/**
 * wrap this with onClickOutSide
 * to handle when click out side of dialog
 * used in Dialog component
 */
const InnerDialog = onClickOutside(Inner);

// the main component
const Dialog = ({children, className, open, onRequestClose}) => {
  const main = () => {
    if (open) {
      return (
        <Overlay className={className}>
          <InnerDialog onRequestClose={onRequestClose}>
            {children}
          </InnerDialog>
        </Overlay>
      );
    }
    return false;
  };
  return main();
};

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  open: PropTypes.bool.isRequired,
  maxWidth: PropTypes.number,
  onRequestClose: PropTypes.func.isRequired,
  className: PropTypes.string
};

Dialog.defaultProps = {
  open: false,
  onRequestClose: () => {}
};

export default Dialog;
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {rgba} from 'polished';
import onClickOutside from 'react-onclickoutside';
import EventListener from 'react-event-listener';
import {white} from '../../style/colors';

const Wrapper = styled.div `
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  position: fixed;
  display: ${props => props.open
  ? 'block'
  : 'none'};
  width: ${props => `${props.width}px`};
  z-index: 900;
  padding: 15px;
  pointer-events: auto;
`;

const Inner = styled.div `
  background-color: ${white};
  overflow: hidden;
  border-radius: 3px;
  width: 100%;
  box-shadow: 0 1px 2px ${rgba(0, 0, 0, .25)}, 0 0 1px ${rgba(0, 0, 0, .35)};
`;

const Arrow = styled.div `
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
  clip: rect(0 18px 14px -4px);
  position: fixed;
  display: block;
  &:after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: #fff;
    transform: rotate(45deg) translate(6px,6px);
    box-shadow: -1px -1px 1px -1px ${rgba(0, 0, 0, .44)};
  }
`;

class Popover extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this
      .handleOpen
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.getTargetEvent = this
      .getTargetEvent
      .bind(this);
    this.setPlacement = this
      .setPlacement
      .bind(this);
    this.handleResizeOrScroll = this
      .handleResizeOrScroll
      .bind(this);
    this.state = {
      open: false,
      // it's for get BoundingClientRect on resize or scroll and calc and set elm
      target: void 0,
      // clone target element with custom events
      targetWithEvent: cloneElement(props.target, this.getTargetEvent(props.on)),
      top: 0,
      left: 0,
      arrowTop: 0,
      arrowLeft: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // check if target changed clone it with custom events
    if (nextProps.target !== this.props.target) {
      this.setState({
        targetWithEvent: cloneElement(nextProps.target, this.getTargetEvent(nextProps.on))
      });
    }
  }

  setPlacement(target) {
    if (!target) {
      return;
    }
    const {width, autoCloseWhenOffScreen, arrowSide} = this.props;
    const {bottom: elmBottom, width: elmWidth, left: elmLeft} = target.getBoundingClientRect();
    // calculate top & left
    let left = 0;
    switch (arrowSide) {
      case 'left':
        left = elmLeft + (elmWidth / 2) - 35;
        break;
      case 'right':
        left = elmLeft + (elmWidth / 2) - width + 35;
        break;
      default:
        left = elmLeft + (elmWidth / 2) - (width / 2);
        break;
    }
    const top = elmBottom;
    // calculate arrowTop & arrowLeft
    const arrowTop = elmBottom + 1;
    const arrowLeft = elmLeft + (elmWidth / 2) - 7;
    // if autoCloseWhenOffScreen is true check it and close it :)
    if (autoCloseWhenOffScreen && (arrowTop < 0 || arrowTop > window.innerHeight || arrowLeft < 0 || arrowLeft > window.innerWidth)) {
      this.handleClose('');
      return;
    }
    this.setState({
      target,
      top,
      left,
      arrowTop,
      arrowLeft,
      open: true
    });
  }

  // get target event base on event type
  getTargetEvent(on) {
    // check base on type of event
    switch (on) {
      case 'hover':
        return {
          onMouseEnter: e => this.handleOpen(e),
          onMouseLeave: e => this.handleClose(e)
        };
      case 'click':
        return {
          onClick: e => this.handleClick(e)
        };
      case 'focus':
        return {
          onFocus: e => this.handleOpen(e),
          onBlur: e => this.handleClose(e)
        };
    }
  }

  handleResizeOrScroll() {
    const {open, target} = this.state;
    // check is close return
    if (!open) {
      return;
    }
    this.setPlacement(target);
  }

  handleClickOutside(e) {
    this.handleClose(e);
  }

  handleOpen(e) {
    const target = e.target;
    if (this.props.onOpen) {
      this
        .props
        .onOpen(e);
    }
    this.setPlacement(target);
  }

  handleClose(e) {
    this.setState({open: false, elm: void 0, target: void 0});
    if (this.props.onClose) {
      this
        .props
        .onClose(e);
    }
  }

  handleClick(e) {
    if (this.state.open) {
      this.handleClose(e);
    } else {
      this.handleOpen(e);
    }
  }

  render() {
    const {className, width} = this.props;
    const {
      open,
      targetWithEvent,
      top,
      left,
      arrowTop,
      arrowLeft
    } = this.state;
    return (
      <div>
        <EventListener
          target="window"
          onScroll={this.handleResizeOrScroll}
          onResize={this.handleResizeOrScroll} 
        />
        <Wrapper className={className} open={open} top={top} left={left} width={width}>
          <Inner>
            {this.props.children}
          </Inner>
          <Arrow top={arrowTop} left={arrowLeft} />
        </Wrapper>
        {targetWithEvent}
      </div>
    );
  }
}

Popover.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  target: PropTypes.node.isRequired,
  width: PropTypes.number,
  on: PropTypes.oneOf(['hover', 'click', 'focus']),
  autoCloseWhenOffScreen: PropTypes.bool,
  arrowSide: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

Popover.defaultProps = {
  width: 60,
  on: 'click',
  arrowSide: 'center',
  autoCloseWhenOffScreen: false
};

// wrap it with onClickOutside for handle when user click outside of popover
export default onClickOutside(Popover);
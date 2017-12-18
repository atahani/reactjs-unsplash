import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {iconColor} from '../../style/colors';

const Svg = styled.svg `
  display: 'inline-block';
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

class SvgIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    this.handleMouseLeave = this
      .handleMouseLeave
      .bind(this);
    this.handleMouseEnter = this
      .handleMouseEnter
      .bind(this);
  }

  handleMouseLeave(e) {
    this.setState({hovered: false});
    this
      .props
      .onMouseLeave(e);
  }

  handleMouseEnter(e) {
    this.setState({hovered: true});
    this
      .props
      .onMouseEnter(e);
  }
  render() {
    const {
      className,
      size,
      color,
      hoverColor,
      viewBox,
      fillFromParent,
      children
    } = this.props;
    const {hovered} = this.state;
    return (
      <Svg
        className={className}
        size={size}
        fillFromParent={fillFromParent}
        color={color}
        hoverColor={hoverColor
        ? hoverColor
        : color}
        hovered={hovered}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        viewBox={viewBox}
      >
        {children}
      </Svg>
    );
  }
}

SvgIcon.propTypes = {
  children: PropTypes.node,
  size: PropTypes.number,
  fillFromParent: PropTypes.bool,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  viewBox: PropTypes.string,
  className: PropTypes.string
};

SvgIcon.defaultProps = {
  color: iconColor,
  size: 24,
  fillFromParent: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  /**
     * Allows you to redefine what the coordinates
     * without units mean inside an svg element. For example,
     * if the SVG element is 500 (width) by 200 (height), and you
     * pass viewBox="0 0 50 20", this means that the coordinates inside
     * the svg will go from the top left corner (0,0) to bottom right (50,20)
     * and each unit will be worth 10px.
     */
  viewBox: '0 0 24 24'
};

export default SvgIcon;

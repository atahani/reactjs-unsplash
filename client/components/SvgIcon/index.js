//@flow

//$FlowFixMe we should import Node as type but the eslint doesn't happy
import React, {Component,Node} from 'react';
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

type Props = {
  children: Node,
  size?: number,
  fillFromParent?: boolean,
  color?: string,
  hoverColor?: string,
  viewBox?: string,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
}

type State = {
  hovered: boolean,
}

class SvgIcon extends Component<Props,State> {
  static defaultProps = {
    color: iconColor,
    size: 24,
    fillFromParent: false,
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
  state = {
    hovered: false
  };

  handleMouseLeave = (e: Event) => {
    this.setState({hovered: false});
    if (this.props.onMouseLeave){
      this
        .props
        .onMouseLeave(e);
    }
  }

  handleMouseEnter = (e: Event) => {
    this.setState({hovered: true});
    if (this.props.onMouseEnter){
      this
        .props
        .onMouseEnter(e);
    }
  }
  render() {
    const {
      size,
      color,
      hoverColor,
      viewBox,
      fillFromParent,
      children,
      ...others
    } = this.props;
    const {hovered} = this.state;
    return (
      <Svg
        {...others}
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

export default SvgIcon;

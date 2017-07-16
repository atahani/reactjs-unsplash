import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {media} from '../../style/util';

const Wrapper = styled.div `
  position: relative;
  padding: 25px;
  width: 510px;
  ${media.tablet `
      width: 100%;
      height: 100%;
    `}
`;

class AddOrEditCollection extends Component {
  render() {
    return (
      <Wrapper>
        Add or Edit Collection
      </Wrapper>
    );
  }
}

AddOrEditCollection.propTypes = {};

export default AddOrEditCollection;
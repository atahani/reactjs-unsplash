import React from 'react';
import styled from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {media} from '../style/util';

const Div = styled.div `
  ${media.giant `
    width: 1170px;
  `}
  ${media.desktop `
    width: 992px;
  `}
  ${media.tablet `
    width: 768px;
  `}
  ${media.phone `
    width: 376px;
  `}
`;

describe('Test style Util', () => {
  describe('media function to generate CSS media query', () => {
    it('should generate the media query base on phone size', () => {
      const wrapper = renderer
        .create(<Div />)
        .toJSON();
      expect(wrapper).toMatchStyledComponentsSnapshot();
    });
  });
});
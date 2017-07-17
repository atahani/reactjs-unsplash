import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Button from '../../components/Button';
import {greenColor, white} from '../../style/colors';

describe('<Button />', () => {
  // http://facebook.github.io/jest/docs/en/snapshot-testing.html#content
  // https://github.com/styled-components/jest-styled-components snapshot testing
  it('render it', () => {
    const button = renderer
      .create(<Button />)
      .toJSON();
    expect(button).toMatchStyledComponentsSnapshot();
  });

  it('check primary color when in primary button type', () => {
    const button = renderer
      .create(<Button primary primaryColor={greenColor} />)
      .toJSON();
    expect(button).toHaveStyleRule('background-color', greenColor);
    expect(button).toHaveStyleRule('color', white);
  });
});

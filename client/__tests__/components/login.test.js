import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {Login} from '../../components/Login';

describe('<Login />', () => {
  it('render it', () => {
    const login = renderer
      .create(<Login />)
      .toJSON();
    expect(login).toMatchStyledComponentsSnapshot();
  });
});
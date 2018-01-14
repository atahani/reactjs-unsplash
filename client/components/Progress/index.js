//@flow

import React from 'react';
import {connect} from 'react-redux';
import styled, {keyframes} from 'styled-components';
import {primaryColor1} from '../../style/colors';
import {media} from '../../style/util';

const lpMover = keyframes `
  from {
    right: 100%;
  }
  to {
    right: 0%;
  }
`;

const Mover = styled.div `
  position: fixed;
  top: 0;
  right: 0;
  overflow: auto;
  background-color: ${primaryColor1};
  height: 4px;
  animation: ${lpMover} 2s cubic-bezier(0.07, 0.35, 0.98,-0.12) 0s infinite normal none running;
  z-index: 101;
  opacity: 1;
  ${media.giant `
    width: 390px;
  `}
  ${media.desktop `
    width: 330px;
  `}
  ${media.tablet `
    width: 256px;
  `}
  ${media.phone `
    width: 125px;
  `}
`;

type Props = {
  jobNumbers: number,
}

const Progress = ({jobNumbers}: Props) => {
  const progress = () => {
    if (jobNumbers > 0) {
      return <Mover />;
    }
  };
  return (
    <div>
      {progress()}
    </div>
  );
};

Progress.defaultProps = {
  jobNumbers: 0
};

const mapStateToProps = state => ({jobNumbers: state.app.jobRunning});

export default connect(
  mapStateToProps,
  (dispatch: Dispatch) => ({dispatch})
)(Progress);
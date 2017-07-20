import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled, {keyframes} from 'styled-components';
import {primaryColor1} from '../../style/colors';

const lpMover = keyframes `
  from {
    right: 100%;
  }
  to {
    right: 0%;
  }
`;

const Mover = styled.div `
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  overflow: auto;
  background-color: ${primaryColor1};
  height: 4px;
  animation: ${lpMover} 2s cubic-bezier(0.07, 0.35, 0.98,-0.12) 0s infinite normal none running;
  z-index: 101;
  opacity: 1;
`;

const Progress = ({jobNumbers}) => {
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

Progress.propTypes = {
  jobNumbers: PropTypes.number
};

Progress.defaultProps = {
  jobNumbers: 0
};

export default connect(state => ({jobNumbers: state.app.job_running}))(Progress);
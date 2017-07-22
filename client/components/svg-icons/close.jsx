import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

const CloseIcon = props => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <path
      d="M25.193 22.364l-2.828 2.828-15.556-15.556 2.828-2.828zM9.636 25.193l-2.828-2.828 15.556-15.556 2.828 2.828z" 
    />
  </SvgIcon>
);

CloseIcon.propTypes = {
  className: PropTypes.string
};

export default CloseIcon;
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

const DoneIcon = props => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <path
      d="M13.1 18.1l-5.6-5.6c-.6-.6-1.5-.6-2 0l-2.1 2.1c-.6.6-.6 1.5 0 2l8.7 8.7c.6.6 1.5.6 2 0l14.5-14.5c.6-.6.6-1.5 0-2l-2.1-2.1c-.6-.6-1.5-.6-2 0l-11.4 11.4z" 
    />
  </SvgIcon>
);

DoneIcon.propTypes = {
  className: PropTypes.string
};

export default DoneIcon;
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

const RemoveIcon = props => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <path
      d="M26.5 19c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-21c-.8 0-1.5.7-1.5 1.5v3c0 .8.7 1.5 1.5 1.5h21z" 
    />
  </SvgIcon>
);

RemoveIcon.propTypes = {
  className: PropTypes.string
};

export default RemoveIcon;
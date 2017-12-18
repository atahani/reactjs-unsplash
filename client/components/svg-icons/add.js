import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

const AddIcon = props => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <path d="M14 3h4v26h-4zM29 14v4h-26v-4z" />
  </SvgIcon>
);

AddIcon.propTypes = {
  className: PropTypes.string
};

export default AddIcon;
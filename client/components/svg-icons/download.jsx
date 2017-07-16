import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '../SvgIcon';

const DownloadIcon = props => (
  <SvgIcon viewBox="0 0 32 32" {...props}>
    <path
      d="M25.8 15.5l-7.8 7.2v-20.7h-4v20.7l-7.8-7.2-2.7 3 12.5 11.4 12.5-11.4z" 
    />
  </SvgIcon>
);

DownloadIcon.propTypes = {
  className: PropTypes.string
};

export default DownloadIcon;
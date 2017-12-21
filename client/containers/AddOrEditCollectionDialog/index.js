import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import Dialog from '../../components/Dialog';
import AddOrEditCollection from '../AddOrEditCollection';

const AddOrEditCollectionDialog = ({pathname, lastPathname, onPush}) => (
  <Dialog
    open={pathname === '/collections/new' || pathname.startsWith('/collections/edit/')}
    onRequestClose={() => onPush(lastPathname)}
  >
    <AddOrEditCollection onRequestClose={() => onPush(lastPathname)} />
  </Dialog>
);

AddOrEditCollectionDialog.propTypes = {
  pathname: PropTypes.string,
  lastPathname: PropTypes.string,
  onPush: PropTypes.func
};

export default connect(state => ({pathname: state.router.location.pathname, lastPathname: state.app.last_pathname}), dispatch => bindActionCreators({
  onPush: push
}, dispatch))(AddOrEditCollectionDialog);
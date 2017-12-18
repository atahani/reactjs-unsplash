import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import Dialog from '../Dialog';
import AddToCollection from '../AddToCollection';

const AddToCollectionDialog = ({searchPath, lastPathname, onPush}) => (
  <Dialog
    open={searchPath.startsWith('?add_to_collection&id=')}
    onRequestClose={() => onPush(lastPathname)}
  >
    <AddToCollection onRequestClose={() => onPush(lastPathname)} />
  </Dialog>
);

AddToCollectionDialog.propTypes = {
  searchPath: PropTypes.string,
  lastPathname: PropTypes.string,
  onPush: PropTypes.func
};

export default connect(state => ({searchPath: state.router.location.search, lastPathname: state.app.last_pathname}), dispatch => bindActionCreators({
  onPush: push
}, dispatch))(AddToCollectionDialog);
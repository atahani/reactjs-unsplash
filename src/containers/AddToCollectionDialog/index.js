//@flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dialog from '../../components/Dialog';
import AddToCollection from '../AddToCollection';

type Props = {
  searchPath: string,
  lastPathname: string,
  onPush: Function,
};

const AddToCollectionDialog = ({ searchPath, lastPathname, onPush }: Props) => (
  <Dialog
    open={searchPath.startsWith('?add_to_collection&id=')}
    onRequestClose={() => onPush(lastPathname)}>
    <AddToCollection onRequestClose={() => onPush(lastPathname)} />
  </Dialog>
);

const mapStateToProps = state => ({
  searchPath: state.router.location.search,
  lastPathname: state.app.lastPathname,
});

export default connect(
  mapStateToProps,
  {
    onPush: push,
  }
)(AddToCollectionDialog);

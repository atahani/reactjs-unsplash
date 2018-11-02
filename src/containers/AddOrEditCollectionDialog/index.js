//@flow

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Dialog from '../../components/Dialog';
import AddOrEditCollection from '../AddOrEditCollection';

type Props = {
  pathname: string,
  lastPathname: string,
  onPush: Function,
};

const AddOrEditCollectionDialog = ({
  pathname,
  lastPathname,
  onPush,
}: Props) => (
  <Dialog
    open={
      pathname === '/collections/new' ||
      pathname.startsWith('/collections/edit/')
    }
    onRequestClose={() => onPush(lastPathname)}>
    <AddOrEditCollection onRequestClose={() => onPush(lastPathname)} />
  </Dialog>
);

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  lastPathname: state.app.lastPathname,
});

export default connect(
  mapStateToProps,
  {
    onPush: push,
  }
)(AddOrEditCollectionDialog);

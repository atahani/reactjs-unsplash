//@flow

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Button from '../../components/Button';
import Collections from '../../components/Collections';
import AddOrEditCollectionDialog from '../AddOrEditCollectionDialog';
import { getUserCollections } from '../../actions/collection';
import { API_ROOT } from '../../constants/service-info';

const Title = styled.h2`
  font-size: 33px;
  font-weight: 500;
  text-align: center;
  padding: 20px 0px;
`;

const Action = styled.div`
  text-align: right;
  padding: 10px 2px;
  margin-bottom: 15px;
`;

type Props = {
  loggedInUserId: string,
  collections: Object,
  username: string,
  nextCollectionsLink: string,
  onGetUserCollections: Function,
};

class UserCollections extends Component<Props> {
  componentDidMount() {
    const { onGetUserCollections, username } = this.props;
    if (username && Object.keys(this.props.collections).length < 4) {
      onGetUserCollections(`${API_ROOT}/users/${username}/collections`);
    }
  }

  render() {
    const {
      collections,
      loggedInUserId,
      nextCollectionsLink,
      onGetUserCollections,
    } = this.props;
    return (
      <div>
        <Helmet>
          <title>Your Collections - unsplash clone</title>
        </Helmet>
        <Title>Your Collections</Title>
        <Action>
          <Button label="New Collection" primary href="/collections/new" />
        </Action>
        {collections ? (
          <Collections
            loggedInUserId={loggedInUserId}
            items={collections}
            onScrollToLoad={() =>
              nextCollectionsLink
                ? onGetUserCollections(nextCollectionsLink)
                : {}
            }
          />
        ) : null}
        <AddOrEditCollectionDialog />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUserId: state.user.userProfile.id,
  collections: state.items.userCollections,
  username: state.user.userProfile.username,
  nextCollectionsLink: state.items.userCollectionsAttr.next,
});

export default connect(
  mapStateToProps,
  dispatch =>
    bindActionCreators(
      {
        onGetUserCollections: getUserCollections,
      },
      dispatch
    )
)(UserCollections);

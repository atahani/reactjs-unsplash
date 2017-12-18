import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components';
import Button from '../Button';
import Collections from '../Collections';
import AddOrEditCollectionDialog from '../AddOrEditCollectionDialog';
import {getUserCollections} from '../../actions/collection';
import {clearItems} from '../../actions/items';
import {API_ROOT} from '../../constants/service-info';

const Title = styled.h2 `
  font-size: 33px;
  font-weight: 500;
  text-align: center;
  padding: 20px 0px;
`;

const Action = styled.div `
  text-align: right;
  padding: 10px 2px;
  margin-bottom: 15px;
`;

class UserCollections extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {onGetUserCollections, username} = this.props;
    if (username) {
      onGetUserCollections(`${API_ROOT}/users/${username}/collections`);
    }
  }

  render() {
    const {collections, loggedInUserId, nextCollectionsLink, onGetUserCollections} = this.props;
    return (
      <div>
        <Helmet>
          <title>Your Collections - unsplash clone</title>
        </Helmet>
        <Title>
          Your Collections
        </Title>
        <Action>
          <Button label="New Collection" primary href="/collections/new" />
        </Action>
        {collections
          ? <Collections
            loggedInUserId={loggedInUserId}
            items={collections}
            onScrollToLoad={() => nextCollectionsLink
              ? onGetUserCollections(nextCollectionsLink)
              : {}} 
          />
          : null}
        <AddOrEditCollectionDialog />
      </div>
    );
  }
}

UserCollections.propTypes = {
  loggedInUserId: PropTypes.string,
  collections: PropTypes.object,
  username: PropTypes.string,
  nextCollectionsLink: PropTypes.string,
  onGetUserCollections: PropTypes.func,
  onClearItems: PropTypes.func
};

export default connect(state => ({loggedInUserId: state.user.user_profile.id, collections: state.items.user_collections, username: state.user.user_profile.username, nextCollectionsLink: state.items.user_collections_attr.next}), dispatch => bindActionCreators({
  onGetUserCollections: getUserCollections,
  onClearItems: clearItems
}, dispatch))(UserCollections);
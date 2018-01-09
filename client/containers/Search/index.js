import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {lighten} from 'polished';
import AddToCollectionDialog from '../AddToCollectionDialog';
import CollectionsSView from '../../components/CollectionsSView';
import Photos from '../../components/Photos';
import Collections from '../../components/Collections';
import {searchInPhotos} from '../../actions/photo';
import {searchInCollections} from '../../actions/collection';
import {clearItems} from '../../actions/items';
import {API_ROOT} from '../../constants/service-info';
import {linkColor, activeLinkColor, primaryColor1} from '../../style/colors';
import { media } from '../../style/util';

const Header = styled.div `
  text-align: center;
`;

const Title = styled.h1 `
  font-size: 43px;
  font-weight: 600;
`;

const Links = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 420px;
  margin: 0 auto;
  height: 65px;
  font-size: 28px;
  ${media.tablet`
    display: none;
  `}
`;

const Nav = styled(NavLink).attrs({
  activeStyle: {
    color: primaryColor1,
    textDecoration: 'underline'
  }
})`
  color: ${lighten(0.1, linkColor)};
  &:hover {
    color: ${activeLinkColor};
  }
  ${props => props.active
  ? `
    text-decoration: underline;
    color: ${activeLinkColor};
  `
  : ``}
`;

const Results = styled.div `
  margin-top: 24px;
`;

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: void 0,
      title: void 0,
      type: void 0
    };
    this.handleSearch = this
      .handleSearch
      .bind(this);
  }

  componentDidMount() {
    const {query, type} = this.props.match.params;
    // clear items
    this.handleSearch(query, type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const {query, type} = nextProps.match.params;
      this.handleSearch(query, type);
    }
  }

  handleSearch(query, type) {
    if (this.state.query !== query || this.state.type !== type) {
      const {onClearItems, onSearchInPhotos, onSearchInCollections} = this.props;
      onClearItems('photos');
      onClearItems('collections');
      onSearchInPhotos(`${API_ROOT}/search/photos?page=1&query=${query.replace('-', ' ')}`);
      onSearchInCollections(`${API_ROOT}/search/collections?page=1&query=${query.replace('-', ' ')}`);
      // finaly set it into state
      this.setState({
        title: query
          ? (query.charAt(0).toUpperCase() + query.slice(1)).replace('-', ' ')
          : void 0,
        query,
        type
      });
    }
  }

  render() {
    const {
      collections,
      nextCollectionsLink,
      totalCollections,
      photos,
      nextPhotosLink,
      totalPhotos,
      onSearchInCollections,
      onSearchInPhotos
    } = this.props;
    const {query, title, type} = this.state;
    const header = () => {
      if (title) {
        const typeStr = type
          ? type
            .charAt(0)
            .toUpperCase() + type.slice(1)
          : '';
        return (
          <Header>
            <Title>{`${title} ${typeStr}`}</Title>
            <Links>
              <Nav to={`/search/${query}`}>All</Nav>
              <Nav to={`/search/photos/${query}`}>{`${totalPhotos} Photos`}</Nav>
              <Nav to={`/search/collections/${query}`}>{`${totalCollections} Collections`}</Nav>
            </Links>
          </Header>
        );
      }
    };
    return (
      <div>
        {header()}
        {!type && collections
          ? <CollectionsSView
            viewAllPath={`/search/collections/${query}`}
            items={collections} 
          />
          : null}
        <Results>
          {photos && type !== 'collections'
            ? <Photos
              items={photos}
              onScrollToLoad={() => nextPhotosLink
                ? onSearchInPhotos(nextPhotosLink)
                : {}} 
            />
            : null}
          {type === 'collections' && collections
            ? <Collections
              items={collections}
              onScrollToLoad={() => nextCollectionsLink
                ? onSearchInCollections(nextCollectionsLink)
                : {}} 
            />
            : null}
        </Results>
        <AddToCollectionDialog />
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.object,
  collections: PropTypes.object,
  nextCollectionsLink: PropTypes.string,
  totalCollections: PropTypes.number,
  photos: PropTypes.object,
  nextPhotosLink: PropTypes.string,
  totalPhotos: PropTypes.number,
  onClearItems: PropTypes.func,
  onSearchInPhotos: PropTypes.func,
  onSearchInCollections: PropTypes.func
};

Search.defaultProps = {
  totalPhotos: 0,
  totalCollections: 0
};

export default withRouter(connect(state => ({
  collections: state.items.collections,
  nextCollectionsLink: state.items.collectionsAttr.next,
  totalCollections: state.items.collectionsAttr.total,
  photos: state.items.photos,
  nextPhotosLink: state.items.photosAttr.next,
  totalPhotos: state.items.photosAttr.total
}), dispatch => bindActionCreators({
  onClearItems: clearItems,
  onSearchInPhotos: searchInPhotos,
  onSearchInCollections: searchInCollections
}, dispatch))(Search));
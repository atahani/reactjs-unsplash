//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { lighten } from 'polished';
import AddToCollectionDialog from '../AddToCollectionDialog';
import CollectionsSView from '../../components/CollectionsSView';
import Photos from '../../components/Photos';
import Collections from '../../components/Collections';
import { searchInPhotos } from '../../actions/photo';
import { searchInCollections } from '../../actions/collection';
import { clearItems } from '../../actions/items';
import { setSearchValues } from '../../actions/app';
import { API_ROOT } from '../../constants/service-info';
import { linkColor, activeLinkColor, primaryColor1 } from '../../style/colors';
import { media } from '../../style/util';

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 43px;
  font-weight: 600;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 420px;
  margin: 0 auto;
  height: 65px;
  font-size: 28px;
  ${media.tablet`
    display: none;
  `};
`;

const Nav = styled(NavLink).attrs({
  activeStyle: {
    color: primaryColor1,
    textDecoration: 'underline',
  },
})`
  color: ${lighten(0.1, linkColor)};
  &:hover {
    color: ${activeLinkColor};
  }
  ${props =>
    props.active
      ? `
    text-decoration: underline;
    color: ${activeLinkColor};
  `
      : ``};
`;

const Results = styled.div`
  margin-top: 24px;
`;

type Props = {
  query: string,
  title: string,
  match: Object,
  collections: Object,
  nextCollectionsLink: string,
  totalCollections: number,
  photos: Object,
  nextPhotosLink: string,
  totalPhotos: number,
  onClearItems: Function,
  onSearchInPhotos: Function,
  onSearchInCollections: Function,
  onSetSearchValues: Function,
};

class Search extends Component<Props> {
  static defaultProps = {
    totalPhotos: 0,
    totalCollections: 0,
  };

  componentDidMount() {
    const { query, type } = this.props.match.params;
    // clear items
    this.handleSearch(query, type);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const { query, type } = nextProps.match.params;
      this.handleSearch(query, type);
    }
  }

  componentWillUnmount() {
    this.props.onSetSearchValues();
  }

  handleSearch = (query, type) => {
    if (this.props.query !== query || this.props.match.params.type !== type) {
      const {
        onClearItems,
        onSearchInPhotos,
        onSearchInCollections,
        onSetSearchValues,
      } = this.props;
      onClearItems('photos');
      onClearItems('collections');
      onSearchInPhotos(
        `${API_ROOT}/search/photos?page=1&query=${query.replace('-', ' ')}`
      );
      onSearchInCollections(
        `${API_ROOT}/search/collections?page=1&query=${query.replace('-', ' ')}`
      );
      const title = (query.charAt(0).toUpperCase() + query.slice(1)).replace(
        '-',
        ' '
      );
      const value = query.replace('-', ' ');
      onSetSearchValues(query, title, value);
    }
  };

  render() {
    const {
      collections,
      nextCollectionsLink,
      totalCollections,
      photos,
      nextPhotosLink,
      totalPhotos,
      onSearchInCollections,
      onSearchInPhotos,
    } = this.props;
    const { query, title } = this.props;
    const { type } = this.props.match.params;
    const header = () => {
      if (query !== '') {
        const typeStr = type
          ? type.charAt(0).toUpperCase() + type.slice(1)
          : '';
        return (
          <Header>
            <Title>{`${title} ${typeStr}`}</Title>
            <Links>
              <Nav to={`/search/${query}`}>All</Nav>
              <Nav to={`/search/photos/${query}`}>
                {`${totalPhotos} Photos`}
              </Nav>
              <Nav to={`/search/collections/${query}`}>
                {`${totalCollections} Collections`}
              </Nav>
            </Links>
          </Header>
        );
      }
    };
    return (
      <div>
        {header()}
        {!type && collections && query !== '' ? (
          <CollectionsSView
            viewAllPath={`/search/collections/${query}`}
            items={collections}
          />
        ) : null}
        <Results>
          {photos && type !== 'collections' ? (
            <Photos
              items={photos}
              onScrollToLoad={() =>
                nextPhotosLink ? onSearchInPhotos(nextPhotosLink) : {}
              }
            />
          ) : null}
          {type === 'collections' && collections ? (
            <Collections
              items={collections}
              onScrollToLoad={() =>
                nextCollectionsLink
                  ? onSearchInCollections(nextCollectionsLink)
                  : {}
              }
            />
          ) : null}
        </Results>
        <AddToCollectionDialog />
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      query: state.app.searchValues.query,
      title: state.app.searchValues.title,
      collections: state.items.collections,
      nextCollectionsLink: state.items.collectionsAttr.next,
      totalCollections: state.items.collectionsAttr.total,
      photos: state.items.photos,
      nextPhotosLink: state.items.photosAttr.next,
      totalPhotos: state.items.photosAttr.total,
    }),
    dispatch =>
      bindActionCreators(
        {
          onClearItems: clearItems,
          onSearchInPhotos: searchInPhotos,
          onSearchInCollections: searchInCollections,
          onSetSearchValues: setSearchValues,
        },
        dispatch
      )
  )(Search)
);

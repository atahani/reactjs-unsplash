import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions';
import {Link} from 'react-router-dom';
import CollectSmall from '../CollectionSView';
import {dividerColor, secondaryColor1} from '../../style/colors';

const ItemsWrapper = styled.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 0px;
  border-bottom: 1px solid ${dividerColor};
`;

const ViewAll = styled(Link)`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${dividerColor};
  background-color: ${secondaryColor1};
  border-radius: 10px;
  color: white;
  font-size: 30px;
  font-weight: 700;
`;

const CollectionsSView = ({items, viewAllPath}) => {
  const item = (col, width) => (<CollectSmall
    key={col.id}
    id={col.id}
    width={width}
    height={width * 0.6}
    coverPhoto={col.cover_photo}
    title={col.title}
    isPrivate={col.private}
    totalPhotos={col.total_photos} 
  />);
  const collections = width => {
    let w = width;
    if (width > 940) {
      w = (width / 4) - 10;
    } else if (width >= 752) {
      w = (width / 3) - 20;
    } else {
      // for smaller width don't render any small view collections
      return null;
    }
    return (
      <ItemsWrapper>
        {Object
          .keys(items)
          .slice(0, 3)
          .map(id => item(items[id], w))}
        <ViewAll to={viewAllPath} width={w} height={w * 0.6}>
          View All
        </ViewAll>
      </ItemsWrapper>
    );
  };
  return (
    <ContainerDimensions>
      {({width}) => collections(width)}
    </ContainerDimensions>
  );
};

CollectionsSView.propTypes = {
  items: PropTypes.object,
  viewAllPath: PropTypes.string
};

CollectionsSView.defaultProps = {
  items: {}
};

export default CollectionsSView;
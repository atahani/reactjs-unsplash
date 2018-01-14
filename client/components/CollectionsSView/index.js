//@flow

import React from 'react';
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

type Props = {
  items: Object,
  viewAllPath: string,
}

const CollectionsSView = ({items, viewAllPath}: Props) => {
  const item = (col, width) => (<CollectSmall
    key={col.id ? col.id : ''}
    width={width}
    height={width * 0.6}
    collection={col}
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

CollectionsSView.defaultProps = {
  items: {}
};

export default CollectionsSView;
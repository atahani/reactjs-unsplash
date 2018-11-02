//@flow

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CollectSmall from '../CollectionSView';
import { screenLargerThan } from '../../style/util';
import { dividerColor, secondaryColor1 } from '../../style/colors';

const ItemsWrapper = styled.div`
  display: none;
  padding: 20px 0px;
  border-bottom: 1px solid ${dividerColor};
  ${screenLargerThan.phone`
    display: flex;
    flex-direction: column;
  `};
  ${screenLargerThan.tablet`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-basis: 25%;
  `};
`;

const ViewAllWrapper = styled.div`
  flex-basis: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${screenLargerThan.tablet`
    flex-basis: 25%;
  `};
`;

const ViewAll = styled(Link)`
  width: 100%;
  height: 74px;
  display: flex;
  justify-content: start;
  align-items: center;
  border: 1px solid ${dividerColor};
  background-color: ${secondaryColor1};
  border-radius: 10px;
  color: white;
  font-size: 24px;
  font-weight: 400;
  margin: 8px 0px;
  padding-left: 35px;
  ${screenLargerThan.tablet`
    height: 94px;
    justify-content: center;
    padding-left: 0px;
    margin: 0px 4px;
    font-size: 26px;
    font-weight: 600;
  `};
`;

type Props = {
  items: Object,
  viewAllPath: string,
};

const CollectionsSView = ({ items, viewAllPath }: Props) => (
  <ItemsWrapper>
    {Object.keys(items)
      .slice(0, 3)
      .map(key => (
        <CollectSmall key={items[key].id} collection={items[key]} />
      ))}
    <ViewAllWrapper>
      <ViewAll key="view-all" to={viewAllPath}>
        View All
      </ViewAll>
    </ViewAllWrapper>
  </ItemsWrapper>
);

export default CollectionsSView;

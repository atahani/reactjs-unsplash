//@flow

import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import EventListener from 'react-event-listener';
import styled from 'styled-components';
import type { Collection } from '../../types/data';
import CollectionView from '../Collection';

const ItemsWrapper = styled.div `
  width: 100%;
  height: 100%;
`;

type Props = {
  loggedInUserId?: ?string,
  items: Object,
  onScrollToLoad: Function
}

const Collections = ({loggedInUserId, items, onScrollToLoad}: Props) => {
  const handleResizeOrScroll = () => {
    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document.documentElement ? document.documentElement.offsetHeight : 0;
    const body = document.body;
    const html = document.documentElement;
    let docHeight: number = 0;
    // check values since we have error in flow
    if (body && body.scrollHeight && body.offsetHeight && html && html.clientHeight && html.scrollHeight && html.offsetHeight){
      docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };
  const item = (col: Collection, width: number, index: number, column: number) => {
    let mLeft: number = 0,
      mRight: number = 0;
    if (column === 3) {
      if (index % 3 === 0) {
        mRight = 10;
      } else if (index % 3 === 1) {
        mRight = 10;
        mLeft = 10;
      } else {
        mLeft = 10;
      }
    } else if (column === 2) {
      if (index % 2 === 0) {
        mRight = 10;
      } else {
        mLeft = 10;
      }
    } else {
      mLeft = 5;
      mRight = 5;
    }
    const key: string = col.id ? col.id : '';
    const editable: boolean = col.user && loggedInUserId === col.user.id ? true: false;
    return (<CollectionView
      key={key}
      marginLeft={mLeft}
      marginRight={mRight}
      width={width}
      height={width * 0.6}
      editable={editable}
      collection={col}
    />);
  };
  const collections = width => {
    let w = width;
    let c = 1;
    if (width > 940) {
      w = (width - 40) / 3;
      c = 3;
    } else if (width >= 752) {
      w = (width - 20) / 2;
      c = 2;
    }
    return (
      <ItemsWrapper width={width}>
        {Object
          .keys(items)
          .map((id, index) => item(items[id], w, index, c))}
      </ItemsWrapper>
    );
  };
  return (
    <div>
      <EventListener
        target="window"
        onScroll={handleResizeOrScroll()}
        onResize={handleResizeOrScroll()} 
      />
      <ContainerDimensions>
        {({width}) => collections(width)}
      </ContainerDimensions>
    </div>
  );
};

Collections.defaultProps = {
  loggedInUserId: null,
};

export default Collections;
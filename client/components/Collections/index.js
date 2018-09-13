//@flow

import React from 'react';
import EventListener from 'react-event-listener';
import styled from 'styled-components';
import CollectionView from '../Collection';

const ItemsWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0px auto;
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
      : document && document.documentElement ? document.documentElement.offsetHeight : 0;
    const body = document.body;
    const html = document.documentElement;
    let docHeight = 0;
    if (html && body && body.scrollHeight && body.offsetHeigh && html.offsetHeight && html.scrollHeight){
      docHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };
  const collections = () => (
    <ItemsWrapper>
      {Object
          .keys(items)
          .map((key, index) => 
            (<CollectionView
              key={items[key].id ? items[key].id : index}
              editable={items[key].user && loggedInUserId === items[key].user.id ? true: false}
              collection={items[key]}
            />))}
    </ItemsWrapper>
    );
  return (
    <div>
      <EventListener
        target="window"
        onScroll={handleResizeOrScroll()}
        onResize={handleResizeOrScroll()} 
      />
      {collections()}
    </div>
  );
};

Collections.defaultProps = {
  loggedInUserId: null,
};

export default Collections;
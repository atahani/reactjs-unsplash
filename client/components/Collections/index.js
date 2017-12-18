import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import EventListener from 'react-event-listener';
import styled from 'styled-components';
import Collection from '../Collection';

const ItemsWrapper = styled.div `
  width: 100%;
  height: 100%;
`;

const Collections = ({loggedInUserId, items, onScrollToLoad}) => {
  const handleResizeOrScroll = () => {
    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };
  const item = (col, width, index, column) => {
    let mLeft,
      mRight = 0;
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
    return (<Collection
      key={col.id}
      id={col.id}
      width={width}
      height={width * 0.6}
      coverPhoto={col.cover_photo}
      color={col.color}
      byUser={col.user}
      title={col.title}
      totalPhotos={col.total_photos}
      isPrivate={col.private}
      editable={loggedInUserId === col.user.id}
      marginLeft={mLeft}
      marginRight={mRight} 
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
        onScroll={e => handleResizeOrScroll(e)}
        onResize={e => handleResizeOrScroll(e)} 
      />
      <ContainerDimensions>
        {({width}) => collections(width)}
      </ContainerDimensions>
    </div>
  );
};

Collections.propTypes = {
  loggedInUserId: PropTypes.string,
  items: PropTypes.object,
  onScrollToLoad: PropTypes.func
};

Collections.defaultProps = {
  items: []
};

export default Collections;
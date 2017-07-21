import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions';
import EventListener from 'react-event-listener';
import Photo from '../Photo';

const PhotosWrapper = styled.div `
  height: 100%;
`;

const Column = styled.div `
  margin: 0px 5px;
  float: left;
  width: ${props => props.width};
`;

const Photos = ({className, items, onScrollToLoad}) => {
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
  const item = (img, width, cWidth) => (<Photo
    key={img.id}
    id={img.id}
    urls={img.urls}
    links={img.links}
    likes={img.likes}
    likeByUser={img.liked_by_user}
    color={img.color}
    imgHeight={img.height}
    imgWidth={img.width}
    byUser={img.user}
    width={width}
    isRow={cWidth < 752}
    belongsToCollections={img.current_user_collections} 
  />);
  const photoColumn = (list, width, cWidth) => list.map(id => item(items[id], width, cWidth));
  const photos = width => {
    const list = Object.keys(items);
    if (width > 940) {
      const w = (width / 3) - 10;
      return (
        <PhotosWrapper>
          <Column width={w}>
            {photoColumn(list.filter((_, index) => index % 3 === 0), w, width)}
          </Column>
          <Column width={w}>
            {photoColumn(list.filter((_, index) => index % 3 === 1), w, width)}
          </Column>
          <Column width={w}>
            {photoColumn(list.filter((_, index) => index % 3 === 2), w, width)}
          </Column>
        </PhotosWrapper>
      );
    } else if (width >= 752) {
      const w = (width / 2) - 20;
      return (
        <PhotosWrapper>
          <Column width={w}>
            {photoColumn(list.filter((x, index) => index % 2 === 0), w, width)}
          </Column>
          <Column width={w}>
            {photoColumn(list.filter((x, index) => index % 2 === 1), w, width)}
          </Column>
        </PhotosWrapper>
      );
    } else {
      return (
        <PhotosWrapper>
          {photoColumn(list, width, width)}
        </PhotosWrapper>
      );
    }
  };
  return (
    <div className={className}>
      <EventListener
        target="window"
        onScroll={e => handleResizeOrScroll(e)}
        onResize={e => handleResizeOrScroll(e)} 
      />
      <ContainerDimensions>
        {({width}) => photos(width)}
      </ContainerDimensions>
    </div>
  );
};

Photos.propTypes = {
  className: PropTypes.string,
  items: PropTypes.object,
  onScrollToLoad: PropTypes.func
};

Photos.defaultProps = {
  items: []
};

export default Photos;
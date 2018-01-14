//@flow

import React from 'react';
import styled from 'styled-components';
import ContainerDimensions from 'react-container-dimensions';
import EventListener from 'react-event-listener';
import PhotoComponent from '../Photo';
import type { Photo } from '../../types/data'; 

const PhotosWrapper = styled.div `
  height: 100%;
`;

const Column = styled.div `
  margin: 0px 5px;
  float: left;
  width: ${props => props.width};
`;


type Props = {
  items: Object,
  onScrollToLoad: Function,
}

const Photos = ({items, onScrollToLoad,...others}: Props) => {
  const handleResizeOrScroll = () => {
    const windowHeight = "innerHeight" in window
      ? window.innerHeight
      : document && document.documentElement ? document.documentElement.offsetHeight : 0;
    const body = document.body;
    const html = document.documentElement;
    let docHeight = 0;
    if (html && body && body.scrollHeight && body.offsetHeigh && html.offsetHeight && html.scrollHeight){
      docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };
  const item = (img: Photo, width, cWidth) => (<PhotoComponent
    key={img.id}
    photo={img}
    width={width}
    isRow={cWidth < 752}
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
    <div {...others}>
      <EventListener
        target="window"
        onScroll={handleResizeOrScroll}
        onResize={handleResizeOrScroll} 
      />
      <ContainerDimensions>
        {({width}) => photos(width)}
      </ContainerDimensions>
    </div>
  );
};


Photos.defaultProps = {
  items: []
};

export default Photos;
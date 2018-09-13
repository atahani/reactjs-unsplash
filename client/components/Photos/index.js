//@flow

import React from 'react';
import EventListener from 'react-event-listener';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import PhotoComponent from '../Photo';

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
      docHeight = Math.max(body.scrollHeight, body.offsetHeight, 
                          html.clientHeight, html.scrollHeight, html.offsetHeight);
    }
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      onScrollToLoad();
    }
  };
  return (
    <div {...others}>
      <EventListener
        target="window"
        onScroll={handleResizeOrScroll}
        onResize={handleResizeOrScroll} 
      />
      <ResponsiveMasonry columnsCountBreakPoints={{'350': 1, '750': 2, '900': 3}}>
        <Masonry>
          {Object.keys(items).map(key => 
            (<PhotoComponent
              key={items[key].id}
              photo={items[key]}
            />))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Photos;
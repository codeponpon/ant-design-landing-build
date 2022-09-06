import React from 'react';
import Footer from './footer';

const Display = (props) => {
  return (
    <>
      <iframe
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          zIndex: 99,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: 'none',
          overflow: 'scroll !important',
          paddingBottom: '0px !important',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          overflowY: 'scroll !important',
        }}
        scrolling="yes"
        src={props.gameUrl}
        title="game"
        allow="fullscreen"
        onLoad={props.reload}
        allowFullScreen={true}
      />
      <Footer {...props} />
    </>
  );
};

export default Display;

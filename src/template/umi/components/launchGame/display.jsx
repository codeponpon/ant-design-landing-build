import React from 'react';
import styled from 'styled-components';
import Footer from './footer';

const IframeStyled = styled.iframe`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: none;
  overflow: scroll !important;
  padding-bottom: 0px !important;
  background-color: rgba(0, 0, 0, 1);
  overflow-y: scroll !important;
  -webkit-overflow-scrolling: touch !important;
`;

const Display = (props) => {
  return (
    <>
      <IframeStyled
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

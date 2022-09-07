import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';

const WrapLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ItemLoading = styled.div`
  margin-top: 25%;
  text-align: center;
`;

const Loading = () => {
  return (
    <WrapLoading>
      <ItemLoading className="text-light">
        <Spinner animation="border" role="status"></Spinner>
      </ItemLoading>
    </WrapLoading>
  );
};

export default Loading;

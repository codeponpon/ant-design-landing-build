import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

export const PromotionCard = styled(Card)`
  background: transparent;
  padding-bottom: 3rem;
  border: 0px;
  scrollbar-width: thin;
  height: 80vh;
`;

export const Button = styled.div`
  cursor: pointer;
  width: 100%;
`;

export const AccordionHeader = styled.div`
  background-color: #ffff;
  h2 {
    color: #78797d;
    font-size: 0.95rem;
    padding: 0.5rem;
    margin-bottom: 0;
  }
`;

export const AccordionTextTitle = styled.div`
  display: flex;
  border-color: #c1c1c2;
  border-style: solid;
  border-radius: 10px;
  margin-top: 0.25rem;
  h2 {
    flex: 1;
  }
  .ic-more {
    flex: 1;
    margin-top: 5px;
    background: url(/images/drop-down.png?q=80) no-repeat;
    background-size: 20px 20px;
    text-align: right;
    max-width: 30px;
    padding-top: 0.25rem;
  }
`;

export const AccordionBody = styled.div`
  background-color: #ffff;
  border-color: #c1c1c2;
  border-style: solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  div {
    font-size: 0.9rem;
    color: #ed4d67;
    padding: 0.5rem;
  }
`;

export const BtnAccept = styled.button`
  background: linear-gradient(
    40deg,
    #da5969 0%,
    #f16172 30%,
    #f46374 70%,
    #fb7c8b 100%
  );
  border-radius: 8px;
  color: #fff;
  border: 0;
  padding: 0.5rem;

  &:disabled {
    color: #eee;
  }
`;
export const ComingSoon = styled.div`
  position: absolute;
  background-color: #f46374;
  width: 100%;
  height: 100%;
  span {
    font-size: 1.25rem;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PromotionNotFound = styled.div`
  text-align: center;
  font-size: 1.25rem;
  color: #ed4d67;
  margin-top: 1rem;
`;

import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';

export const TurnOverCard = styled(Card)`
  background: transparent;
  margin-bottom: 3rem;
  scrollbar-width: thin;
  border: none;
`;

export const TurnOverDisplay = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const Remark = styled.p`
  color: #FE2905;
  font-size: 0.75rem;
  margin-bottom: 5px;
}
`;

export const TurnOverProgressBar = styled(ProgressBar)`
  background-color: #d6dadf80;
  .progress-bar {
    background-color: #ec8091 !important;
  }
`;

export const TextWaiting = styled.p`
  color: #110101;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

import React from 'react';
import {
  TurnOverCard,
  TurnOverDisplay,
  Remark,
  TurnOverProgressBar,
  TextWaiting,
} from './TurnoverStyled';
import {
  AccordionHeader,
  AccordionTextTitle,
  AccordionBody,
} from '../Promotion/PromotionStyled';
import Image from 'react-bootstrap/Image';
import format from '../../libs/format';

const TurnOver = (props) => {
  const data = props?.data?.promotionRedeemPending;
  const goalTurnOver = data?.goalTurnOver || 0;
  const userTurnOver = data?.userTurnOver || 0;
  const currentTurnOver = data?.currentTurnover || 0;

  const num1 = userTurnOver - currentTurnOver;
  const num2 = goalTurnOver - currentTurnOver;

  return (
    <TurnOverCard>
      <TurnOverDisplay className="text-center mb-1">
        {format.balance(num1)}/{format.balance(num2)}
      </TurnOverDisplay>
      <div className="mb-2">
        <TurnOverProgressBar
          now={parseFloat(format.balance(num1))}
          max={parseFloat(format.balance(num2))}
        ></TurnOverProgressBar>
      </div>
      <Remark>*กรุณาทำยอด turnover ตามยอดที่กำหนดก่อนถอนยอด turnover</Remark>
      <TextWaiting className="text-center">
        กรุณารอยอด turnover อัพเดทสักครู่
      </TextWaiting>
      {data?.promotion?.bannerUrl && (
        <Image
          className="img-fluid"
          src={data?.promotion?.bannerUrl}
          width="100%"
          height="auto"
        />
      )}
      <AccordionHeader>
        <AccordionTextTitle>
          <h2>{data?.promotion?.title}</h2>
        </AccordionTextTitle>
      </AccordionHeader>
      <AccordionBody>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.promotion?.description,
          }}
        ></div>
      </AccordionBody>
    </TurnOverCard>
  );
};

export default TurnOver;

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useQuery } from '@apollo/client';
import { PromotionLists } from '../../gql/getPromotionLists';
import { PromotionCard, PromotionNotFound } from './PromotionStyled';
import PromotionData from './PromotionData';

const Promotion = (props) => {
  const { loading, error, data } = useQuery(PromotionLists);

  if (loading)
    return (
      <div className="wrap-loading">
        <Spinner animation="border" />
      </div>
    );

  if (error) {
    return <PromotionNotFound>ยังไม่มีโปรโมชั่นในขณะนี้ค่ะ</PromotionNotFound>;
  }

  return (
    <>
      <PromotionCard>
        {data &&
          (data.promotions.length <= 0 ? (
            <PromotionNotFound>ยังไม่มีโปรโมชั่นในขณะนี้ค่ะ</PromotionNotFound>
          ) : (
            <PromotionData {...props} data={data} />
          ))}
      </PromotionCard>
    </>
  );
};

export default Promotion;

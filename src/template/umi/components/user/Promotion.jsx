import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Row, Col } from 'antd';
import { useLazyQuery, gql } from '@apollo/client';

import Promotion from '../Promotion/index';
import TurnOver from '../Turnover/index';

const CHECK_PROMOTION = gql`
  query {
    promotionRedeemPending {
      promotionId
      promotion {
        title
        description
        bannerUrl
      }
      currentTurnover
      userTurnOver
      goalTurnOver
      redeemStatus
    }
  }
`;

const Account = () => {
  const props = {
    visibleStatus: false,
    dataSend: '',
    load: false,
    onSetApproved: (e) => {},
    onHide: () => {},
  };
  const [isTurnOver, setIsTurnOver] = useState(false);
  const [dataPro, setDataPro] = useState(false);
  const [getPromotion, { data, loading, error }] = useLazyQuery(
    CHECK_PROMOTION,
    {
      onError: ({ graphQLErrors }) => {
        console.error(graphQLErrors);
        setDataPro(true);
        setIsTurnOver(false);
      },
      onCompleted: (promotion) => {
        setDataPro(promotion);

        const goalTurnOver = data?.promotionRedeemPending?.goalTurnOver || 0;
        const userTurnOver = data?.promotionRedeemPending?.userTurnOver || 0;
        const currentTurnOver =
          data?.promotionRedeemPending?.currentTurnover || 0;

        const num1 = userTurnOver - currentTurnOver;
        const num2 = goalTurnOver - currentTurnOver;
        num1 < num2 ? setIsTurnOver(true) : setIsTurnOver(false);
      },
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    getPromotion();
  }, []);

  return (
    <>
      <Row className="w-100">
        <Col className="pt-2 bg-userIcon d-inline-flex">
          <h5 className="text-white d-inline-block">โปรโมชั่น</h5>
          <h6>ข้อเสนอเด็ด ๆ มากมายสำหรับคุณ</h6>
        </Col>
      </Row>
      {error && !dataPro && (
        <div className="text-center">เกิดข้อผิดพลาดในการแสดงข้อมูล</div>
      )}
      {loading && (
        <div className="wrap-loading text-center">
          <Spinner animation="border" />
        </div>
      )}
      {dataPro ? (
        isTurnOver ? (
          <TurnOver data={dataPro} {...props} />
        ) : (
          <Promotion {...props} />
        )
      ) : (
        ''
      )}
    </>
  );
};

export default Account;

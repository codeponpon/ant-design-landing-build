import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/th';
import {
  Button,
  AccordionHeader,
  AccordionTextTitle,
  AccordionBody,
  BtnAccept,
  ComingSoon,
} from './PromotionStyled';
import useAuth from '../../libs/useAuth';

const TimeToNumber = (value, symbol) => {
  const regex = new RegExp(symbol, 'g');
  return parseInt(value.replace(regex, ''), 10);
};

const CREATE_ONE_PROMOTION_REDEEM = gql`
  mutation OncreateOnePromotionRedeem($promotionId: Int) {
    createOnePromotionRedeem(data: { promotionId: $promotionId }) {
      promotion {
        id
        title
      }
    }
  }
`;

const PromotionData = (props) => {
  const { data: user, loading } = useAuth();
  const [disable, setDisable] = useState(false);
  const [chooseLoading, setChooseLoading] = useState(false);
  const [selectPromotion] = useMutation(CREATE_ONE_PROMOTION_REDEEM, {
    onError: ({ graphQLErrors }) => {
      Swal.fire({
        title: 'เตือน!',
        text: graphQLErrors[0]?.message.replace('Error:', '').trim(),
        icon: 'warning',
        confirmButtonText: 'ปิด',
      });
    },
  });

  const currentDate = moment().unix();
  const currentTime = moment().format('HH:mm');

  const handlePromotionAccept = async (el) => {
    setDisable(true);
    setChooseLoading(true);
    if (user) {
      if (el.id) {
        try {
          const res = await selectPromotion({
            variables: {
              promotionId: el.id,
            },
          });
          setDisable(false);
          setChooseLoading(false);
          if (res.data.createOnePromotionRedeem.promotion.id) {
            props.onHide();
            props.depositModalShow();
          }
        } catch (e) {
          console.log('error ', e);
        }
      } else {
        setDisable(false);
        setChooseLoading(false);
        Swal.fire({
          title: 'เตือน!',
          text: 'ไม่มีโปรโมชั่นที่เลือกหรือไม่อยู่ในเงื่อนไขการรับโปรโมชั่นนี้',
          icon: 'warning',
          confirmButtonText: 'ปิด',
        });
      }
    } else {
      props.onHide();
      props.loginModalShow();
    }
  };

  return props.data.promotions.map((el, index) => (
    <Accordion className="mb-3" key={index}>
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>
          <AccordionHeader
            as={Button}
            variant="link"
            eventKey={index.toString()}
          >
            <div className="position-relative">
              {el.promotionStartDate &&
                currentDate <= moment(el.promotionStartDate).unix() && (
                  <ComingSoon>
                    <span>เร็วๆนี้</span>
                  </ComingSoon>
                )}
              {el.bannerUrl && (
                <img
                  className="img-fluid"
                  src={el.bannerUrl}
                  width="100%"
                  height="auto"
                  alt="ZEAGAME"
                />
              )}
            </div>
            <AccordionTextTitle>
              <h2>{el.title}</h2>
              <div className="ic-more"></div>
            </AccordionTextTitle>
          </AccordionHeader>
        </Accordion.Header>
        <Accordion.Body>
          <div dangerouslySetInnerHTML={{ __html: el.description }}></div>
          {el.promotionType === 'DEPOSIT' &&
          (el.promotionStartDate
            ? currentDate >= moment(el.promotionStartDate).unix()
            : true) ? (
            (
              el.timeStart && el.timeEnd
                ? TimeToNumber(currentTime, ':') >=
                    TimeToNumber(
                      moment(el.timeStart, 'HH:mm')
                        .add(7, 'hours')
                        .format('HH:mm'),
                      ':',
                    ) &&
                  TimeToNumber(currentTime, ':') <=
                    TimeToNumber(
                      moment(el.timeEnd, 'HH:mm')
                        .add(7, 'hours')
                        .format('HH:mm'),
                      ':',
                    )
                : true
            ) ? (
              <BtnAccept
                disabled={disable}
                onClick={() => {
                  handlePromotionAccept(el);
                }}
              >
                {chooseLoading ? 'กำลังดำเนินการ...' : 'เข้าร่วมโปรโมชั่น'}
              </BtnAccept>
            ) : (
              <BtnAccept disabled={true}>
                ยังไม่อยู่ในช่วงเวลารับโปรโมชั่น
              </BtnAccept>
            )
          ) : (
            ''
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  ));
};

export default PromotionData;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderPlus,
  faFolderMinus,
  faSpinner,
  faTimesCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import format from '../../libs/format';

const ListStatement = (props) => {
  let statusStatement = {
    status: '',
    remark: '',
    icon: faSpinner,
    spin: true,
    bgColor: '',
    txtColor: '',
  };
  switch (props.status) {
    case 'APPROVED':
      statusStatement = {
        status: 'สำเร็จ',
        remark: '',
        icon: faCheckCircle,
        spin: false,
        bgColor: 'green',
        txtColor: 'white',
      };
      break;
    case 'PENDING':
      statusStatement = {
        status: 'รอดำเนินการ',
        remark: '',
        icon: faSpinner,
        spin: true,
        bgColor: '#05a4b9',
        txtColor: 'black',
      };
      break;
    case 'CANCELLED':
      statusStatement = {
        status: 'ยกเลิก',
        remark: props.remark ?? props.remark,
        icon: faTimesCircle,
        spin: false,
        bgColor: 'red',
        txtColor: 'white',
      };
      break;
    case 'REJECTED':
      statusStatement = {
        status: 'ยกเลิก',
        remark: props.remark ?? props.remark,
        icon: faTimesCircle,
        spin: false,
        bgColor: 'red',
        txtColor: 'white',
      };
      break;
  }

  return (
    <Container
      className="list-statement"
      style={{
        borderColor: '#8d8d8d',
        borderStyle: 'solid',
        borderRadius: '15px',
      }}
    >
      <Row>
        <Col
          xs={7}
          className="col-img align-items-center pl-1 pr-0"
          style={{ borderTopLeftRadius: '15px' }}
        >
          <img src={props?.data?.bankAccount?.bank?.logoUrl} />
          <span className="py-2 pl-2 pr-0">
            <span>
              {props?.data?.bankAccount?.bank?.code === 'TMB'
                ? 'TTB'
                : props?.data?.bankAccount?.bank?.code}
            </span>{' '}
            <br />
            <span>
              {props?.data?.bankAccount?.bank?.name === 'ธนาคารทหารไทย'
                ? 'ทหารไทยธนชาต'
                : props?.data?.bankAccount?.bank?.name.replace('ธนาคาร', '')}
            </span>
          </span>
        </Col>
        <Col
          xs={5}
          className="text-center py-2 px-0"
          style={{
            background: statusStatement.bgColor,
            color: statusStatement.txtColor,
            fontSize: '14px',
            borderTopRightRadius: '15px',
          }}
        >
          <span>สถานะ</span> <br />
          <span>
            <FontAwesomeIcon
              icon={statusStatement.icon}
              spin={statusStatement.spin}
            />{' '}
            {statusStatement.status}
            <br />
            {statusStatement.remark}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="text-center text-md-left my-1">
          <span>
            {props.type === 'DepositRequest' ? (
              <>
                <Badge>
                  <FontAwesomeIcon icon={faFolderPlus} /> ฝาก
                </Badge>
              </>
            ) : (
              <>
                <Badge propTypes="danger">
                  <FontAwesomeIcon icon={faFolderMinus} /> ถอน
                </Badge>
              </>
            )}

            {props?.data?.amount > 0 ? (
              <> ฿{format.balance(props?.data?.amount)}</>
            ) : (
              <></>
            )}
          </span>
        </Col>
        <Col xs={12} md={6} className="text-center text-md-right my-1">
          <span>
            {new Date(
              props.type === 'DepositRequest'
                ? props?.data?.transferedAt ?? props?.data?.createdAt
                : props?.data?.createdAt,
            ).toLocaleTimeString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) + ' น.'}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className="align-self-center">
          ชื่อบัญชี : {props?.data?.bankAccount?.name}
        </Col>
        <Col xs={12} md={4} className="align-self-center">
          เลขที่บัญชี : {props?.data?.bankAccount?.number}
        </Col>
        <Col xs={12} md={4} className="text-md-center align-self-center">
          {statusStatement.status}
        </Col>
      </Row>
    </Container>
  );
};

export default ListStatement;

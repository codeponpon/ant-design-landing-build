import React from 'react';
import { Row, Col } from 'antd';
import useAuth from '../../libs/useAuth';

const Account = () => {
  const { data: user, loading } = useAuth();
  return (
    <>
      <Row>
        <Col xs={6} className="topic">
          ยูสเกมส์
        </Col>
        <Col className="data">
          <span>{!loading ? user?.userMe?.user.username : ''}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="topic">
          เบอร์โทรศัพท์
        </Col>
        <Col className="data">
          <span>{!loading ? user?.userMe?.user.contact.mobile : ''}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="topic">
          ชื่อ-นามสกุล
        </Col>
        <Col className="data">
          <span>
            {!loading
              ? user?.userMe?.user.firstName + ' ' + user?.userMe?.user.lastName
              : ''}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="topic">
          ธนาคาร
        </Col>
        <Col className="data">
          <span>
            {user?.userMe?.user.bankAccounts[0].bank.name === 'ธนาคารทหารไทย'
              ? 'ธนาคารทหารไทยธนชาต'
              : !loading
              ? user?.userMe?.user.bankAccounts[0].bank.name
              : ''}
          </span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="topic">
          เลขที่บัญชี
        </Col>
        <Col className="data">
          <span>
            {!loading ? user?.userMe?.user.bankAccounts[0].number : ''}
          </span>
        </Col>
      </Row>
    </>
  );
};

export default Account;

import React, { useState } from 'react';
import { Button, Space, Card, Skeleton, Row, Col, Drawer } from 'antd';
import {
  KeyOutlined,
  LoadingOutlined,
  ReloadOutlined,
  WalletTwoTone,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import { isBrowser } from 'umi';
import { setClearToken } from '../libs/authToken';
import waitTime from '../libs/waitTime';
import Account from './user/Account';
import Promotion from './user/Promotion';
import Statement from './Statement/index';

const { Meta } = Card;

const { location = {} } = isBrowser() ? window : {};

export const AccountComp = (props) => {
  const { user, balance, loadingWallet, CheckBalance, isMobile } = props;
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [moneyReportVisible, setMoneyReportVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [promotionVisible, setPromotionVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const signOut = async () => {
    setLogoutLoading(true);
    setClearToken();
    localStorage.clear();
    await waitTime(1000);
    location?.reload();
    setLogoutLoading(false);
  };

  return (
    <div className="account-component">
      <div className="ant-pro-form-login-top">
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>
          {loadingWallet ? <LoadingOutlined /> : balance} ฿
        </h1>
        <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Space>
            จำนวนเครดิต{' '}
            <Link href="#" onClick={() => CheckBalance()}>
              {' '}
              <Button
                type="primary"
                shape="circle"
                icon={<ReloadOutlined />}
                size={'lg'}
                loading={loadingWallet}
              />{' '}
            </Link>
          </Space>
        </h2>
      </div>
      <Row justify="center" gutter={16}>
        <Col className="gutter-row" span={9}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
            cover={<WalletTwoTone style={{ fontSize: '100px' }} />}
            onClick={() => setMoneyReportVisible(true)}
            bodyStyle={{ padding: 0 }}
          >
            <Skeleton loading={false} active>
              <Meta
                title="รายงานการเงิน"
                className="p-2 justify-content-center"
              />
            </Skeleton>
          </Card>
          <Drawer
            title="รายงานการเงิน"
            width={isMobile ? '100%' : '800px'}
            onClose={() => setMoneyReportVisible(false)}
            visible={moneyReportVisible}
          >
            <Statement {...props} />
          </Drawer>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
            cover={<WalletTwoTone style={{ fontSize: '100px' }} />}
            onClick={() => setAccountVisible(true)}
            bodyStyle={{ padding: 0 }}
          >
            <Skeleton loading={false} active>
              <Meta title="บัญชี" className="p-2 justify-content-center" />
            </Skeleton>
          </Card>
          <Drawer
            title="ข้อมูลบัญชี"
            width={isMobile ? '100%' : '400px'}
            onClose={() => setAccountVisible(false)}
            visible={accountVisible}
          >
            <Account />
          </Drawer>
        </Col>
      </Row>
      <Row justify="center" gutter={16}>
        <Col className="gutter-row" span={8}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
            cover={<WalletTwoTone style={{ fontSize: '100px' }} />}
            onClick={() => setPromotionVisible(true)}
            bodyStyle={{ padding: 0 }}
          >
            <Skeleton loading={false} active>
              <Meta title="โปรโมชั่น" className="p-2 justify-content-center" />
            </Skeleton>
          </Card>
          <Drawer
            title="โปรโมชั่น"
            width={isMobile ? '100%' : '400px'}
            onClose={() => setPromotionVisible(false)}
            visible={promotionVisible}
          >
            <Promotion />
          </Drawer>
        </Col>
        <Col className="gutter-row" span={8}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
            cover={<WalletTwoTone style={{ fontSize: '100px' }} />}
            onClick={() => {
              window.open('https://line.me/R/ti/p/%40637suupz', '_blank');
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Skeleton loading={false} active>
              <Meta title="ติดต่อเรา" className="p-2 justify-content-center" />
            </Skeleton>
          </Card>
        </Col>
      </Row>
      <Row justify="center" gutter={16}>
        <Col className="gutter-row" span={9}>
          <Card
            hoverable
            style={{ width: '100%', marginBottom: '20px' }}
            cover={
              <Button
                style={{
                  width: '95px',
                  height: '95px',
                  margin: '5px auto',
                }}
                shape="circle"
                icon={<KeyOutlined style={{ fontSize: '65px' }} />}
              />
            }
            onClick={() => setChangePasswordVisible(true)}
            bodyStyle={{ padding: 0 }}
          >
            <Skeleton loading={false} active>
              <Meta
                title="เปลี่ยนรหัสผ่าน"
                className="p-2 justify-content-center"
              />
            </Skeleton>
          </Card>
          <Drawer
            title="เปลี่ยนรหัสผ่าน"
            width={isMobile ? '100%' : '400px'}
            onClose={() => setChangePasswordVisible(false)}
            visible={changePasswordVisible}
          ></Drawer>
        </Col>
      </Row>
      <Button
        type="primary"
        className="ant-btn-lg"
        onClick={() => signOut()}
        loading={logoutLoading}
        icon={<LogoutOutlined />}
        block
      >
        ออกจากระบบ
      </Button>
    </div>
  );
};

import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import { setClearToken } from '../libs/authToken';
import waitTime from '../libs/waitTime';

export const AccountComp = (props) => {
  const { user, balance, loadingWallet, CheckBalance } = props;
  const [logoutLoading, setLogoutLoading] = useState(false);
  const signOut = async () => {
    setLogoutLoading(true);
    setClearToken();
    localStorage.clear();
    await waitTime(1000);
    window.location.reload();
    setLogoutLoading(false);
  };

  return (
    <>
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
      <Button
        type="primary"
        className="ant-btn-lg"
        block
        onClick={() => signOut()}
        loading={logoutLoading}
      >
        ออกจากระบบ
      </Button>
    </>
  );
};

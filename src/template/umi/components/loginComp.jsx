import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, message, Space, Drawer, Input, Button } from 'antd';
import {
  LockOutlined,
  MobileOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import { setToken, setUserMe, checkTokenExpire } from '../libs/authToken';
import RegisterComp from './registerComp';
import { SIGN_IN } from '../gql/signIn';

const LoginComp = (props) => {
  const { isMobile, registerHistory = false } = props;
  const [signIn] = useMutation(SIGN_IN);
  const [loading, setLoading] = useState(false);
  const [registerChildrenDrawer, setRegisterChildrenDrawer] = useState(false);

  const onFinish = async (values) => {
    const { mobile, password } = values;
    console.log(values);

    setLoading(true);

    try {
      const res = await signIn({
        variables: {
          data: {
            username: mobile.replace(/\s/g, ''),
            password: password.replace(/\s/g, ''),
            typeAuth: 'userFront',
          },
        },
      });

      if (res.data.signIn.__typename === 'SignInOutputSuccess') {
        setUserMe(res.data.signIn.user.username);
        const chkExpire = checkTokenExpire(res.data.signIn.token);
        if (chkExpire) {
          setToken(res.data.signIn.token);
          window.location.reload();
        }
      } else {
        message.warning(res.data.signIn.messages);
      }
    } catch (e) {
      console.log(e);
      message.error('เกิดข้อผิดพลาด! กรุณาทำรายใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form initialValues={{ remember: true }} onFinish={onFinish}>
      <div className="ant-pro-form-login-top">
        <div className="ant-pro-form-login-header">
          <span className="ant-pro-form-login-title">เข้าสู่ระบบ</span>
        </div>
        <div className="ant-pro-form-login-desc"></div>
      </div>
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: 'กรุณากรอกเบอร์โทรศัพท์!',
          },
        ]}
        style={{ marginBottom: '24px' }}
      >
        <Input
          size="large"
          prefix={<MobileOutlined className="prefixIcon" />}
          placeholder="เบอร์โทรศัพท์"
        />
      </Form.Item>
      <Form.Item
        name="password"
        style={{ marginBottom: '24px' }}
        rules={[
          {
            required: true,
            message: 'กรุณากรอกรหัสผ่าน!',
          },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="prefixIcon" />}
          placeholder="รหัสผ่าน"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          size="large"
          block
        >
          {loading ? <LoadingOutlined /> : 'เข้าสู่ระบบ'}
        </Button>{' '}
        {!registerHistory && (
          <Space style={{ marginTop: '20px' }}>
            ยังไม่ได้เป็นสมาชิก?{' '}
            <Link onClick={() => setRegisterChildrenDrawer(true)}>
              สมัครสมาชิก
            </Link>
            <Drawer
              title="สมัครสมาชิก"
              width={isMobile ? '100%' : '400px'}
              onClose={() => setRegisterChildrenDrawer(false)}
              visible={registerChildrenDrawer}
            >
              <RegisterComp loginHistory={true} />
            </Drawer>
          </Space>
        )}
      </Form.Item>
    </Form>
  );
};

export default LoginComp;

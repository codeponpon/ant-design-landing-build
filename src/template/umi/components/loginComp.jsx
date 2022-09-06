import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, message, Space, Drawer, Input, Button } from 'antd';
import {
  LockOutlined,
  MobileOutlined,
  LoadingOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import { setToken, setUserMe, checkTokenExpire } from '../libs/authToken';
import RegisterComp from './registerComp';
import { signIn } from '../gql/signIn';
import { isBrowser } from 'umi';
import { graphUrl } from '../apollo';

const { location = {} } = isBrowser() ? window : {};

const LoginComp = (props) => {
  const { isMobile, registerHistory = false, ...attrs } = props;
  const [loading, setLoading] = useState(false);
  const [registerChildrenDrawer, setRegisterChildrenDrawer] = useState(false);

  const onFinish = async (values) => {
    const { mobile, password } = values;

    setLoading(true);

    try {
      const res = await signIn(
        {
          variables: {
            data: {
              username: mobile.replace(/\s/g, ''),
              password: password.replace(/\s/g, ''),
              typeAuth: 'userFront',
            },
          },
        },
        graphUrl
      );
      console.log('res', res);
      if (res?.data && res.data.signIn.__typename === 'SignInOutputSuccess') {
        setUserMe(res.data.signIn.user.username);
        const chkExpire = checkTokenExpire(res.data.signIn.token);
        if (chkExpire) {
          setToken(res.data.signIn.token);
          // location?.href = '/home';
          location?.reload();
        }
      } else {
        const msg = res?.data
          ? res.data.signIn.messages
          : 'There is something went wrong for sign in';
        message.warning(msg);
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
      <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>เข้าสู่ระบบ</h1>
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
          icon={<LoginOutlined />}
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
              {...attrs}
            >
              <RegisterComp loginHistory />
            </Drawer>
          </Space>
        )}
      </Form.Item>
    </Form>
  );
};

export default LoginComp;

import React, { useState } from 'react';
import { Button, message, Space, Drawer, Input } from 'antd';
import ProForm from '@ant-design/pro-form';
import {
  LockOutlined,
  PlusOutlined,
  UserOutlined,
  MobileOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import LoginComp from './loginComp';
import { BankSelector } from './bankSelector';

const RegisterComp = (props) => {
  const { isMobile, loginHistory = false, ...attrs } = props;
  const [loginChildrenDrawer, setLoginChildrenDrawer] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    message.success('Register Successful!');
  };

  return (
    <div
      style={{
        margin: 24,
      }}
    >
      <ProForm
        title="Register"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            สมัครสมาชิก
          </Button>
        }
        submitter={{
          // Configure the button text
          searchConfig: {
            submitText: 'สมัครสมาชิก',
            resetText: 'ล้างข้อมูล',
          },
          // Configure the properties of the button
          resetButtonProps: {
            className: 'ant-btn-lg',
            style: { marginLeft: '40px' },
          },
          submitButtonProps: {
            className: 'ant-btn-lg',
            style: {},
          },
        }}
        onFinish={onFinish}
      >
        <div className="ant-pro-form-login-top">
          <div className="ant-pro-form-login-header">
            <span className="ant-pro-form-login-title">สมัครสมาชิก</span>
          </div>
          <div className="ant-pro-form-login-desc"></div>
        </div>
        <Input
          name="mobile"
          key="mobile"
          size="large"
          prefix={<MobileOutlined className={'prefixIcon'} />}
          placeholder="เบอร์โทรศัพท์"
          style={{ marginBottom: '24px' }}
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเบอร์โทรศัพท์!',
            },
          ]}
        />

        <Input.Password
          name="password"
          key="password"
          size="large"
          prefix={<LockOutlined className="prefixIcon" />}
          placeholder="รหัสผ่าน"
          style={{ marginBottom: '24px' }}
          rules={[
            {
              required: true,
              message: 'กรุณากรอกรหัสผ่าน!',
            },
          ]}
        />
        <Input.Password
          name="password_confirmation"
          key="password_confirmation"
          size="large"
          prefix={<LockOutlined className="prefixIcon" />}
          placeholder="กรอกรหัสผ่านเดิมอีกครั้ง"
          style={{ marginBottom: '24px' }}
          rules={[
            {
              required: true,
              message: 'กรุณากรอกยืนยันรหัสผ่าน!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('รหัสผ่านไม่เหมือนกัน'));
              },
            }),
          ]}
        />
        <BankSelector />
        <Input.Group>
          <Input
            width="md"
            name="backAccount"
            key="backAccount"
            placeholder="เลขบัญชีธนาคาร"
            size="large"
            prefix={<CreditCardOutlined className="prefixIcon" />}
            style={{ marginBottom: '24px' }}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกเลขบัญชีธนาคาร!',
              },
            ]}
          />
          <Input
            width="md"
            name="firstName"
            key="firstName"
            placeholder="ชื่อ"
            size="large"
            prefix={<UserOutlined className="prefixIcon" />}
            style={{ marginBottom: '24px' }}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกชื่อ!',
              },
            ]}
          />
          <Input
            width="md"
            name="lastName"
            key="lastName"
            placeholder="นามสกุล"
            size="large"
            prefix={<UserOutlined className="prefixIcon" />}
            style={{ marginBottom: '24px' }}
            rules={[
              {
                required: true,
                message: 'กรุณากรอกนามสกุล!',
              },
            ]}
          />
        </Input.Group>
      </ProForm>{' '}
      {!loginHistory && (
        <Space style={{ marginTop: '30px' }}>
          เป็นสมาชิกอยู่แล้ว?{' '}
          <Link onClick={() => setLoginChildrenDrawer(true)}>เข้าสู่ระบบ</Link>
          <Drawer
            title="เข้าสู่ระบบ"
            width={isMobile ? '100%' : '400px'}
            onClose={() => setLoginChildrenDrawer(false)}
            visible={loginChildrenDrawer}
            {...attrs}
          >
            <LoginComp registerHistory />
          </Drawer>
        </Space>
      )}
    </div>
  );
};

export default RegisterComp;

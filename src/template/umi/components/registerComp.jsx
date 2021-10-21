import React, { useState, useEffect } from 'react';
import { Form, Button, message, Space, Drawer, Input } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  CreditCardOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Link } from 'rc-scroll-anim';
import { useMutation } from '@apollo/client';
import generateUsername from '../libs/generateUsername';
import LoginComp from './loginComp';
import { BankSelector } from './bankSelector';
import { ADD_CONTACT } from '../gql/addContact';
import { ADD_TRACKING } from '../gql/addTracking';
import { ADD_USER } from '../gql/addUser';
import { getTracking } from '../libs/tracking';
import { getAffiliateId } from '../libs/authToken';

const RegisterComp = (props) => {
  const { isMobile, loginHistory = false, ...attrs } = props;
  const [loading, setLoading] = useState(false);
  const [loginChildrenDrawer, setLoginChildrenDrawer] = useState(false);
  const [addContact] = useMutation(ADD_CONTACT);
  const [addUser] = useMutation(ADD_USER);
  const [addTracking] = useMutation(ADD_TRACKING);
  const [usernameGenerate] = useState(generateUsername());
  const [afid, setAfid] = useState(afid || getAffiliateId());
  const [bankAccount, setBankAccount] = useState('');

  const onFinish = async (values) => {
    const { mobile, password, bankAccountNo, firstName, lastName } = values;

    try {
      setLoading(true);
      const res = await addContact({
        variables: { data: { mobile } },
      });

      if (res.data.createOneContact.__typename === 'ContactOutputError') {
        message.error(res.data.createOneContact.messages);
        setLoading(false);
        return;
      } else {
        try {
          const affiliateRef =
            afid !== undefined ? { connect: { id: Number(afid) } } : {};
          const user = await addUser({
            variables: {
              data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                username: usernameGenerate.replace(/\s/g, ''),
                password: password.replace(/\s/g, ''),
                contact: {
                  connect: {
                    id: res.data.createOneContact.contact.id,
                  },
                },
                bankAccounts: {
                  create: {
                    name: firstName.trim() + ' ' + lastName.trim(),
                    number: bankAccountNo,
                    bank: {
                      connect: {
                        code: bankAccount,
                      },
                    },
                  },
                },
                affiliateRef,
              },
            },
          });
          if (
            user.data.createOneUser.__typename === 'CreateUserOutputSuccess'
          ) {
            try {
              if (user?.data?.createOneUser?.user?.username) {
                const trackingStorage = getTracking();
                const trackingData = {
                  fullurl: trackingStorage,
                  userId: user?.data?.createOneUser?.user?.id,
                };

                await addTracking({ variables: { data: trackingData } });

                setLoginChildrenDrawer(true);
                message.success('สมัครสมาชิกสำเร็จ!');
                setLoading(false);
              } else {
                setLoading(false);
                console.error(e);
              }
            } catch (error) {
              setLoading(false);
              console.error(e);
            }
          } else {
            setLoading(false);
            message.error(user.data.createOneUser.messages);
          }
        } catch (e) {
          setLoading(false);
          console.error(e);
        }
      }
    } catch (err) {
      setLoading(false);
      message.error(err);
      return;
    }
  };

  return (
    <div
      style={{
        margin: 24,
      }}
    >
      <Form onFinish={onFinish}>
        <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>
          สมัครสมาชิก
        </h1>
        <Form.Item
          name="mobile"
          key="mobile"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเบอร์โทรศัพท์!',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MobileOutlined className={'prefixIcon'} />}
            placeholder="เบอร์โทรศัพท์"
          />
        </Form.Item>
        <Form.Item
          name="password"
          key="password"
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

        <Form.Item
          name="password_confirmation"
          key="password_confirmation"
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
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined className="prefixIcon" />}
            placeholder="กรอกรหัสผ่านเดิมอีกครั้ง"
          />
        </Form.Item>
        <BankSelector bankAccount={bankAccount} setBank={setBankAccount} />
        <Form.Item
          width="md"
          name="bankAccountNo"
          key="bankAccountNo"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกเลขบัญชีธนาคาร!',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="เลขบัญชีธนาคาร"
            prefix={<CreditCardOutlined className="prefixIcon" />}
          />
        </Form.Item>
        <Form.Item
          width="md"
          name="firstName"
          key="firstName"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อ!',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="ชื่อ"
            prefix={<UserOutlined className="prefixIcon" />}
          />
        </Form.Item>
        <Form.Item
          width="md"
          name="lastName"
          key="lastName"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกนามสกุล!',
            },
          ]}
        >
          <Input
            size="large"
            placeholder="นามสกุล"
            prefix={<UserOutlined className="prefixIcon" />}
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
            {loading ? <LoadingOutlined /> : 'สมัครสมาชิก'}
          </Button>{' '}
          {!loginHistory && (
            <Space style={{ marginTop: '30px' }}>
              เป็นสมาชิกอยู่แล้ว?{' '}
              <Link onClick={() => setLoginChildrenDrawer(true)}>
                เข้าสู่ระบบ
              </Link>
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterComp;

import React from 'react';
import { Redirect } from 'umi';
import { getToken } from '../libs/authToken';

const Auth = (props) => {
  const isLogin = getToken();
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/" />;
  }
};

export default Auth;

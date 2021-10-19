import nextCookie from 'next-cookies';
import jsCookie from 'js-cookie';
import moment from 'moment-timezone';

export const tokenKey = 'minions-token';
export const userMeData = 'userMe';
export const affiliateId = 'affiliate-id';
export const PixcelCode = 'pixcel-code';

export function checkTokenExpire(token) {
  const tokentConv = parseJwt(token);
  const currentTime = moment().format('X');
  const expireTime = tokentConv.exp;

  if (currentTime < expireTime) {
    return true;
  }
  return false;
}

export function setClearToken() {
  jsCookie.remove(tokenKey);
  jsCookie.remove(userMeData);
}

export function setToken(token) {
  return jsCookie.set(tokenKey, token);
}

export function setUserMe(userMe) {
  return jsCookie.set(userMeData, userMe);
}

export function setAffiliateId(token) {
  return jsCookie.set(affiliateId, token);
}

export function setPixcelCode(code) {
  return jsCookie.set(PixcelCode, code);
}

export function getAffiliateId(ctx = null) {
  if (process.browser || !ctx) {
    return jsCookie.get(affiliateId);
  } else {
    return nextCookie(ctx)[affiliateId];
  }
}
export function getPixcelCode(ctx = null) {
  if (process.browser || !ctx) {
    return jsCookie.get(PixcelCode);
  } else {
    return nextCookie(ctx)[PixcelCode];
  }
}
export function getToken(ctx = null) {
  if (process.browser || !ctx) {
    return jsCookie.get(tokenKey);
  } else {
    return nextCookie(ctx)[tokenKey];
  }
}

export function getUserMe(ctx = null) {
  console.log(jsCookie.get(userMeData));

  if (process.browser || !ctx) {
    return jsCookie.get(userMeData);
  } else {
    return nextCookie(ctx)[userMeData];
  }
}

export function removeToken() {
  return jsCookie.remove(tokenKey);
}

export function removeUserMe() {
  return jsCookie.remove(userMeData);
}

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const unixTime = () => {
  var ts = new Date();
  return ts.toDateString();
};

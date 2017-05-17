// https://github.com/github/fetch
// https://travis-ci.org/matthew-andrews/isomorphic-fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';
import qs from 'qs';

const errorMessages = res => `${res.status} ${res.statusText}`;

function check404(res) {
  if (res.status === 404) {
    return Promise.reject(errorMessages(res));
  }
  return res;
}

function jsonParse(res) {
  return res.json().then(jsonResult => ({ ...res, jsonResult }));
}

function errorMessageParse(res) {
  const {
    success,
    successful,
    msg
  } = res.jsonResult;
  if (!success && !successful) {
    // Message.error( msg);
    return Promise.reject(msg || '系统发生错误，未返回错误信息。');
  }
  return res;
}

function xFetch(url2, options) {
  const opts = {
    ...options,
    mode: 'cors',
    "Content-Type": "application/json"
  };

  function check401(res) {
    // location.href = '/401';
    if (res.status === 401) {
      console.log("认证错误！！")
    }
    return res;
  }

  return fetch(url2, opts)
    .then(check401)
    .then(check404)
    .then(jsonParse)
    .then(errorMessageParse)
    .catch((e) => {
      // fetch失败，多数为登录超时302跳转跨站异常，故此错误当登录超时处理
      // chrome错误：Network request failed
      // Safari错误：Network request failed
      return Promise.reject(`${e}`);
    });
}

export const get = (url, params) => {
  return xFetch(`${url}?${qs.stringify(params)}`);
};

export const post = (url, params) => {
  return xFetch(url, {
    method: 'POST',
    body: qs.stringify(params)
  });
};

export default xFetch;

import qs from 'qs';
import { home } from '../api';

export default {
  namespace: 'login',
  state: {
    userMsg: {
      id: null,
      user: null,
      location: null
    },
    data: []
  },
  effects: {
    * saveUser({ payload: { id, user } }, { call, put }) {
      yield put({
        type: 'user',
        payload: {
          id,
          user
        }
      });
    },
    * queryUser({ payload: { name, password, zhuce } }, { call, put }) {
      const { jsonResult } = yield call(home.user, { name, password });
      const data = jsonResult.data;
      if (typeof zhuce === 'function') {
        zhuce(data.id, data.user);
      }
      yield put({
        type: 'loginSuccess',
        payload: {
          data: jsonResult.data
        }
      });
    }
  },
  reducers: {
    user(state, {
      payload
    }) {
      return {
        ...state,
        userMsg: {
          ...state.data,
          ...payload
        }
      };
    },
    loginSuccess(state, {
      payload
    }) {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload
        }
      };
    }
  }
};

import qs from 'qs';
import fetch from 'isomorphic-fetch';
import xFetch, { get, post } from '../util/xFetch';
import { home } from '../api';

const requestData = (url) => {
  const opts = {
    mode: 'cors',
    "Content-Type": "application/json"
  };
  fetch(url, opts).then(response => response.json())
    .then(data => data)
    .catch(e => console.log('链接错误'))
};

export default {
  namespace: 'home',
  state: {
    list: {
      items: [],
      total: null,
      page: null,
      size: 10,
      key: null
    }
  },
  reducers: {
    queryListSuccess(state, {
      payload
    }) {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload
        }
      };
    }
  },
  effects: {
    * queryList({ payload: { params } }, { call, put }) {
      //console.log(home.query(), "asdasd");
      const { jsonResult } = yield call(home.query, { params });
    //  const { jsonResult } = yield call(get('/km-service/testEchartsObject.json'));
      yield put({
        type: 'queryListSuccess',
        payload: {
          data: jsonResult.data,
          message: jsonResult.message,
          title: jsonResult.title
        }
      });
    },
    * reload(action, { put, select }) {
      const data = yield select(state => state.data);
      yield put({
        type: 'fetch',
        payload: {
          data
        }
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/home') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  }
};

import qs from 'qs';
import { home } from '../api';


export default {
  namespace: 'home',
  state: {
    data: []
  },
  reducers: {
    queryListSuccess(state, {
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

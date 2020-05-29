import { queryCurrent, query as queryUsers } from '@/services/user';
import {getStudent, getTeacher} from '@/api/api'
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {

  * getStudent( {payload}, {call}) {
    const rst = yield call(getStudent, payload)
    return rst.data.data;
  },

  * getTeacher( {payload}, {call}) {
    const rst = yield call(getTeacher, payload)
    return rst.data.data;
  },
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;

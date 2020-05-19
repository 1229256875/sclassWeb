import {getCourseByUser, selectCourse, getHistoryCourse, unsubscribe, getGrade, setGrade} from '../api/api';
import {getAuthority} from '@/utils/authority';

const module = {

  namespace: 'courseList',
  state: {
    data: [],
    hisData: [],
    role: true,
  },

  effects: {
    * getDataInfo(action, {call, put}) {
      const rst = yield call(getCourseByUser);
      const {data} = rst;
      yield put({
        type: 'changeCourseListInfo',
        payload: data,
      });
    },

    * selectCourse(action, {call, put}) {
      const rst = yield call(selectCourse, action.payload)
      return rst;
    },

    * getHistoryCourse(action, {call, put}) {
      const rst = yield call(getHistoryCourse, 2);
      yield put({
        type: 'changeCourseListInfo',
        payload: rst.data,
      })
      const rst1 = yield call(getHistoryCourse, 0);
      yield put({
        type: 'changeHistoryCourseListInfo',
        payload: rst1.data,
      })
    },

    * unsubscribe(action, {call, put}) {
      const rst = yield call(unsubscribe);
      if (rst.status === 200 && rst.data.status === 200) {
        yield put({
          type: 'changeHistoryCourseListInfo',
          payload: [],
        })
      }
      return rst;
    },

    * getGrade(action, {call, put}) {
      const rst = yield  call(getGrade, action.payload)
      return rst;
    },

    * setGrade(action, {call, put}) {
      const rst = yield call(setGrade, action.payload)
      return rst.data;
    }
  },


  reducers: {
    changeCourseListInfo(state, {payload}) {
      const role = getAuthority();
      const rst = role.includes('teacher') ? true : false;
      return {
        ...state,
        data: payload.data,
        role: rst,
      };
    },

    changeHistoryCourseListInfo(state, {payload}) {
      return {
        ...state,
        disData: payload.data,
      };
    },
  },
};
export default module;

import {addCourse, getHistCouAdmin} from "@/api/api";

const module = {
  namespace: 'course',

  state: {
    historyCourseData: [],
  },


  effects: {
    * addCourse(action, {call}) {
      // debugger
      const rst = yield call(addCourse, action.payload);
      console.log(rst)
      return rst;
    },


    * getHistCouAdmin(action, {call, put}) {
      const rst = yield call(getHistCouAdmin, action.payload);
      console.log(rst);
      if (rst.status === 200 && rst.data.status === 200) {
        yield put({
          type: 'changeCourseListInfo',
          payload: rst.data,
        })
      }
    },
  },


  reducers: {
    changeCourseListInfo(state, {payload}) {
      return {
        ...state,
        historyCourseData: payload.data,
      }
    }
  }
};

export default module;

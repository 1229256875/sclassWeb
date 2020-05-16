import {getTime} from "@/api/api";

const module = {
  namespace: 'time',

  state: {
    timeList: {},
  },


  effects: {
    * getTime(action, {call}) {
      // debugger
      const rst = yield call(getTime);
      return rst;
    },

  },


  reducers: {
    changeTimeListInfo(state, {payload}) {
      return {
        ...state,
        historyCourseData: payload.data,
      }
    }
  }
};

export default module;

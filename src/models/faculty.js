import {getFacultyAll, insertFaculty, updateFaculty, deleteFaculty, getFacultyInfo} from "@/api/api";
import {act} from "react-dom/test-utils";

const module = {
  namespace: 'faculty',

  state: {
    status: false,
  },


  effects: {
    * getFacultyAll(action, {call}) {
      // debugger
      const rst = yield call(getFacultyAll, action.payload);
      return rst.data.data;
    },

    * insertFaculty(action, {call}) {
      const rst = yield call(insertFaculty, action.payload);
      return rst;
    },

    * updateFaculty(action, {call}) {
      const rst = yield call(updateFaculty, action.payload);
      return rst;
    },

    * deleteFaculty(action, {call}) {
      const rst = yield call(deleteFaculty, action.payload);
      return rst;
    },

    * getFacultyInfo(action, {call}) {
      const rst = yield call(getFacultyInfo, action.payload);
      return rst.data;
    },


    * getHistCouAdmin(action, {call, put}) {
      const rst = yield call(getFacultyAll, action.payload);
      if (rst.status === 200 && rst.data.status === 200) {
        yield put({
          type: 'changeCourseListInfo',
          payload: rst.data,
        })
      }
    },
  },


  reducers: {}
};

export default module;

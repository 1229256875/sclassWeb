import {getFacultyAll, insertFaculty, updateFaculty, deleteFaculty} from "@/api/api";
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
      console.log(rst.data.data);
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


    * getHistCouAdmin(action, {call, put}) {
      const rst = yield call(getFacultyAll, action.payload);
      console.log(rst);
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
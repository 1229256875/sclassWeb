import {getCourseByUser, getSelectClassByCourseId} from "@/api/api";
import {getAuthority} from "@/utils/authority";

const module = {
  namespace: 'auditCourse',

  state: {
    auditList: [],
    unAuditList: [],
    rfAuditList: [],
  },

  effects: {
    * getCourseByUser(action, {call, put}) {
      // debugger
      const rst = yield call(getCourseByUser);
      yield put({
        type: 'changeCourseListInfo',
        payload: rst.data.data,
      })
      return rst;
    },

    * getSelectClassByCourseId(action, {call, put}) {
      const rst = yield call(getSelectClassByCourseId, action.payload)
      return rst.data;
    }
  },


  reducers: {
    changeCourseListInfo(state, {payload}) {
      return {
        ...state,
        auditList: payload.auditList,
        unAuditList: payload.unAuditList,
        rfAuditList: payload.rfAuditList,
      };
    },
  }
};

export default module;

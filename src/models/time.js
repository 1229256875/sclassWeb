import {getTime, deleteRoomName, getLikeRoomName, insertRoomName} from "@/api/api";

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

    * deleteRoomName(action, {call, put}){
      const rst =  yield call(deleteRoomName, action.payload);
      return rst.data;
    },

    * getLikeRoomName(action, {call, put}){
      const rst =  yield call(getLikeRoomName, action.payload);
      return rst.data;
    },

    * insertRoomName(action, {call, put}){
      const rst =  yield call(insertRoomName, action.payload);
      return rst.data;
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

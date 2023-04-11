import { createActions, handleActions } from "redux-actions";

const initialState = {
  scheduleList: [],
  scheduleDetail: [],
  scheduleSearchList: [],
  calendarList: [],
  calendarDetail: [],
  calendarMemList: [],
  scheduleCommentList: [],
};

export const GET_SCHEDULELIST = "schedule/GET_SCHEDULELIST";
export const GET_SCHEDULE = "schedule/GET_SCHEDULE";
export const POST_SCHEDULE = "schedule/POST_SCHEDULE";
export const PUT_SCHEDULE = "schedule/PUT_SCHEDULE";
export const DELETE_SCHEDULE = "schedule/DELETE_SCHEDULE";
export const GET_SEARCHSCHEDULE = "schedule/GET_SEARCHSCHEDULE";

export const GET_CALENDARLIST = "schedule/GET_CALENDARLIST";
export const GET_CALENDAR = "schedule/GET_CALENDAR";
export const POST_CALENDAR = "schedule/POST_CALENDAR";
export const PUT_CALENDAR = "schedule/PUT_CALENDAR";
export const DELETE_CALENDAR = "schedule/DELETE_CALENDAR";

export const GET_CALENDARMEMLIST = "schedule/GET_CALENDARMEMLIST";
export const POST_CALENDARMEM = "schedule/POST_CALENDARMEM";
export const DELETE_CALENDARMEM = "schedule/DELETE_CALENDARMEM";

export const GET_SCHEDULECOMMENTLIST = "schedule/GET_SCHEDULECOMMENTLIST";
export const POST_SCHEDULECOMMENT = "schedule/POST_SCHEDULECOMMENT";
export const PUT_SCHEDULECOMMENT = "schedule/PUT_SCHEDULECOMMENT";
export const DELETE_SCHEDULECOMMENT = "schedule/DELETE_SCHEDULECOMMENT";

// eslint-disable-next-line
const actions = createActions({
  [GET_SCHEDULELIST]: () => {},
  [GET_SCHEDULE]: () => {},
  [POST_SCHEDULE]: () => {},
  [PUT_SCHEDULE]: () => {},
  [DELETE_SCHEDULE]: () => {},
  [GET_SEARCHSCHEDULE]: () => {},

  [GET_CALENDARLIST]: () => {},
  [GET_CALENDAR]: () => {},
  [POST_CALENDAR]: () => {},
  [PUT_CALENDAR]: () => {},
  [DELETE_CALENDAR]: () => {},

  [GET_CALENDARMEMLIST]: () => {},
  [POST_CALENDARMEM]: () => {},
  [DELETE_CALENDARMEM]: () => {},

  [GET_SCHEDULECOMMENTLIST]: () => {},
  [POST_SCHEDULECOMMENT]: () => {},
  [PUT_SCHEDULECOMMENT]: () => {},
  [DELETE_SCHEDULECOMMENT]: () => {},
});

const scheduleReducer = handleActions(
  {
    [GET_SCHEDULELIST]: (state, { payload }) => {
      // console.log("GET_TODAYTODOLIST Reducer 내부 payload : ", payload);
      return { ...state, scheduleList: payload };
    },
    [GET_SCHEDULE]: (state, { payload }) => {
      // console.log("GET_TODO Reducer 내부 payload : ", payload);
      return { ...state, scheduleDetail: payload };
    },
    [POST_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [PUT_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [DELETE_SCHEDULE]: (state, { payload }) => {
      return payload;
    },
    [GET_SEARCHSCHEDULE]: (state, { payload }) => {
      return { ...state, scheduleSearchList: payload };
    },

    [GET_CALENDARLIST]: (state, { payload }) => {
      // console.log("GET_CATEGORYLIST Reducer 내부 payload : ", payload);
      return { ...state, calendarList: payload };
    },
    [GET_CALENDAR]: (state, { payload }) => {
      return { ...state, calendarDetail: payload };
    },
    [POST_CALENDAR]: (state, { payload }) => {
      return payload;
    },
    [PUT_CALENDAR]: (state, { payload }) => {
      return payload;
    },
    [DELETE_CALENDAR]: (state, { payload }) => {
      return payload;
    },

    [GET_CALENDARMEMLIST]: (state, { payload }) => {
      return { ...state, calendarMemList: payload };
    },
    [POST_CALENDARMEM]: (state, { payload }) => {
      return payload;
    },
    [DELETE_CALENDARMEM]: (state, { payload }) => {
      return payload;
    },

    [GET_SCHEDULECOMMENTLIST]: (state, { payload }) => {
      return { ...state, scheduleCommentList: payload };
    },
    [POST_SCHEDULECOMMENT]: (state, { payload }) => {
      return payload;
    },
    [PUT_SCHEDULECOMMENT]: (state, { payload }) => {
      return payload;
    },
    [DELETE_SCHEDULECOMMENT]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default scheduleReducer;

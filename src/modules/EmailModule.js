import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  emailState: [],
  sentEmails: [],
  receivedEmails: [],
  emailDetail: {},
  moveToTrash: [],
  deleteEmails: [],
  pageInfo: { totalCount: 0, pageSize: 1, endPage: 0 },
  searchEmails: [],
};

/* 액션 */
export const GET_SEND_EMAIL = "email/GET_SEND_EMAIL";
export const GET_SEND_EMAILS = "email/GET_SEND_EMAILS";
export const GET_RECEIVE_EMAIL = "email/GET_RECEIVE_EMAILS";
export const GET_RECEIVE_EMAILS = "email/GET_RECEIVE_EMAILS";
export const GET_DELETE_EMAILS = "email/GET_DELETE_EMAILS";
export const RECEIVE_EMAIL_DETAIL = "email/RECEIVE_EMAIL_DETAIL";
export const POST_SEND_EMAIL = "email/POST_SEND_EMAIL";
export const PUT_MOVE_EMAIL = "email/PUT_MOVE_EMAIL";
export const SEARCH_EMAILS = "email/SEARCH_EMAILS";

// eslint-disable-next-line
const actions = createActions({
  [GET_SEND_EMAIL]: () => {},
  [GET_SEND_EMAILS]: () => {},
  [GET_RECEIVE_EMAIL]: () => {},
  [GET_RECEIVE_EMAILS]: () => {},
  [GET_DELETE_EMAILS]: () => {},
  [RECEIVE_EMAIL_DETAIL]: () => {},
  [POST_SEND_EMAIL]: () => {},
  [PUT_MOVE_EMAIL]: () => {},
  [SEARCH_EMAILS]: () => {},
});

/* 리듀서 */
const emailReducer = handleActions(
  {
    [GET_SEND_EMAIL]: (state, { payload }) => {
      console.log("[emailReducer] GET_SEND_EMAIL payload: ", payload);
      return { ...state, emailDetail: payload };
    },
    [GET_SEND_EMAILS]: (state, { payload }) => {
      const { pageInfo } = payload;
      return { ...state, sentEmails: payload, pageInfo };
    },
    [GET_RECEIVE_EMAIL]: (state, { payload }) => {
      return { ...state, receivedEmails: payload };
    },
    [GET_RECEIVE_EMAILS]: (state, { payload }) => {
      const { pageInfo } = payload;
      return { ...state, receivedEmails: payload, pageInfo };
    },
    [GET_DELETE_EMAILS]: (state, { payload }) => {
      const { pageInfo } = payload;
      return { ...state, deleteEmails: payload, pageInfo };
    },
    [RECEIVE_EMAIL_DETAIL]: (state, { payload }) => {
      return { ...state, emailDetail: payload };
    },
    [POST_SEND_EMAIL]: (state, { payload }) => {
      return { ...state, sentEmails: payload };
    },
    [PUT_MOVE_EMAIL]: (state, { payload }) => {
      return { ...state, moveTrash: payload };
    },
    [SEARCH_EMAILS]: (state, { payload }) => {
      console.log("[emailReducer] SEARCH_EMAILS payload: ", payload);
      const { pageInfo } = payload;
      return { ...state, searchEmails: payload, pageInfo };
    },
  },
  initialState
);

export default emailReducer;

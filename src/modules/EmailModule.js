import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  sentEmails: [],
  receivedEmails: [],
  emailDetail: {},
};

/* 액션 */
export const GET_SEND_EMAIL = "email/GET_SEND_EMAIL";
export const GET_SEND_EMAILS = "email/GET_SEND_EMAILS";
export const GET_RECEIVE_EMAIL = "email/GET_RECEIVE_EMAILS";
export const GET_RECEIVE_EMAILS = "email/GET_RECEIVE_EMAILS";
export const RECEIVE_EMAIL_DETAIL = "email/RECEIVE_EMAIL_DETAIL";
export const POST_SEND_EMAIL = "email/POST_SEND_EMAIL";

// eslint-disable-next-line
const actions = createActions({
  [GET_SEND_EMAIL]: () => {},
  [GET_SEND_EMAILS]: () => {},
  [GET_RECEIVE_EMAIL]: () => {},
  [GET_RECEIVE_EMAILS]: () => {},
  [RECEIVE_EMAIL_DETAIL]: () => {},
  [POST_SEND_EMAIL]: () => {},
});

/* 리듀서 */
const emailReducer = handleActions(
  {
    [GET_SEND_EMAIL]: (state, { payload }) => {
      console.log("[emailReducer] GET_SEND_EMAIL payload: ", payload);
      return { ...state, emailDetail: payload };
    },
    [GET_SEND_EMAILS]: (state, { payload }) => {
      return { ...state, sentEmails: payload };
    },
    [GET_RECEIVE_EMAIL]: (state, { payload }) => {
      return { ...state, receivedEmails: payload };
    },
    [GET_RECEIVE_EMAILS]: (state, { payload }) => {
      return { ...state, receivedEmails: payload };
    },
    [RECEIVE_EMAIL_DETAIL]: (state, { payload }) => {
      return { ...state, emailDetail: payload };
    },
    [POST_SEND_EMAIL]: (state, { payload }) => {
      return { ...state, sentEmails: payload };
    },
  },
  initialState
);

export default emailReducer;

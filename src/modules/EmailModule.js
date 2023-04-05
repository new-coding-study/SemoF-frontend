import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SEND_EMAIL = "email/GET_SEND_EMAIL";
export const GET_SEND_EMAILS = "email/GET_SEND_EMAILS";
export const GET_RECEIVE_EMAIL = "email/GET_RECEIVE_EMAILS";
export const GET_RECEIVE_EMAILS = "email/GET_RECEIVE_EMAILS";
export const POST_SEND_EMAIL = "email/POST_SEND_EMAIL";

// eslint-disable-next-line
const actions = createActions({
  [GET_SEND_EMAIL]: () => {},
  [GET_SEND_EMAILS]: () => {},
  [GET_RECEIVE_EMAIL]: () => {},
  [GET_RECEIVE_EMAILS]: () => {},
  [POST_SEND_EMAIL]: () => {},
});

/* 리듀서 */
const emailReducer = handleActions(
  {
    [GET_SEND_EMAIL]: (state, { payload }) => {
      return payload;
    },
    [GET_SEND_EMAILS]: (state, { payload }) => {
      return payload;
    },
    [GET_RECEIVE_EMAIL]: (state, { payload }) => {
      return payload;
    },
    [GET_RECEIVE_EMAILS]: (state, { payload }) => {
      return payload;
    },
    [POST_SEND_EMAIL]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default emailReducer;

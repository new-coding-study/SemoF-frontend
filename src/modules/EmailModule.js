import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SEND_EMAIL = "email/GET_SEND_EMAIL";

// eslint-disable-next-line
const actions = createActions({
  [GET_SEND_EMAIL]: () => {},
});

/* 리듀서 */
const emailReducer = handleActions(
  {
    [GET_SEND_EMAIL]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default emailReducer;

import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_REGISTER = "join/POST_REGISTER";
// eslint-disable-next-line
const actions = createActions({
  [POST_REGISTER]: () => {},
});

/* 리듀서 */
const registerEmpReducer = handleActions(
  {
    [POST_REGISTER]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default registerEmpReducer;

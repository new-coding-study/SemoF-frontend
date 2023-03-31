import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_REGISTER = "join/POST_REGISTER";
export const GET_EMPLOYEES = "present/GET_EMPLOYEES"; // 전체 리스트
export const GET_EMPLOYEE = "present/GET_EMPLOYEE"; //필터링 리스트
// eslint-disable-next-line
const actions = createActions({
  [POST_REGISTER]: () => {},
  [GET_EMPLOYEES]: () => {},
  [GET_EMPLOYEE]: () => {},
});

/* 리듀서 */
const empReducer = handleActions(
  {
    [POST_REGISTER]: (state, { payload }) => {
      return payload;
    },
    [GET_EMPLOYEES]: (state, { payload }) => {
      return payload;
    },
    [GET_EMPLOYEE]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default empReducer;

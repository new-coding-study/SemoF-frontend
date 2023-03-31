import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const POST_REGISTER = "join/POST_REGISTER";
export const GET_EMPLOYEES = "present/GET_EMPLOYEES"; // 전체 리스트
export const SEARCH_EMPLOYEES = "present/SEARCH_EMPLOYEES "; //필터링 리스트
// eslint-disable-next-line
const actions = createActions({
  [POST_REGISTER]: () => {},
  [GET_EMPLOYEES]: () => {},
  [SEARCH_EMPLOYEES]: () => {},
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
    [SEARCH_EMPLOYEES]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default empReducer;

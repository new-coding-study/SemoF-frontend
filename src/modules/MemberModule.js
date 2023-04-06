import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  regist:[]
}


/* 액션 */
export const GET_MEMBER = "member/GET_MEMBER";
export const POST_LOGIN = "member/POST_LOGIN";
export const POST_REGISTER = "member/POST_REGISTER";
export const POST_ID = "member/POST_ID";
export const POST_REG = "member/POST_REG";
// 이거 intial state 나눠야 될거 같니?
// eslint-disable-next-line
const actions = createActions({
  [GET_MEMBER]: () => {},
  [POST_LOGIN]: () => {},
  [POST_REGISTER]: () => {},
  [POST_ID]: () => {},
  [POST_REG]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
  {
    [GET_MEMBER]: (state, { payload }) => {
      return payload;
    },
    [POST_LOGIN]: (state, { payload }) => {
      return payload;
    },
    [POST_REGISTER]: (state, { payload }) => {
      return{...state, regist: payload};
    },
    [POST_ID]: (state, { payload }) => {
      return payload;
    },
    [POST_REG]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default memberReducer;

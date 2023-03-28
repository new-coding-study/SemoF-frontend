import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_TODOLIST = "todo/GET_TODOLIST";
export const GET_TODO = "todo/GET_TODO";
export const POST_CATEGORY = "todo/POST_CATEGORY";
export const PUT_CATEGORY = "todo/PUT_CATEGORY";
export const DELETE_CATEGORY = "todo/DELETE_CATEGORY";
export const POST_TODO = "todo/POST_TODO";
export const PUT_TODO = "todo/PUT_TODO";
export const DELETE_TODO = "todo/DELETE_TODO";
export const PUT_STAR = "todo/PUT_STAR";

// eslint-disable-next-line
const actions = createActions({
  [GET_TODOLIST]: () => {},
  [GET_TODO]: () => {},
  [POST_CATEGORY]: () => {},
  [PUT_CATEGORY]: () => {},
  [DELETE_CATEGORY]: () => {},
  [POST_TODO]: () => {},
  [PUT_TODO]: () => {},
  [DELETE_TODO]: () => {},
  [PUT_STAR]: () => {},
});

const todoReducer = handleActions(
  {
    [GET_TODOLIST]: (state, { payload }) => {
      console.log("Reducer 내부 payload : ", payload);
      return payload;
    },
    [GET_TODO]: (state, { payload }) => {
      return payload;
    },
    [POST_CATEGORY]: (state, { payload }) => {
      return payload;
    },
    [PUT_CATEGORY]: (state, { payload }) => {
      return payload;
    },
    [DELETE_CATEGORY]: (state, { payload }) => {
      return payload;
    },
    [POST_TODO]: (state, { payload }) => {
      return payload;
    },
    [PUT_TODO]: (state, { payload }) => {
      return payload;
    },
    [DELETE_TODO]: (state, { payload }) => {
      return payload;
    },
    [PUT_STAR]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default todoReducer;

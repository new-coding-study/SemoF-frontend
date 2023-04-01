import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  employees: [],
  employeeBranches: [],
  employeeDepartments: [],
};

/* 액션 */
export const POST_REGISTER = "employee/POST_REGISTER";
export const GET_EMPLOYEES = "employee/GET_EMPLOYEES";
export const GET_EMPLOYEES_BRANCHES = "employee/GET_EMPLOYEES_BRANCHES";
export const GET_EMPLOYEES_DEPARTMENTS = "employee/GET_EMPLOYEES_DEPARTMENTS";
export const SEARCH_EMPLOYEES = "employee/SEARCH_EMPLOYEES ";
export const PUT_EMPLOYEES_BRANCHES = "employee/PUT_EMPLOYEES_BRANCHES";
export const PUT_EMPLOYEES_DEPARTMENTS = "employee/PUT_EMPLOYEES_DEPARTMENTS";

// eslint-disable-next-line
const actions = createActions({
  [POST_REGISTER]: () => {},
  [GET_EMPLOYEES]: () => {},
  [GET_EMPLOYEES_BRANCHES]: () => {},
  [GET_EMPLOYEES_DEPARTMENTS]: () => {},
  [SEARCH_EMPLOYEES]: () => {},
  [PUT_EMPLOYEES_BRANCHES]: () => {},
  [PUT_EMPLOYEES_DEPARTMENTS]: () => {},
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
    [GET_EMPLOYEES_BRANCHES]: (state, action) => {
      return {
        ...state,
        branches: action.payload,
      };
    },
    [GET_EMPLOYEES_DEPARTMENTS]: (state, action) => {
      return {
        ...state,
        departments: action.payload,
      };
    },
    [SEARCH_EMPLOYEES]: (state, { payload }) => {
      return payload;
    },
    [PUT_EMPLOYEES_BRANCHES]: (state, { payload }) => {
      return payload;
    },
    [PUT_EMPLOYEES_DEPARTMENTS]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default empReducer;

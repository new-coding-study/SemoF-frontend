import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {
  employees: [],
  employeeBranches: [],
  employeeDepartments: [],
  employeeDetail: {},
  empPhoto: {},
  empBirth: {},
  empBirthday: [],
  empChart: {},
  mainEmpBirth: {},
};

/* 액션 */
export const POST_REGISTER = "employee/POST_REGISTER";
export const POST_EMPLOYEES_CONTRIBUTIONS =
  "employee/POST_EMPLOYEES_CONTRIBUTIONS";
export const GET_EMPLOYEES = "employee/GET_EMPLOYEES";
export const GET_EMPLOYEES_BIRTH = "employee/GET_EMPLOYEES_BIRTH";
export const GET_MAIN_EMPLOYEES_BIRTH = "employee/GET_MAIN_EMPLOYEES_BIRTH";
export const GET_EMPLOYEES_DETAIL = "employee/GET_EMPLOYEES_DETAIL";
export const GET_EMPLOYEES_PHOTO = "employee/GET_EMPLOYEES_PHOTO";
export const GET_EMPLOYEES_BRANCHES = "employee/GET_EMPLOYEES_BRANCHES";
export const GET_EMPLOYEES_DEPARTMENTS = "employee/GET_EMPLOYEES_DEPARTMENTS";
export const GET_EMPLOYEES_CONTRIBUTION = "employee/GET_EMPLOYEES_CONTRIBUTION"; // 사원
export const GET_EMPLOYEES_CONTRIBUTIONS =
  "employee/GET_EMPLOYEES_CONTRIBUTIONS"; //전체
export const GET_EMPLOYEES_ATTENDANCE = "employee/GET_EMPLOYEES_ATTENDANCE";
export const GET_EMPLOYEES_VACATION = "employee/GET_EMPLOYEES_VACATION";
export const GET_EMPLOYEES_CHART = "employee/GET_EMPLOYEES_CHART";
export const SEARCH_EMPLOYEES = "employee/SEARCH_EMPLOYEES ";
export const PUT_EMPLOYEES_BRANCHES = "employee/PUT_EMPLOYEES_BRANCHES";
export const PUT_EMPLOYEES_DEPARTMENTS = "employee/PUT_EMPLOYEES_DEPARTMENTS";
export const PUT_EMPLOYEES_CONTRIBUTION = "employee/PUT_EMPLOYEES_CONTRIBUTION"; // 사원
export const PUT_EMPLOYEES_INFO = "employee/PUT_EMPLOYEES_INFO"; // 사원
export const DELETE_EMPLOYEES_CONTRIBUTION =
  "employee/DELETE_EMPLOYEES_CONTRIBUTION"; // 사원
export const DELETE_EMPLOYEES = "employee/DELETE_EMPLOYEES";

// eslint-disable-next-line
const actions = createActions({
  [POST_REGISTER]: () => {},
  [POST_EMPLOYEES_CONTRIBUTIONS]: () => {},
  [GET_EMPLOYEES]: () => {},
  [GET_EMPLOYEES_BIRTH]: () => {},
  [GET_MAIN_EMPLOYEES_BIRTH]: () => {},
  [GET_EMPLOYEES_DETAIL]: () => {},
  [GET_EMPLOYEES_PHOTO]: () => {},
  [GET_EMPLOYEES_BRANCHES]: () => {},
  [GET_EMPLOYEES_DEPARTMENTS]: () => {},
  [GET_EMPLOYEES_CONTRIBUTION]: () => {},
  [GET_EMPLOYEES_CONTRIBUTIONS]: () => {},
  [GET_EMPLOYEES_ATTENDANCE]: () => {},
  [GET_EMPLOYEES_VACATION]: () => {},
  [GET_EMPLOYEES_CHART]: () => {},
  [SEARCH_EMPLOYEES]: () => {},
  [PUT_EMPLOYEES_BRANCHES]: () => {},
  [PUT_EMPLOYEES_DEPARTMENTS]: () => {},
  [PUT_EMPLOYEES_CONTRIBUTION]: () => {},
  [PUT_EMPLOYEES_INFO]: () => {},
  [DELETE_EMPLOYEES_CONTRIBUTION]: () => {},
  [DELETE_EMPLOYEES]: () => {},
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
    [GET_EMPLOYEES_BIRTH]: (state, { payload }) => {
      return {
        ...state,
        empBirth: payload,
      };
    },
    [GET_MAIN_EMPLOYEES_BIRTH]: (state, { payload }) => {
      return {
        ...state,
        mainEmpBirth: payload,
      };
    },
    [GET_EMPLOYEES_DETAIL]: (state, { payload }) => {
      return payload;
    },
    [GET_EMPLOYEES_PHOTO]: (state, { payload }) => {
      // console.log("Payload received in reducer:", payload);
      return {
        ...state,
        empPhoto: payload,
      };
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
    [GET_EMPLOYEES_CONTRIBUTION]: (state, { payload }) => {
      return {
        ...state,
        contribution: payload,
      };
    },
    [GET_EMPLOYEES_CONTRIBUTIONS]: (state, { payload }) => {
      return {
        ...state,
        contributionList: payload,
      };
    },
    [GET_EMPLOYEES_ATTENDANCE]: (state, { payload }) => {
      // console.log("Payload received in reducer:", payload);
      return {
        ...state,
        empAttendance: payload,
      };
    },
    [GET_EMPLOYEES_VACATION]: (state, { payload }) => {
      // console.log("Payload received in reducer:", payload);
      return {
        ...state,
        empVacation: payload,
      };
    },
    [GET_EMPLOYEES_CHART]: (state, { payload }) => {
      // console.log("Payload received in reducer:", payload);
      return {
        ...state,
        empChart: payload,
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
    [PUT_EMPLOYEES_CONTRIBUTION]: (state, { payload }) => {
      return payload;
    },
    [PUT_EMPLOYEES_INFO]: (state, { payload }) => {
      return payload;
    },
    [DELETE_EMPLOYEES_CONTRIBUTION]: (state) => {
      return state;
    },
    [DELETE_EMPLOYEES]: (state) => {
      return state;
    },
  },
  initialState
);

export default empReducer;

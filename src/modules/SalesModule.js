import { createActions, handleActions } from "redux-actions";

export const GET_SALES_ALLFORADMIN = 'SALES/GET_SALES_ALLFORADMIN';
export const GET_SALES_NFORADMIN = 'SALES/GET_SALES_NFORADMIN';
export const GET_SALES_YFORADMIN = 'SALES/GET_SALES_YFORADMIN';
export const GET_SALES_ALLFOREMP = 'SALES/GET_SALES_ALLFOREMP';
export const GET_SALES_NFOREMP = 'SALES/GET_SALES_NFOREMP';
export const GET_SALES_YFOREMP = 'SALES/GET_SALES_YFOREMP';
export const GET_DETAIL_ADMIN = 'SALES/GET_DETAIL_ADMIN';
export const GET_DETAIL_EMP = 'SALES/GET_DETAIL_EMP';
export const POST_SALES_FOREMP = 'SALES/POST_SALES_FOREMP';
export const PUT_SALES_FORADMIN = 'SALES/PUT_SALES_FORADMIN';
export const PUT_SALES_FOREMP = 'SALES/PUT_SALES_FOREMP';
export const DELETE_SALES_FORADMIN = 'SALES/DELETE_SALES_FORADMIN';
export const DELETE_SALES_FOREMP = 'SALES/DELETE_SALES_FOREMP';


const initialState = {
    allForAdmin:[],
    nForAdmin:[],
    yForAdmin:[],
    allForEmp:[],
    nForEmp:[],
    yForEmp:[],
    detailForAdmin:[],
    detailForEmp:[],
    postReport:[],
    putForAdmin:[],
    putForEmp:[],
    deleteForAdmin:[],
    deleteForEmp:[]
}

const actions = createActions({
    [GET_SALES_ALLFORADMIN]: () => {},
    [GET_SALES_NFORADMIN]: () => {},
    [GET_SALES_YFORADMIN]: () => {},
    [GET_SALES_ALLFOREMP]: () => {},
    [GET_SALES_NFOREMP]: () => {},
    [GET_SALES_YFOREMP]: () => {},
    [GET_DETAIL_ADMIN]: () => {},
    [GET_DETAIL_EMP]: () => {},
    [POST_SALES_FOREMP]: () => {},
    [PUT_SALES_FORADMIN]: () => {},
    [PUT_SALES_FOREMP]: () => {},
    [DELETE_SALES_FORADMIN]: () => {},
    [DELETE_SALES_FOREMP]: () => {},
});

const salesReportReducer = handleActions(
    {
        [GET_SALES_ALLFORADMIN]: (state, {payload}) => {return {...state, allForAdmin:payload};},
        [GET_SALES_NFORADMIN]: (state, {payload}) => {return {...state, nForAdmin:payload};},
        [GET_SALES_YFORADMIN]: (state, {payload}) => {return {...state, yForAdmin:payload};},
        [GET_SALES_ALLFOREMP]: (state, {payload}) => {return {...state, allForEmp:payload};},
        [GET_SALES_NFOREMP]: (state, {payload}) => {return {...state, nForEmp:payload};},
        [GET_SALES_YFOREMP]: (state, {payload}) => {return {...state, yForEmp:payload};},
        [GET_DETAIL_ADMIN]: (state, {payload}) => {return {...state, detailForAdmin:payload};},
        [GET_DETAIL_EMP]: (state, {payload}) => {return {...state, detailForEmp:payload};},
        [POST_SALES_FOREMP]: (state, {payload}) => {return {...state, postReport:payload};},
        [PUT_SALES_FORADMIN]: (state, {payload}) => {return {...state, putForAdmin:payload};},
        [PUT_SALES_FOREMP]: (state, {payload}) => {return {...state, putForEmp:payload};},
        [DELETE_SALES_FORADMIN]: (state, {payload}) => {return {...state, deleteForAdmin:payload};},
        [DELETE_SALES_FOREMP]: (state, {payload}) => {return {...state, deleteForEmp:payload};}, 
    },
    initialState
); export default salesReportReducer;
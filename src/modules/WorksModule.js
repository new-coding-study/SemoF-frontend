import { createActions, handleActions } from "redux-actions";

export const GET_WORKS_ALLFORADMIN = 'works/GET_WORKS_ALLFORADMIN';
export const GET_WORKS_NFORADMIN = 'works/GET_WORKS_NFORADMIN';
export const GET_WORKS_YFORADMIN = 'works/GET_WORKS_YFORADMIN';
export const GET_WORKS_ALLFOREMP = 'works/GET_WORKS_ALLFOREMP';
export const GET_WORKS_NFOREMP = 'works/GET_WORKS_NFOREMP';
export const GET_WORKS_YFOREMP = 'works/GET_WORKS_YFOREMP';
export const GET_DETAIL_ADMIN = 'works/GET_DETAIL_ADMIN';
export const GET_DETAIL_EMP = 'works/GET_DETAIL_EMP';
export const POST_WORKS_FOREMP = 'works/POST_WORKS_FOREMP';
export const PUT_WORKS_FORADMIN = 'works/PUT_WORKS_FORADMIN';
export const PUT_WORKS_FOREMP = 'works/PUT_WORKS_FOREMP';
export const DELETE_WORKS_FORADMIN = 'works/DELETE_WORKS_FORADMIN';
export const DELETE_WORKS_FOREMP = 'works/DELETE_WORKS_FOREMP';


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
    [GET_WORKS_ALLFORADMIN]: () => {},
    [GET_WORKS_NFORADMIN]: () => {},
    [GET_WORKS_YFORADMIN]: () => {},
    [GET_WORKS_ALLFOREMP]: () => {},
    [GET_WORKS_NFOREMP]: () => {},
    [GET_WORKS_YFOREMP]: () => {},
    [GET_DETAIL_ADMIN]: () => {},
    [GET_DETAIL_EMP]: () => {},
    [POST_WORKS_FOREMP]: () => {},
    [PUT_WORKS_FORADMIN]: () => {},
    [PUT_WORKS_FOREMP]: () => {},
    [DELETE_WORKS_FORADMIN]: () => {},
    [DELETE_WORKS_FOREMP]: () => {},
});

const worksReportReducer = handleActions(
    {
        [GET_WORKS_ALLFORADMIN]: (state, {payload}) => {return {...state, allForAdmin:payload};},
        [GET_WORKS_NFORADMIN]: (state, {payload}) => {return {...state, nForAdmin:payload};},
        [GET_WORKS_YFORADMIN]: (state, {payload}) => {return {...state, yForAdmin:payload};},
        [GET_WORKS_ALLFOREMP]: (state, {payload}) => {return {...state, allForEmp:payload};},
        [GET_WORKS_NFOREMP]: (state, {payload}) => {return {...state, nForEmp:payload};},
        [GET_WORKS_YFOREMP]: (state, {payload}) => {return {...state, yForEmp:payload};},
        [GET_DETAIL_ADMIN]: (state, {payload}) => {return {...state, detailForAdmin:payload};},
        [GET_DETAIL_EMP]: (state, {payload}) => {return {...state, detailForEmp:payload};},
        [POST_WORKS_FOREMP]: (state, {payload}) => {return {...state, postReport:payload};},
        [PUT_WORKS_FORADMIN]: (state, {payload}) => {return {...state, putForAdmin:payload};},
        [PUT_WORKS_FOREMP]: (state, {payload}) => {return {...state, putForEmp:payload};},
        [DELETE_WORKS_FORADMIN]: (state, {payload}) => {return {...state, deleteForAdmin:payload};},
        [DELETE_WORKS_FOREMP]: (state, {payload}) => {return {...state, deleteForEmp:payload};}, 
    },
    initialState
); export default worksReportReducer;
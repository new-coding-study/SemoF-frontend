import { createActions, handleActions } from "redux-actions";

export const GET_MEETING_ALLFORADMIN = 'SALES/GET_MEETING_ALLFORADMIN';
export const GET_MEETING_NFORADMIN = 'SALES/GET_MEETING_NFORADMIN';
export const GET_MEETING_YFORADMIN = 'SALES/GET_MEETING_YFORADMIN';
export const GET_MEETING_ALLFOREMP = 'SALES/GET_MEETING_ALLFOREMP';
export const GET_MEETING_NFOREMP = 'SALES/GET_MEETING_NFOREMP';
export const GET_MEETING_YFOREMP = 'SALES/GET_MEETING_YFOREMP';
export const GET_DETAIL_ADMIN = 'SALES/GET_DETAIL_ADMIN';
export const GET_DETAIL_EMP = 'SALES/GET_DETAIL_EMP';
export const POST_MEETING_FOREMP = 'SALES/POST_MEETING_FOREMP';
export const PUT_MEETING_FORADMIN = 'SALES/PUT_MEETING_FORADMIN';
export const PUT_MEETING_FOREMP = 'SALES/PUT_MEETING_FOREMP';
export const DELETE_MEETING_FORADMIN = 'SALES/DELETE_MEETING_FORADMIN';
export const DELETE_MEETING_FOREMP = 'SALES/DELETE_MEETING_FOREMP';


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
    [GET_MEETING_ALLFORADMIN]: () => {},
    [GET_MEETING_NFORADMIN]: () => {},
    [GET_MEETING_YFORADMIN]: () => {},
    [GET_MEETING_ALLFOREMP]: () => {},
    [GET_MEETING_NFOREMP]: () => {},
    [GET_MEETING_YFOREMP]: () => {},
    [GET_DETAIL_ADMIN]: () => {},
    [GET_DETAIL_EMP]: () => {},
    [POST_MEETING_FOREMP]: () => {},
    [PUT_MEETING_FORADMIN]: () => {},
    [PUT_MEETING_FOREMP]: () => {},
    [DELETE_MEETING_FORADMIN]: () => {},
    [DELETE_MEETING_FOREMP]: () => {},
});

const meetingReportReducer = handleActions(
    {
        [GET_MEETING_ALLFORADMIN]: (state, {payload}) => {return {...state, allForAdmin:payload};},
        [GET_MEETING_NFORADMIN]: (state, {payload}) => {return {...state, nForAdmin:payload};},
        [GET_MEETING_YFORADMIN]: (state, {payload}) => {return {...state, yForAdmin:payload};},
        [GET_MEETING_ALLFOREMP]: (state, {payload}) => {return {...state, allForEmp:payload};},
        [GET_MEETING_NFOREMP]: (state, {payload}) => {return {...state, nForEmp:payload};},
        [GET_MEETING_YFOREMP]: (state, {payload}) => {return {...state, yForEmp:payload};},
        [GET_DETAIL_ADMIN]: (state, {payload}) => {return {...state, detailForAdmin:payload};},
        [GET_DETAIL_EMP]: (state, {payload}) => {return {...state, detailForEmp:payload};},
        [POST_MEETING_FOREMP]: (state, {payload}) => {return {...state, postReport:payload};},
        [PUT_MEETING_FORADMIN]: (state, {payload}) => {return {...state, putForAdmin:payload};},
        [PUT_MEETING_FOREMP]: (state, {payload}) => {return {...state, putForEmp:payload};},
        [DELETE_MEETING_FORADMIN]: (state, {payload}) => {return {...state, deleteForAdmin:payload};},
        [DELETE_MEETING_FOREMP]: (state, {payload}) => {return {...state, deleteForEmp:payload};}, 
    },
    initialState
); export default meetingReportReducer;
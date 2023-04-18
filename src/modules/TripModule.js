import { createActions, handleActions } from "redux-actions";

export const GET_TRIP_ALLFORADMIN = 'TRIP/GET_TRIP_ALLFORADMIN';
export const GET_TRIP_NFORADMIN = 'TRIP/GET_TRIP_NFORADMIN';
export const GET_TRIP_YFORADMIN = 'TRIP/GET_TRIP_YFORADMIN';
export const GET_TRIP_ALLFOREMP = 'TRIP/GET_TRIP_ALLFOREMP';
export const GET_TRIP_NFOREMP = 'TRIP/GET_TRIP_NFOREMP';
export const GET_TRIP_YFOREMP = 'TRIP/GET_TRIP_YFOREMP';
export const GET_DETAIL_ADMIN = 'TRIP/GET_DETAIL_ADMIN';
export const GET_DETAIL_EMP = 'TRIP/GET_DETAIL_EMP';
export const POST_TRIP_FOREMP = 'TRIP/POST_TRIP_FOREMP';
export const PUT_TRIP_FORADMIN = 'TRIP/PUT_TRIP_FORADMIN';
export const PUT_TRIP_FOREMP = 'TRIP/PUT_TRIP_FOREMP';
export const DELETE_TRIP_FORADMIN = 'TRIP/DELETE_TRIP_FORADMIN';
export const DELETE_TRIP_FOREMP = 'TRIP/DELETE_TRIP_FOREMP';


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
    [GET_TRIP_ALLFORADMIN]: () => {},
    [GET_TRIP_NFORADMIN]: () => {},
    [GET_TRIP_YFORADMIN]: () => {},
    [GET_TRIP_ALLFOREMP]: () => {},
    [GET_TRIP_NFOREMP]: () => {},
    [GET_TRIP_YFOREMP]: () => {},
    [GET_DETAIL_ADMIN]: () => {},
    [GET_DETAIL_EMP]: () => {},
    [POST_TRIP_FOREMP]: () => {},
    [PUT_TRIP_FORADMIN]: () => {},
    [PUT_TRIP_FOREMP]: () => {},
    [DELETE_TRIP_FORADMIN]: () => {},
    [DELETE_TRIP_FOREMP]: () => {},
});

const tripReportReducer = handleActions(
    {
        [GET_TRIP_ALLFORADMIN]: (state, {payload}) => {return {...state, allForAdmin:payload};},
        [GET_TRIP_NFORADMIN]: (state, {payload}) => {return {...state, nForAdmin:payload};},
        [GET_TRIP_YFORADMIN]: (state, {payload}) => {return {...state, yForAdmin:payload};},
        [GET_TRIP_ALLFOREMP]: (state, {payload}) => {return {...state, allForEmp:payload};},
        [GET_TRIP_NFOREMP]: (state, {payload}) => {return {...state, nForEmp:payload};},
        [GET_TRIP_YFOREMP]: (state, {payload}) => {return {...state, yForEmp:payload};},
        [GET_DETAIL_ADMIN]: (state, {payload}) => {return {...state, detailForAdmin:payload};},
        [GET_DETAIL_EMP]: (state, {payload}) => {return {...state, detailForEmp:payload};},
        [POST_TRIP_FOREMP]: (state, {payload}) => {return {...state, postReport:payload};},
        [PUT_TRIP_FORADMIN]: (state, {payload}) => {return {...state, putForAdmin:payload};},
        [PUT_TRIP_FOREMP]: (state, {payload}) => {return {...state, putForEmp:payload};},
        [DELETE_TRIP_FORADMIN]: (state, {payload}) => {return {...state, deleteForAdmin:payload};},
        [DELETE_TRIP_FOREMP]: (state, {payload}) => {return {...state, deleteForEmp:payload};}, 
    },
    initialState
); export default tripReportReducer;
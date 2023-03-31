import { createActions, handleActions } from "redux-actions";

const initialState = {
    approval : [],
    line : [],
    form : []
};

export const GET_APPROVALS = 'approval/GET_APPROVALS';
export const GET_APPROVAL = 'approval/GET_APPROVAL';
export const GET_LINES = 'approval/GET_LINES';
export const GET_FORM = 'approval/GET_FORM';
export const POST_APPROVAL = 'approval/POST_APPROVAL';
export const PUT_APPROVAL = 'approval/PUT_APPROVAL';
export const DELETE_APPROVAL = 'approval/DELETE_APPROVAL';
export const POST_LINE = 'approval/POST_LINE';
export const PUT_LINE = 'approval/PUT_LINE';
export const DELETE_LINE = 'approval/DELETE_LINE';

const actions = createActions({
    [GET_APPROVALS]: () => {},
    [GET_APPROVAL]: () => {},
    [GET_LINES]: () => {},
    [GET_FORM]: () => {},
    [POST_APPROVAL]: () => {},
    [PUT_APPROVAL]: () => {},
    [DELETE_APPROVAL]: () => {},
    [POST_LINE]: () => {},
    [PUT_LINE]: () => {},
    [DELETE_LINE]: () => {}
});

const approvalReducer = handleActions({
    [GET_APPROVALS]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [GET_APPROVAL]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [GET_LINES]: (state, {payload})=>{
        return {...state, line : payload};
    },
    [GET_FORM]: (state, {payload})=>{
        return {...state, form : payload};
    },
    [POST_APPROVAL]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [PUT_APPROVAL]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [DELETE_APPROVAL]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [POST_LINE]: (state, {payload})=>{
        return {...state, line : payload};
    },
    [PUT_LINE]: (state, {payload})=>{
        return {...state, line : payload};
    },
    [DELETE_LINE]: (state, {payload})=>{
        return {...state, line : payload};
    }
}, initialState);
export default approvalReducer;
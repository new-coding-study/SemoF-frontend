import { createActions, handleActions } from "redux-actions";

const initialState = {
    approvals : [],
    approvalsOut : [],
    approval : [],
    lines : [],
    line : [],
    form : [],
    branch : [],
    empInfo: [],
    dept:[],
    status: []
};

export const GET_APPROVALS = 'approval/GET_APPROVALS';
export const GET_APPROVALSOUT = 'approval/GET_APPROVALSOUT';
export const GET_APPROVAL = 'approval/GET_APPROVAL';
export const GET_LINES = 'approval/GET_LINES';
export const GET_LINE = 'approval/GET_LINE';
export const GET_FORM = 'approval/GET_FORM';
export const GET_BRANCHES = 'approval/GET_BRANCHES';
export const GET_JOBS = 'approval/GET_JOBS';
export const GET_DEPT = 'approval/GET_DEPT';
export const GET_STATUS = 'approval/GET_STATUS';
export const POST_APPROVAL = 'approval/POST_APPROVAL';
export const PUT_APPROVAL = 'approval/PUT_APPROVAL';
export const DELETE_APPROVAL = 'approval/DELETE_APPROVAL';
export const POST_LINE = 'approval/POST_LINE';
export const PUT_LINE = 'approval/PUT_LINE';
export const DELETE_LINE = 'approval/DELETE_LINE';
export const POST_ORDERS = 'approval/POST_ORDERS';

const actions = createActions({
    [GET_APPROVALS]: () => {},
    [GET_APPROVALSOUT]: () => {},
    [GET_APPROVAL]: () => {},
    [GET_LINES]: () => {},
    [GET_LINE]: () => {},
    [GET_FORM]: () => {},
    [GET_BRANCHES]: () => {},
    [GET_JOBS]: () => {},
    [GET_DEPT]: () => {},
    [GET_STATUS]: () => {},
    [POST_APPROVAL]: () => {},
    [PUT_APPROVAL]: () => {},
    [DELETE_APPROVAL]: () => {},
    [POST_LINE]: () => {},
    [PUT_LINE]: () => {},
    [DELETE_LINE]: () => {},
    [POST_ORDERS]: () => {}
});

const approvalReducer = handleActions({
    [GET_APPROVALS]: (state, {payload})=>{
        return {...state, approvals : payload};
    },
    [GET_APPROVALSOUT]: (state, {payload})=>{
        return {...state, approvalsOut: payload};
    },
    [GET_APPROVAL]: (state, {payload})=>{
        return {...state, approval : payload};
    },
    [GET_LINES]: (state, {payload})=>{
        return {...state, lines : payload};
    },
    [GET_LINE]: (state, {payload})=>{
        return {...state, line : payload};
    },
    [GET_FORM]: (state, {payload})=>{
        return {...state, form : payload};
    },
    [GET_BRANCHES]: (state, {payload})=>{
        return {...state, branch : payload};
    },
    [GET_JOBS]: (state, {payload})=>{
        return {...state, empInfo : payload};
    },
    [GET_DEPT]: (state, {payload})=>{
        return {...state, dept : payload};
    },
    [GET_STATUS]: (state, {payload})=>{
        return {...state, status : payload};
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
    [POST_ORDERS]: (state, {payload})=>{
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
import { createActions, handleActions } from "redux-actions";

const initialState = {
    approvals : [],
    approvalsOut : [],
    approval : [],
    lineList : [],
    lines : [],
    line : [],
    form : [],
    branch : [],
    empInfo: [],
    dept:[],
    status: [],
    lineInfo: [],
    opinion : [],
    opinions:[],
    handleStatus: [],
    files:[],
    finIn:[],
    finOut:[]
};

export const GET_APPROVALS = 'approval/GET_APPROVALS';
export const GET_APPROVALSOUT = 'approval/GET_APPROVALSOUT';
export const GET_APPROVAL = 'approval/GET_APPROVAL';
export const GET_LINES = 'approval/GET_LINES';
export const GET_LINE_LIST = 'approval/GET_LINE_LIST';
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
export const GET_OPINION = 'approval/GET_OPINION';
export const POST_OPINION = 'approval/POST_OPINION';
export const PUT_STATUS = 'approval/PUT_STATUS';
export const GET_FILES = 'approval/GET_FILES';
export const GET_FIN_IN = 'approval/GET_FIN_IN';
export const GET_FIN_OUT = 'approval/GET_FIN_OUT';

const actions = createActions({
    [GET_APPROVALS]: () => {},
    [GET_APPROVALSOUT]: () => {},
    [GET_APPROVAL]: () => {},
    [GET_LINES]: () => {},
    [GET_LINE]: () => {},
    [GET_LINE_LIST] : () => {},
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
    [POST_ORDERS]: () => {},
    [GET_OPINION]: () => {},
    [POST_OPINION]: () => {},
    [PUT_STATUS] : () => {},
    [GET_FILES] : () => {},
    [GET_FIN_IN] : () => {},
    [GET_FIN_OUT] : () => {}
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
    [GET_LINE_LIST]: (state, {payload})=>{
        return {...state, lineList : payload};
    },
    [GET_LINE]: (state, {payload})=>{
        return {...state, lineInfo : payload};
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
    },
    [GET_OPINION]: (state, {payload})=>{
        return {...state, opinions : payload};
    },
    [POST_OPINION]: (state, {payload})=>{
        return {...state, opinion : payload};
    },
    [PUT_STATUS]: (state, {payload})=>{
        return {...state, handleStatus : payload};
    },
    [GET_FILES]: (state, {payload})=>{
        return {...state, files : payload};
    },
    [GET_FIN_IN]: (state, {payload})=>{
        return {...state, finIn : payload};
    },
    [GET_FIN_OUT]: (state, {payload})=>{
        return {...state, finOut : payload};
    }
}, initialState);
export default approvalReducer;
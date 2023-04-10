import { createActions, handleActions } from "redux-actions";

export const GET_REPLY = 'reply/GET_REPLY';
export const POST_REPLY = 'reply/POST_REPLY';
export const PUT_REPLY = 'reply/PUT_REPLY';
export const DELETE_REPLYFORADMIN = 'reply/DELETE_REPLYFORADMIN';
export const DELETE_REPLYFOREMP = 'reply/DELETE_REPLYFOREMP';

const initialState = {
    getReplies:[],
    postReply:[],
    putReply:[],
    deleteReply:[]
}

const actions = createActions({
    [GET_REPLY]:() => {},
    [POST_REPLY]:() => {},
    [PUT_REPLY]:() => {},
    [DELETE_REPLYFORADMIN]:() => {},
    [DELETE_REPLYFOREMP]:() => {},
});

const replyReducer = handleActions({
    [GET_REPLY]:(state, {payload}) => {return {...state, getReplies:payload};},
    [POST_REPLY]:(state, {payload}) => {return {...state, postReply:payload};},
    [PUT_REPLY]:(state, {payload}) => {return {...state, putReply:payload};},
    [DELETE_REPLYFORADMIN]:(state, {payload}) => {return {...state, deleteReply:payload};},
    [DELETE_REPLYFOREMP]:(state, {payload}) => {return {...state, deleteReply:payload};},

}, initialState); export default replyReducer;
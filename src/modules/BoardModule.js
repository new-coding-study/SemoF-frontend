import { createActions, handleActions } from "redux-actions";

export const GET_BOARD_NOTICE = 'board/GET_BOARD_NOTICE';
export const GET_BOARD_NOTICES = 'board/GET_BOARD_NOTICES';
export const GET_BOARD_NOTICES_TOP3 = 'board/GET_BOARD_NOTICES_TOP3';
export const GET_BOARD_POSTING = 'board/GET_BOARD_POSTING';
export const GET_BOARD_POSTINGS = 'board/GET_BOARD_POSTINGS';
export const POST_BOARD_NOTICE = 'board/POST_BOARD_NOTICE';
export const PUT_BOARD_NOTICE = 'board/PUT_BOARD_NOTICE';
export const DELETE_BOARD_NOTICE = 'board/DELETE_BOARD_NOTICES';
export const POST_BOARD_POSTING = 'board/POSTING_BOARD_POSTING';
export const PUT_BOARD_POSTING = 'board/PUT_BOARD_POSTING';
export const DELETE_BOARD_POSTING = 'board/DELETE_BOARD_POSTING';
// 
const initialState = {
    noticeList : [],
    boardList : []
}

const actions = createActions({
    [GET_BOARD_NOTICE]: () => {},
    [GET_BOARD_NOTICES]: () => {},
    [GET_BOARD_NOTICES_TOP3]: () => {},
    [GET_BOARD_POSTING]: () => {},
    [GET_BOARD_POSTINGS]: () => {},
    [POST_BOARD_NOTICE]: () => {},
    [PUT_BOARD_NOTICE]: () => {},
    [DELETE_BOARD_NOTICE]: () => {},
    [POST_BOARD_POSTING]: () => {},
    [PUT_BOARD_POSTING]: () => {},
    [DELETE_BOARD_POSTING]: () => {}
});

const boardReducer = handleActions(
    {[GET_BOARD_NOTICE]: (state, {payload}) => {
        return payload;
    },
    [GET_BOARD_NOTICES]: (state, {payload}) => {
        return payload;
    },
    [GET_BOARD_NOTICES_TOP3]: (state, {payload}) => {return {...state, noticeList : payload};},
    [GET_BOARD_POSTING]: (state, {payload}) => {return payload;},
    [GET_BOARD_POSTINGS]: (state, {payload}) => {return {...state, boardList : payload};},
    [POST_BOARD_NOTICE]: (state, {payload}) => {return payload;},
    [PUT_BOARD_NOTICE]: (state, {payload}) => {return payload;},
    [DELETE_BOARD_NOTICE]: (state, {payload}) => {return payload;},
    [POST_BOARD_POSTING]: (state, {payload}) => {return payload;},
    [PUT_BOARD_POSTING]: (state, {payload}) => {return payload;},
    [DELETE_BOARD_POSTING]: (state, {payload}) => {return payload;}
}, initialState
); export default boardReducer;
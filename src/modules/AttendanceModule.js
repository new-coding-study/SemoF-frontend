import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STATUS               = 'attendance/GET_STATUS';
export const GET_HISTORIES           = 'attendance/GET_HISTORIES';
export const GET_ANNUAL           = 'attendance/GET_ANNUAL';
export const PUT_STATUS            = 'attendance/PUT_STATUS';
// eslint-disable-next-line
const actions = createActions({
    [GET_STATUS]: () => {},
    [GET_HISTORIES]: () => {},
    [GET_ANNUAL]: () => {},
    [PUT_STATUS]: () => {}
});

/* 리듀서 */
const attendanceReducer = handleActions(
    {
        [GET_STATUS]: (state, { payload }) => {
            
            return payload;
        },
        [GET_HISTORIES]: (state, { payload }) => {
            
            return payload;
        },
        [GET_ANNUAL]: (state, { payload }) => {

            return payload;
        },
        [PUT_STATUS]: (state, { payload }) => {

            return payload;
        }         
    },
    initialState
);

export default attendanceReducer;
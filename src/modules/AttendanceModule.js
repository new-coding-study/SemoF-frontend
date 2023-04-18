import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
// const initialState = [];
const initialState = {
    attendanceStatus: [],
    attendanceList: [],
    updateAttendance: []
};

// 초기값에 값 넣어서 애초에 언디파인드 이런거 안 뜨게끔
// 하나의 상태값을 두곳에서 동시에 써야되는데, 기존에 값이 변경되면 안 되고 같은 내용을 쓰지만 새로운 다른 값이 필요할 경우 초기값 분할하고 타입과 액션을 복사 생성해서 해결

/* 액션 */
export const GET_STATUS               = 'attendance/GET_STATUS';
export const GET_HISTORIES           = 'attendance/GET_HISTORIES';
export const PUT_STATUS            = 'attendance/PUT_STATUS';
// eslint-disable-next-line
const actions = createActions({
    [GET_STATUS]: () => {},
    [GET_HISTORIES]: () => {},
    [PUT_STATUS]: () => {}
});

/* 리듀서 */
const attendanceReducer = handleActions(
    {
        // [GET_STATUS]: (state, { payload }) => {
            
        //     return payload;
        // },
        [GET_STATUS]: (state, { payload }) => {
            
            return { ...state, attendanceStatus: payload};
        },
        [GET_HISTORIES]: (state, { payload }) => {
            
            return { ...state, attendanceList: payload};
        },
        [PUT_STATUS]: (state, { payload }) => {

            return { ...state, updateAttendance: payload};
        }       
    },
    initialState
);

export default attendanceReducer;
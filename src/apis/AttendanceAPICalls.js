import Swal from 'sweetalert2';
import { 
    GET_STATUS,
    GET_HISTORIES,
    PUT_STATUS
} from '../modules/AttendanceModule.js';

// 근태 조회
export const callAttendanceDetailAPI = ({empNo}) => {
    console.log('[AttendanceAPICalls] callSearchAttendanceAPI Call');

    console.log('[AttendanceAPICalls] :' + empNo)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/attendance/status/${empNo}`;

    console.log('[AttendanceAPICalls] :' + requestURL)
    
    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            const result = await response.json();
            console.log('[AttendanceAPICalls] callSearchAttendanceAPI RESULT : ', result);

            dispatch({ type: GET_STATUS,  payload: result.data });
        } catch (error) {
            console.log('[AttendanceAPICalls] callSearchAttendanceAPI ERROR : ', error);
        }
    };    
};

// 근태 상태 수정
export const callAttendanceUpdateAPI = ({empNo, nowTime}) => {
    console.log('[AttendanceAPICalls] callAttendanceUpdateAPI Call');
    // console.time('update') //함수 실행시간 체크

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/attendance/status/${empNo}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Accept": "*/*",
                    // "Content-Type": "application/json"
                    //"Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: nowTime
            });

            const result = await response.json();
            
            if(result.state === 500 || result.state === undefined || result.state === null){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: '기록 실패',
                    text: '출, 퇴근 기록을 확인하세요.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            if(result.status === 200){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '기록 성공',
                    showConfirmButton: false,
                    timer: 1500
                });
                // console.timeEnd('update'); //함수 실행시간 체크
                dispatch({ type: PUT_STATUS,  payload: result });
            }

            console.log('[AttendanceAPICalls] callAttendanceUpdateAPI RESULT : ', result);
        } catch (error) {
            console.log('[AttendanceAPICalls] callAttendanceUpdateAPI ERROR : ', error);
        }
    };    
}
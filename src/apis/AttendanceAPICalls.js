import Swal from 'sweetalert2';
import { 
    GET_STATUS,
    GET_HISTORIES,
    GET_ANNUAL,
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

// export const callAttendanceDetailAPI = ({empNo}) => {
//     console.log('[AttendanceAPICalls] callSearchAttendanceAPI Call');

//     console.log('[AttendanceAPICalls] :' + empNo)

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/attendance/status/${empNo}`;

//     console.log('[AttendanceAPICalls] :' + requestURL)
    
//     return async (dispatch, getState) => {
        
//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callSearchAttendanceAPI RESULT : ', result);

//         dispatch({ type: GET_STATUS,  payload: result.data });
        
//     };    
// };

// 근태 상태 수정
export const callAttendanceUpdateAPI = ({empNo}) => {
    console.log('[AttendanceAPICalls] callAttendanceUpdateAPI Call');
    // console.time('update') //함수 실행시간 체크

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/attendance/status/${empNo}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Accept": "*/*",
                    //"Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
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

// export const callAttendanceUpdateAPI = ({empNo}) => {
//     console.log('[AttendanceAPICalls] callAttendanceUpdateAPI Call');
//     console.time('update')

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/attendance/status/${empNo}`;

//     return async (dispatch, getState) => {
        

//         const result = await fetch(requestURL, {
//             method: "PUT",
//             headers: {
//                 "Accept": "*/*",
//                 //"Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());
        
//         if(result.state === 500 || result.state === undefined || result.state === null){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '잘못된 접근입니다. (출, 퇴근)',
//                 showConfirmButton: false,
//                 timer: 1500
//             })
//         }
//         if(result.status === 200){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: '정상 기록',
//                 showConfirmButton: false,
//                 timer: 1500
//             })
//             console.timeEnd('update')
//             dispatch({ type: PUT_STATUS,  payload: result });
//         }

//         // dispatch({ type: PUT_STATUS,  payload: result });

//         console.log('[AttendanceAPICalls] callAttendanceUpdateAPI RESULT : ', result);
        
//     };    
// }

// 근태 전체조회
// export const callAttendanceListAPI = ({currentPage}) => {
    
//     let requestURL;

//     if(currentPage !== undefined || currentPage !== null){
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance?offset=${currentPage}`;
//     }else {
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance`;
//     }
    
//     console.log('[AttendanceAPICalls] requestURL : ', requestURL);

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceAPI RESULT : ', result);
//             dispatch({ type: GET_STICKERS,  payload: result.data });
//         }
        
//     };
// }

// // 근태 상세조회
// export const callAttendanceDetailAPI = ({attendanceCode}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/${attendanceCode}`;

//     return async (dispatch, getState) => {


//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             }
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callAttendanceDetailAPI RESULT : ', result);
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceDetailAPI SUCCESS');
//             dispatch({ type: GET_STICKER,  payload: result.data });
//         }
        
        
//     };
// }

// // 관리자용 근태 리스트 조회
// export const callAttendanceListForAdminAPI = ({currentPage}) => {
//     let requestURL;

//     if(currentPage !== undefined || currentPage !== null){
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management?offset=${currentPage}`;
//     }else {
//         requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management`;
//     }
    
//     console.log('[AttendanceAPICalls] requestURL : ', requestURL);

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceListForAdminAPI RESULT : ', result);
//             dispatch({ type: GET_STICKERS,  payload: result.data });
//         }
        
//     };
// }

// // 관리자용 근태 상세조회
// export const callAttendanceDetailForAdminAPI = ({attendanceCode}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management/${attendanceCode}`;

//     return async (dispatch, getState) => {


//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callAttendanceDetailAPI RESULT : ', result);
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceDetailAPI SUCCESS');
//             dispatch({ type: GET_STICKER,  payload: result.data });
//         }
//     };
// }

// // 관리자용 근태 등록
// export const callAttendanceRegistAPI = ({form}) => {
//     console.log('[AttendanceAPICalls] callAttendanceRegistAPI Call');

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "POST",
//             headers: {
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             },
//             body: form
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callAttendanceRegistAPI RESULT : ', result);

//         dispatch({ type: POST_STICKER,  payload: result });
        
//     };    
// }

// // 관리자용 근태 삭제
// export const callAttendanceDeleteAPI = ({attendanceCode}) => {
//     console.log('[AttendanceAPICalls] callAttendanceDeleteAPI Call');

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management/${attendanceCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callAttendanceDeleteAPI RESULT : ', result);

//         dispatch({ type: DELETE_STICKER,  payload: result });
        
//     };    
// }

// // 관리자용 근태 수정
// export const callAttendanceUpdateAPI = ({form}) => {
//     console.log('[AttendanceAPICalls] callAttendanceUpdateAPI Call');
    
//     const attendanceCode = form.get('attendanceCode')     // # formData에 있는 값을 가져올땐 .get메소드로 가져옴

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance-management/${attendanceCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "PUT",
//             headers: {
//                 "Accept": "*/*",
//                 "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
//             },
//             body: form
//         })
//         .then(response => response.json());

//         console.log('[AttendanceAPICalls] callAttendanceUpdateAPI RESULT : ', result);

//         dispatch({ type: PUT_STICKER,  payload: result });
        
//     };    
// }

// //카테고리별 근태 목록 조회
// export const callAttendanceListAboutCategoryAPI = ({categoryCode}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/categories/${categoryCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceListAboutCategoryAPI RESULT : ', result);
//             dispatch({ type: GET_STICKERS,  payload: result.data });
//         }
        
//     };
// }

// //타입별 근태 목록 조회
// export const callAttendanceListAboutTypeAPI = ({typeCode}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/attendance/types/${typeCode}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"                
//             }
//         })
//         .then(response => response.json());
//         if(result.status === 200){
//             console.log('[AttendanceAPICalls] callAttendanceListAboutTypeAPI RESULT : ', result);
//             dispatch({ type: GET_STICKERS,  payload: result.data });
//         }
        
//     };
// }
import { GET_MEMBER, POST_LOGIN, POST_REGISTER,  POST_REG, POST_ID } from "../modules/MemberModule";



export const callGetMemberAPI = ({ memberId }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/api/v1/members/${memberId}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callGetMemberAPI RESULT : ", result);

    dispatch({ type: GET_MEMBER, payload: result });
  };
};

export const callLoginAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;
  console.log("[MemberAPICalls]", form.loginId, form.loginPwd);
  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        loginId: form.loginId,
        loginPwd: form.loginPwd,
      }),
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callLoginAPI RESULT : ", result);
    if (result.status === 200) {
      window.localStorage.setItem("accessToken", result.data.accessToken);
    }
    dispatch({ type: POST_LOGIN, payload: result });
  };
};

export const callLogoutAPI = () => {
  return async (dispatch, getState) => {
    dispatch({ type: POST_LOGIN, payload: "" });
    console.log("[MemberAPICalls] callLogoutAPI RESULT : SUCCESS");
  };
};

export const callRegisterAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/signup`;


  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify({
        loginId: form.loginId,
        loginPwd: form.loginPwd
        // ,
        // memberName: form.memberName,
        // memberEmail: form.memberEmail,
      }),
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    }
  };
};

export const callcheckIdAPI = ( loginId ) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/compare-id`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Accept: "*/*",
      },
      body:loginId,
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_ID, payload: result });
    } else{
      dispatch({ type: POST_ID, payload: result });
    }
  };
};

export const callCheckRegAPI = ( empReg ) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/find-reg`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(
        empReg
      ),
    }).then((response) => response.json());

    console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REG, payload: result });
    } else if(result.status === 500){
      dispatch({ type: POST_REG, payload: result });
    }
  };
};

// export const callcheckIdAPI = ( loginId ) => {
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/compare-id`;

//   return async (dispatch, getState) => {
//     const result = await fetch(requestURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//       },
//       body: JSON.stringify(
//         loginId
//         // loginPwd: form.loginPwd
//         // ,
//         // memberName: form.memberName,
//         // memberEmail: form.memberEmail,
//       ),
//     }).then((response) => response.json());

//     console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

//     if (result.status === 201) {
//       dispatch({ type: POST_ID, payload: result });
//     }
//   };
// };

// export const callCheckRegAPI = ( empReg ) => {
//   const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/find-reg`;

//   return async (dispatch, getState) => {
//     const result = await fetch(requestURL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "*/*",
//       },
//       body: JSON.stringify(
//         empReg
//       ),
//     }).then((response) => response.json());

//     console.log("[MemberAPICalls] callRegisterAPI RESULT : ", result);

//     if (result.status === 201) {
//       dispatch({ type: POST_REG, payload: result });
//     }
//   };
// };



// 성식 회원코드

// import Swal from 'sweetalert2';
// import { 
//     GET_MEMBER
//   , POST_LOGIN
//   , POST_REGISTER
//   , DELETE_REMOVE
// } from '../modules/MemberModule';

// // 중복조회
// export const callGetMemberAPI = ({memberId}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/members/${memberId}`;

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 // "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 
//             }
//         })
//         .then(response => response.json());

//         console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

//         dispatch({ type: GET_MEMBER,  payload: result });
        
//     };
// }

// // 로그인
// export const callLoginAPI = ({form}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/login`;
//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*",
//                 "Access-Control-Allow-Origin": "*"      
//             },
//             body: JSON.stringify({
//                 memberId: form.memberId,
//                 memberPassword: form.memberPassword
//             })
//         })
//         .then(response => response.json());

//         console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        
//         if(result.state === 400 || result.state === undefined || result.state === null){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '잘못된 아이디 또는 비밀번호입니다.',
//                 showConfirmButton: false,
//                 timer: 1500
//             })
//         }

//         if(result.status === 200){
//             window.localStorage.setItem('accessToken', result.data.accessToken);
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: '로그인 성공 !',
//                 showConfirmButton: false,
//                 timer: 1500
//             })
//         }
//         dispatch({ type: POST_LOGIN,  payload: result });
//     };
// }

// // 로그아웃
// export const callLogoutAPI = () => {
//     return async (dispatch, getState) => {            

//         dispatch({ type: POST_LOGIN,  payload: '' });        
//         console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
//         Swal.fire({
//             position: 'center',
//             icon: 'success',
//             title: '로그아웃',
//             timer: 1500,
//             showConfirmButton: false
//         })
//     };
// }

// // 회원탈퇴
// export const callMemberRemoveAPI = ({form}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/members/${form.memberId}`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "DELETE",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             },
//             body: form.memberPassword
//         })
//         .then(response => response.json());

//         console.log('[MemberAPICalls] callMemberRemoveAPI RESULT : ', result);
        
//         if(result.status === 201){
//             dispatch({ type: DELETE_REMOVE,  payload: result });
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: '회원탈퇴 성공 !',
//                 timer: 1500,
//                 showConfirmButton: false
//             })
//         } else if(result.state === 400){
//             dispatch({ type: DELETE_REMOVE,  payload: result });
//             Swal.fire({
//                 position: 'center',
//                 icon: 'question',
//                 title: '잘못된 아이디 또는 비밀번호입니다.',
//                 timer: 1500
//             })
//         } else {
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '회원탈퇴 실패',
//                 timer: 1500,
//                 showConfirmButton: false
//             })
//         }         
//     };
// }

// // 회원가입
// export const callRegisterAPI = ({form}) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/auth/members`;

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "*/*"
//             },
//             body: JSON.stringify({
//                 memberId: form.memberId,
//                 memberPassword: form.memberPassword,
//                 memberName: form.memberName,
//                 memberEmail: form.memberEmail                
//             })
//         })
//         .then(response => response.json());

//         console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
        
//         if(result.state === 401 || result.state === undefined || result.state === null){
//             Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: '회원가입 실패',
//                 timer: 1500
//             })
//         }

//         if(result.status === 201){
//             dispatch({ type: POST_REGISTER,  payload: result });
//             Swal.fire({
//                 position: 'center',
//                 icon: 'success',
//                 title: '회원가입 성공 !',
//                 timer: 1500
//             })
//         }        
//     };
// }
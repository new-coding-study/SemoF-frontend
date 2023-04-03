import {
    GET_APPROVALS
    , GET_APPROVAL
    , POST_APPROVAL
    , PUT_APPROVAL
    , DELETE_APPROVAL
    , GET_LINES
    , POST_LINE
    , PUT_LINE
    , DELETE_LINE
    , GET_FORM
    , GET_BRANCHES
    , GET_JOBS
    , POST_ORDERS
    , GET_DEPT
}from '../modules/ApprovalModule.js'

import axios from 'axios';
export const callApprovalListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/approv-list?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/approv-list`;
    }

    console.log(`[ApprovalAPICalls] requestURL: ${requestURL}`);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                // , "Access-Control-Allow-Origin": "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_APPROVALS, payload : result.data});
        }
    };
}
export const callApprovalDetailAPI = ({approvNo}) => {
    const requestURL = `http://localhost:8090/approval/${approvNo}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*",
                "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log(`[ApprovalAPICalls] callApprovalDetailAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_APPROVAL, payload : result.data});
        }
    };
}

export const callApprovRegistAPI = ({form}) => {
    console.log('[ApprovalAPICalls] callApprovRegistAPI Call');

    const requestURL = `http://localhost:8090/approvals/approval`;
    
    return async (dispatch, getState) => {
        try {
          const response = await axios.post(requestURL, form, {
            headers: {
              "Accept": "*/*",
              "Content-Type": `multipart/form-data`,
            },
          });
    
          const result = response.data;
          console.log("[ApprovalAPICalls] callApprovRegistAPI RESULT : ", result);
    
          dispatch({ type: POST_APPROVAL, payload: result });
        } catch (error) {
          console.error("[ApprovalAPICalls] callApprovRegistAPI ERROR : ", error);
        }
      };
    };
// import axios from "axios";

// export const callApprovRegistAPI = ({ form }) => {
//   console.log("[ApprovalAPICalls] callApprovRegistAPI Call");

//   const requestURL = `http://localhost:8090/approvals/approval`;

//   const formData = new FormData();
//   formData.append("approvTitle", form.approvTitle);
//   formData.append("content", form.content);

//   if (form.files) {
//     for (let i = 0; i < form.files.length; i++) {
//       formData.append("files", form.files[i]);
//     }
//   }

//   return async (dispatch, getState) => {
//     try {
//       const response = await axios.post(requestURL, formData, {
//         headers: {
//           "Accept": "*/*",
//           "Content-Type": `multipart/form-data`,
//         },
//       });

//       const result = response.data;
//       console.log("[ApprovalAPICalls] callApprovRegistAPI RESULT : ", result);

//       dispatch({ type: POST_APPROVAL, payload: result });
//     } catch (error) {
//       console.error("[ApprovalAPICalls] callApprovRegistAPI ERROR : ", error);
//     }
//   };
// };
export const callApprovModifyAPI = ({form}) => {
    console.log('[ApprovalAPICalls] callApprovModifyAPI Call');

    const requestURL = `http://localhost:8090/approval/approval`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callApprovModifyAPI RESULT : ', result);

        dispatch({ type: PUT_APPROVAL,  payload: result });
        
    };    
}

// export function callFormAPI 
export function callDeleteApprovAPI(approvNo) {
    
    console.log('[ApprovalAPICalls] callDeleteApprovAPI Call');

    const requestURL = `http://localhost:8090/approval/approval`;
    return async (dispatch, getState) => {

            const result = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            console.log('[ApprovalAPICalls] callDeleteApprovAPI RESULT : ', result);

            dispatch({ type: DELETE_APPROVAL,  payload: result });
    }
}
export const callLineListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/line-list?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/line-list`;
    }

    console.log(`[ApprovalAPICalls] requestURL: ${requestURL}`);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                // ,
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_LINES, payload : result.data});
        }
    };
}
export const callLineRegistAPI = ({form}) => {
    console.log('[ApprovalAPICalls] callLineRegistAPI Call');

    const requestURL = `http://localhost:8090/approvals/line`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*"
                ,
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                "Content-Type": "application/json"
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callLineRegistAPI RESULT : ', result);

        dispatch({ type: POST_LINE,  payload: result });
        
    };    
}

export const callLineModifyAPI = ({form}) => {
    console.log('[ApprovalAPICalls] callLineModifyAPI Call');

    const requestURL = `http://localhost:8090/approval/line`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callLineModifyAPI RESULT : ', result);

        dispatch({ type: PUT_LINE,  payload: result });
        
    };    
}

// export function callFormAPI 
export function callDeleteLineAPI(lineNo) {
    
    console.log('[ApprovalAPICalls] callDeleteLineAPI Call');

    const requestURL = `http://localhost:8090/approval/line/${lineNo}`;
    return async (dispatch, getState) => {

            const result = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            console.log('[ApprovalAPICalls] callDeleteLineAPI RESULT : ', result);

            dispatch({ type: DELETE_LINE,  payload: result });
    }
}
export const callGetFormTitleAPI = () => {
    const requestURL = `http://localhost:8090/approvals/form-title`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
                // ,
                // "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log(`[ApprovalAPICalls] callGetFormTitleAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_FORM, payload : result.data});
        }
    };
}
export const callGetBranchesAPI = () => {
    const requestURL = `http://localhost:8090/approvals/branches`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
                // ,
                // "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log(`[ApprovalAPICalls] callGetFormTitleAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_BRANCHES, payload : result.data});
        }
    };
}
export const callGetJobNEmpNameAPI = () => {
    const requestURL = `http://localhost:8090/approvals/job-name`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
                // ,
                // "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log(`[ApprovalAPICalls] callGetFormTitleAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_JOBS, payload : result.data});
        }
    };
}
export const callOrderRegistAPI = ({data}) => {
    console.log('[ApprovalAPICalls] callOrderRegistAPI Call');
  
    const requestURL = `http://localhost:8090/approvals/orders`;
  
    return async (dispatch, getState) => {
  
      const result = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Accept": "*/*"
          ,
        //   "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json());
  
      console.log('[ApprovalAPICalls] callOrderRegistAPI RESULT : ', result);
  
      dispatch({ type: POST_ORDERS,  payload: result });
          
    };    
  }
  export const callGetDeptAPI = () => {
    const requestURL = `http://localhost:8090/approvals/dept`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
                // ,
                // "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log(`[ApprovalAPICalls] callGetDeptAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_DEPT, payload : result.data});
        }
    };
}
import {
    GET_APPROVALS
    , GET_APPROVALSOUT
    , GET_APPROVAL
    , POST_APPROVAL
    , PUT_APPROVAL
    , DELETE_APPROVAL
    , GET_LINES
    , GET_LINE
    , GET_LINE_LIST
    , POST_LINE
    , PUT_LINE
    , DELETE_LINE
    , GET_FORM
    , GET_BRANCHES
    , GET_JOBS
    , POST_ORDERS
    , GET_DEPT
    , GET_STATUS
    , GET_OPINION
    , POST_OPINION
    , PUT_STATUS
    , GET_FILES
    , GET_FIN_IN
    , GET_FIN_OUT
}from "../modules/ApprovalModule"

import axios from 'axios';
export const callApprovalListAPI = ({currentPage, empNo}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/approv-in/${empNo}?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/approv-in/${empNo}`;
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
export const callApprovOutListAPI = ({currentPage, empNo}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/approv-out/${empNo}?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/approv-out/${empNo}`;
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
            dispatch({type:GET_APPROVALSOUT, payload : result.data});
        }
    };
}
export const callApprovalDetailAPI = (approvNo) => {
    console.log("api로 잘왔는지", approvNo);
    console.log(typeof(approvNo));
    const requestURL = `http://localhost:8090/approvals/approval/${approvNo}`;
    console.log(requestURL);
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type":"application/json",
                "Accept":"*/*"
                ,"Access-Control-Allow-Origin": "*"
                // "Authorization": "Bearer"+window.localStorage.getItem("accessToken")
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

export const callApprovRegistAPI = ({form
    // , fileList
}) => {
    console.log('[ApprovalAPICalls] callApprovRegistAPI Call');
    // const formData = new FormData();
    // formData.append('approval', JSON.stringify(approval));
// Append each file to the form data object
// fileList.forEach((file) => {
//   formData.append('files', file);
// });
const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'; // 임의의 문자열
const headers = {
  'Content-Type': `multipart/form-data; boundary=${boundary}`,
};
// Append the approval object to the form data object

    console.log('api에서 ',form.get("approval"), form.get("fileList"));
    const requestURL = `http://localhost:8090/approvals/approval`;
    
    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
          method: "POST",
          headers: {
            // 'Content-Type': `multipart/form-data; boundary=${boundary}`,
            // "Content-Type": "application/json",
            Accept: "*/*"
          },
        //   body: JSON.stringify(form)
          body: form
        //   JSON.stringify(
            // approval
            // )
        }).then((response) => response.json());
    
        //   const result = response.data;
          console.log("[ApprovalAPICalls] callApprovRegistAPI RESULT : ", result);
    
          if (result.status === 201) {
            dispatch({ type: POST_APPROVAL, payload: result });
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
            // body: form
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

    const requestURL = `http://localhost:8090/approvals/approval`;

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

    const requestURL = `http://localhost:8090/approvals/approval/${approvNo}`;
    return async (dispatch, getState) => {

            const result = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Accept": "*/*"
                    // ,
                    // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            })
            .then(response => response.json());
            console.log('[ApprovalAPICalls] callDeleteApprovAPI RESULT : ', result);

            dispatch({ type: DELETE_APPROVAL,  payload: result });
    }
}
export const callLineListAPI = ({currentPage}) => {
    let requestURL;

    console.log("callLineListAPI Call");
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
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
                // ,
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            // const { data: { dtoList, ...restData } } = result;
            // const data = { ...restData, approvOrderDTOList: dtoList };
            dispatch({type:GET_LINE_LIST, payload : result.data});
        }
    };
}
export const callLinesAPI = () => {
    let requestURL;

    // if(currentPage !== undefined || currentPage !==null){
        // requestURL = `http://localhost:8090/approvals/line-list?offset=${currentPage}`;

    // }else{
        requestURL = `http://localhost:8090/approvals/lines`;
    // }

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
            const { data: { dtoList, ...restData } } = result;
            const data = { ...restData, approvOrderDTOList: dtoList };
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
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callLineRegistAPI RESULT : ', result);

        dispatch({ type: POST_LINE,  payload: result });
        
    };    
}

export const callLineModifyAPI = ({lineNo, form}) => {
    console.log('[ApprovalAPICalls] callLineModifyAPI Call');
   
    const requestURL = `http://localhost:8090/approvals/line/${lineNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*"
                ,"Content-Type": "application/json"
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                
            },
            body: JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callLineModifyAPI RESULT : ', result);

        dispatch({ type: PUT_LINE,  payload: result });
        
    };    
}

// export function callFormAPI 
export function callDeleteLineAPI({lineNo, form}) {
    
    console.log('[ApprovalAPICalls] callDeleteLineAPI Call');

    const requestURL = `http://localhost:8090/approvals/line/${lineNo}`;
    return async (dispatch, getState) => {

            const result = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Accept": "*/*"
                    // ,
                    // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                },
                body: JSON.stringify(form)
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
export const callLineDetailAPI = (lineNo) => {
    const requestURL = `http://localhost:8090/approvals/line/${lineNo}`;

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

        console.log(`[ApprovalAPICalls] callLineDetailAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_LINE, payload : result.data});
        }
    };
}
export const callOpinionsAPI = (approvNo) => {
    let requestURL;

    // if(currentPage !== undefined || currentPage !==null){
        // requestURL = `http://localhost:8090/approvals/line-list?offset=${currentPage}`;

    // }else{
        requestURL = `http://localhost:8090/approvals/opinions/${approvNo}`;
    // }

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
            dispatch({type:GET_OPINION, payload : result.data});
        }
    };
}
export const callRegistOpiniontAPI = ({form}) => {
    console.log('[ApprovalAPICalls] callRegistOpiniontAPI Call');
    console.log(form.get("empNo"));
    const requestURL = `http://localhost:8090/approvals/opinion`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*"
                ,
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                // "Content-Type": "application/json"
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callRegistOpiniontAPI RESULT : ', result);

        dispatch({ type: POST_OPINION,  payload: result });
        
    };    
}
export const callStatusesAPI = (approvNo) => {
    let requestURL;

    // if(currentPage !== undefined || currentPage !==null){
        // requestURL = `http://localhost:8090/approvals/line-list?offset=${currentPage}`;

    // }else{
        requestURL = `http://localhost:8090/approvals/statuses/${approvNo}`;
    // }

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
            dispatch({type:GET_STATUS, payload : result.data});
        }
    };
}
export const callHandleStatusAPI = (lineNo, approvNo, empNo, status) => {
    console.log('[ApprovalAPICalls] callHandleStatusAPI Call');
    // requestURL = `http://localhost:8090/approvals/approv-in?offset=${currentPage}`;

    const requestURL = `http://localhost:8090/approvals/state/${lineNo}/${approvNo}/${empNo}?this=${status}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Accept": "*/*"
                ,"Content-Type": "application/json"
                // "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                
            },
            body: {lineNo: lineNo, empNo : empNo , status: status}
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callHandleStatusAPI RESULT : ', result);

        dispatch({ type: PUT_STATUS,  payload: result });
        
    };    
}
export const callFilesAPI = (approvNo) => {
    let requestURL;

    // if(currentPage !== undefined || currentPage !==null){
        // requestURL = `http://localhost:8090/approvals/line-list?offset=${currentPage}`;

    // }else{
        requestURL = `http://localhost:8090/approvals/files/${approvNo}`;
    // }

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
            // const { data: { dtoList, ...restData } } = result;
            // const data = { ...restData, approvOrderDTOList: dtoList };
            dispatch({type:GET_FILES, payload : result.data});
        }
    };
}
export const callFinInListAPI = ({currentPage, empNo}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/fin-approv/${empNo}?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/fin-approv/${empNo}`;
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
            dispatch({type:GET_FIN_IN, payload : result.data});
        }
    };
}
export const callFinOutListAPI = ({currentPage, empNo}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approvals/fin-approv-out/${empNo}?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approvals/fin-approv-out/${empNo}`;
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
            dispatch({type:GET_FIN_OUT, payload : result.data});
        }
    };
}
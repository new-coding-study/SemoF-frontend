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
}from '../modules/ApprovalModule.js'

export const callApprovalListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/approval/approv-list?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approval/approv-list`;
    }

    console.log(`[ApprovalAPICalls] requestURL: ${requestURL}`);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
                // ,
                // "Access-Control-Allow-Origin": "*"
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

    const requestURL = `http://localhost:8090/approval/approval`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[ApprovalAPICalls] callApprovRegistAPI RESULT : ', result);

        dispatch({ type: POST_APPROVAL,  payload: result });
        
    };    
}

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
        requestURL = `http://localhost:8090/approval/line-list?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/approval/line-list`;
    }

    console.log(`[ApprovalAPICalls] requestURL: ${requestURL}`);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
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

    const requestURL = `http://localhost:8090/approval/line`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
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
export const callGetFormTitleAPI = ({formCode}) => {
    const requestURL = `http://localhost:8090/approval/${formCode}`;

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

        console.log(`[ApprovalAPICalls] callGetFormTitleAPI`);
        if(result.status === 200){
            console.log(`[ApprovalAPICalls] result = ${result}`);
            dispatch({type:GET_FORM, payload : result.data});
        }
    };
}
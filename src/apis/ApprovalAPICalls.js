import {
    GET_APPROVALS
}from '../modules/ApprovalModule.js'

export const callApprovalListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !==null){
        requestURL = `http://localhost:8090/semof/approval/inbox?offset=${currentPage}`;

    }else{
        requestURL = `http://localhost:8090/semof/approval/inbox`;
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
            dispatch({type:GET_APPROVALS, payload : result.data});
        }
    };
}
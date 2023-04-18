import{
    GET_MEETING_ALLFORADMIN,
    GET_MEETING_NFORADMIN,
    GET_MEETING_YFORADMIN,
    GET_MEETING_ALLFOREMP,
    GET_MEETING_NFOREMP,
    GET_MEETING_YFOREMP,
    GET_DETAIL_ADMIN,
    GET_DETAIL_EMP,
    POST_MEETING_FOREMP,
    PUT_MEETING_FORADMIN,
    PUT_MEETING_FOREMP,
    DELETE_MEETING_FORADMIN,
    DELETE_MEETING_FOREMP
} from "../modules/MeetingModule";

export const callMeetingAllListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-lists-admin`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_ALLFORADMIN, payload: result.data});
        };
    }
};

export const callMeetingNListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-n-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-n-lists-admin`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_NFORADMIN, payload: result.data});
        };
    }
};

export const callMeetingYListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-y-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-y-lists-admin`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_YFORADMIN, payload: result.data});
        };
    }
};

export const callMeetingAllListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-lists-emp/${empNo}/?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-lists-emp`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_ALLFOREMP, payload: result.data});
        };
    }
};

export const callMeetingNListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-n-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-n-lists-emp`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_NFOREMP, payload: result.data});
        };
    }
};

export const callMeetingYListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/meeting-y-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/meeting-y-lists-emp`;
    }

    console.log('영업보고서 목록 조회')

    return async(dispatch, getstate) => {
        const result = await fetch(requestURL, {
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin" : "*"
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log(result);
            dispatch({type: GET_MEETING_YFOREMP, payload: result.data});
        };
    }
};

export const callMeetingDetailForAdmin = ({meetingReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/meeting-detail-admin/${meetingReportCode}`;

    console.log('보고서 상세조회')

    return async (dispatch, getState) =>{
        const result = await fetch (requestURL,{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Accept":"*/*"
            }
        })
        .then(response => response.json());
        console.log(result);

        if(result.status === 200){
            console.log('상세조회 완료');
            dispatch({type:GET_DETAIL_ADMIN, payload: result.data})
        }
    }; 
};

export const callMeetingDetailForEmp = ({meetingReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/trip-detail-emp/${meetingReportCode}`;

    console.log('보고서 상세조회')

    return async (dispatch, getState) =>{
        const result = await fetch (requestURL,{
            method: "GET",
            headers: {
                "Content-type":"application/json",
                "Accept":"*/*"
            }
        })
        .then(response => response.json());
        console.log(result);

        if(result.status === 200){
            console.log('상세조회 완료');
            dispatch({type:GET_DETAIL_EMP, payload: result.data})
        }
    }; 
};

export const callRegistMeeting = ({form}) =>{
    const requestURL = `http://localhost:8090/reports/meeting-lists-emp`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"      
            },
            body: JSON.stringify({
                meetingDate:form.meetingDate,
                empNo:form.empNo,
                location:form.location,
                participants:form.participants,
                meetingReportTitle:form.meetingReportTitle,
                meetingReportContent:form.meetingReportContent,
                nextMeetingPlan:form.nextMeetingPlan,
                conclusion:form.conclusion
            })
        })
        .then (response => response.json());
   
        if(result.status === 201){
            console.log(result)
        dispatch({ type: POST_MEETING_FOREMP,  payload: result });
        }
  
    }
};

export const callUpdateMeetingForAdmin = ({form, meetingReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/meeting-lists-admin/${meetingReportCode}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",      
            },
            body: JSON.stringify({
                reportComment:form.reportComment,
                empNo:form.empNo
            })
        })
        .then (response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result)
        dispatch({ type: PUT_MEETING_FORADMIN,  payload: result });
        }
    }
};

export const callUpdateMeetingForEmp = ({form, meetingReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/meeting-lists-emp/${meetingReportCode}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",      
            },
            body: JSON.stringify({
                meetingDate:form.meetingDate,
                location:form.location,
                meetingReportTitle:form.meetingReportTitle,
                meetingReportContent: form.meetingReportContent,
                conclusion: form.conclusion,
                nextMeetingPlan: form.nextMeetingPlan
            })
        })
        .then (response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result)
        dispatch({ type: PUT_MEETING_FOREMP,  payload: result });
        }
    }
};

// export const callDeleteSalesForAdmin = ({salesReportCode}) => {
//     const requestURL = `http://localhost:8090/reports/sales-lists-admin/${salesReportCode}`;

//     return async(dispatch, getState) => {
//         const result = await fetch(requestURL,{
//             method: "DELETE",
//             headers:{
//                 "Accept":"*/*",
//                 "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());
//         dispatch({type:DELETE_SALES_FORADMIN, payload: result})
//     }
// }

export const callDeleteMeeting = ({meetingReportCode}) => {
    const requestURL = `http://localhost:8090/reports/meeting-lists-emp/${meetingReportCode}`;
    console.log(requestURL);

    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers:{
                "Accept":"*/*",
                "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result);
            dispatch({type:DELETE_MEETING_FOREMP, payload: result})
        }
    }
}


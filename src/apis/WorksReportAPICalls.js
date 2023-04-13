import{
    GET_WORKS_ALLFORADMIN,
    GET_WORKS_NFORADMIN,
    GET_WORKS_YFORADMIN,
    GET_WORKS_ALLFOREMP,
    GET_WORKS_NFOREMP,
    GET_WORKS_YFOREMP,
    GET_DETAIL_ADMIN,
    GET_DETAIL_EMP,
    POST_WORKS_FOREMP,
    PUT_WORKS_FORADMIN,
    PUT_WORKS_FOREMP,
    DELETE_WORKS_FORADMIN,
    DELETE_WORKS_FOREMP
} from "../modules/WorksModule";

export const callWorksAllListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-lists-admin`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_ALLFORADMIN, payload: result.data});
        };
    }
};

export const callWorksNListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-n-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-n-lists-admin`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_NFORADMIN, payload: result.data});
        };
    }
};

export const callWorksYListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-y-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-y-lists-admin`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_YFORADMIN, payload: result.data});
        };
    }
};

export const callWorksAllListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-lists-emp/${empNo}/?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-lists-emp`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_ALLFOREMP, payload: result.data});
        };
    }
};

export const callWorksNListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-n-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-n-lists-emp`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_NFOREMP, payload: result.data});
        };
    }
};

export const callWorksYListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/works-y-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/works-y-lists-emp`;
    }

    console.log('업무보고서 목록 조회')

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
            dispatch({type: GET_WORKS_YFOREMP, payload: result.data});
        };
    }
};

export const callWorksDetailForAdmin = ({worksReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/works-detail-admin/${worksReportCode}`;

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

export const callWorksDetailForEmp = ({worksReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/works-detail-emp/${worksReportCode}`;

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

export const callRegistWorks = ({form}) =>{
    const requestURL = `http://localhost:8090/reports/works-lists-emp`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"      
            },
            body: JSON.stringify({
                startDate:form.startDate,
                endDate:form.endDate,
                empNo:form.empNo,
                worksReportTitle:form.worksReportTitle,
                worksReportContent:form.worksReportContent,
                issuesImprovement:form.issuesImprovement,
                nextPlan:form.nextPlan,
                etc:form.etc,
                conclusion:form.conclusion
            })
        })
        .then (response => response.json());
        console.log("[WorksReportAPICalls] callRegistWorks RESULT : ", result);
        if(result.status === 201){
            console.log(result)
        dispatch({ type: POST_WORKS_FOREMP,  payload: result });
        }
  
    }
};

export const callUpdateWorksForAdmin = ({form, worksReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/works-lists-admin/${worksReportCode}`;

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
        dispatch({ type: PUT_WORKS_FORADMIN,  payload: result });
        }
    }
};

export const callUpdateWorksForEmp = ({form, worksReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/works-lists-emp/${worksReportCode}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",      
            },
            body: JSON.stringify({
                worksReportTitle:form.worksReportTitle,
                worksReportContent:form.worksReportContent,
                issuesImprovement: form.issuesImprovement,
                nextPlan: form.nextPlan,
                etc: form.etc,
                conclusion: form.conclusion
            })
        })
        .then (response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result)
        dispatch({ type: PUT_WORKS_FOREMP,  payload: result });
        }
    }
};

export const callDeleteWorksForAdmin = ({worksReportCode}) => {
    const requestURL = `http://localhost:8090/reports/works-lists-admin/${worksReportCode}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers:{
                "Accept":"*/*",
                "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({type:DELETE_WORKS_FORADMIN, payload: result})
    }
}

export const callDeleteWorksForEmp = ({worksReportCode}) => {
    console.log(worksReportCode)
    const requestURL = `http://localhost:8090/reports/works-lists-emp/${worksReportCode}`;
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
        dispatch({type:DELETE_WORKS_FOREMP, payload: result})
        }
    }
}


import{
    GET_SALES_ALLFORADMIN,
    GET_SALES_NFORADMIN,
    GET_SALES_YFORADMIN,
    GET_SALES_ALLFOREMP,
    GET_SALES_NFOREMP,
    GET_SALES_YFOREMP,
    GET_DETAIL_ADMIN,
    GET_DETAIL_EMP,
    POST_SALES_FOREMP,
    PUT_SALES_FORADMIN,
    PUT_SALES_FOREMP,
    DELETE_SALES_FORADMIN,
    DELETE_SALES_FOREMP
} from "../modules/SalesModule";

export const callSalesAllListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-lists-admin`;
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
            dispatch({type: GET_SALES_ALLFORADMIN, payload: result.data});
        };
    }
};

export const callSalesNListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-n-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-n-lists-admin`;
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
            dispatch({type: GET_SALES_NFORADMIN, payload: result.data});
        };
    }
};

export const callSalesYListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-y-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-y-lists-admin`;
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
            dispatch({type: GET_SALES_YFORADMIN, payload: result.data});
        };
    }
};

export const callSalesAllListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-lists-emp/${empNo}/?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-lists-emp`;
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
            dispatch({type: GET_SALES_ALLFOREMP, payload: result.data});
        };
    }
};

export const callSalesNListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-n-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-n-lists-emp`;
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
            dispatch({type: GET_SALES_NFOREMP, payload: result.data});
        };
    }
};

export const callSalesYListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/sales-y-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/sales-y-lists-emp`;
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
            dispatch({type: GET_SALES_YFOREMP, payload: result.data});
        };
    }
};

export const callSalesDetailForAdmin = ({salesReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/sales-detail-admin/${salesReportCode}`;

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

export const callSalesDetailForEmp = ({salesReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/sales-detail-emp/${salesReportCode}`;

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

export const callRegistSales = ({form}) =>{
    const requestURL = `http://localhost:8090/reports/sales-lists-emp`;

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
                salesReportTitle:form.salesReportTitle,
                salesReportContent:form.salesReportContent,
                customerComment:form.customerComment,
                competitionAnalysis:form.competitionAnalysis,
                issuesImprovement:form.issuesImprovement,
                nextPlan:form.nextPlan,
                conclusion:form.conclusion
            })
        })
        .then (response => response.json());
   
        if(result.status === 201){
            console.log(result)
        dispatch({ type: POST_SALES_FOREMP,  payload: result });
        }
  
    }
};

export const callUpdateSalesForAdmin = ({form, salesReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/sales-lists-admin/${salesReportCode}`;

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
        dispatch({ type: PUT_SALES_FORADMIN,  payload: result });
        }
    }
};

export const callUpdateSalesForEmp = ({form, salesReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/sales-lists-emp/${salesReportCode}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",      
            },
            body: JSON.stringify({
                salesReportTitle:form.salesReportTitle,
                salesReportContent:form.salesReportContent,
                customerComment: form.customerComment,
                competitionAnalysis: form.competitionAnalysis,
                issuesImprovement: form.issuesImprovement,
                nextPlan:form.nextPlan,
                conclusion: form.conclusion
            })
        })
        .then (response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result)
        dispatch({ type: PUT_SALES_FOREMP,  payload: result });
        }
    }
};

export const callDeleteSalesForAdmin = ({salesReportCode}) => {
    const requestURL = `http://localhost:8090/reports/sales-lists-admin/${salesReportCode}`;

    return async(dispatch, getState) => {
        const result = await fetch(requestURL,{
            method: "DELETE",
            headers:{
                "Accept":"*/*",
                "Authorization" : "Bearer"+window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());
        dispatch({type:DELETE_SALES_FORADMIN, payload: result})
    }
}

export const callDeleteSalesForEmp = ({salesReportCode}) => {
    const requestURL = `http://localhost:8090/reports/sales-lists-emp/${salesReportCode}`;
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
        dispatch({type:DELETE_SALES_FOREMP, payload: result})
        }
    }
}


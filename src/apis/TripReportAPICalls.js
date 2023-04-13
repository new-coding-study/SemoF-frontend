import{
    GET_TRIP_ALLFORADMIN,
    GET_TRIP_NFORADMIN,
    GET_TRIP_YFORADMIN,
    GET_TRIP_ALLFOREMP,
    GET_TRIP_NFOREMP,
    GET_TRIP_YFOREMP,
    GET_DETAIL_ADMIN,
    GET_DETAIL_EMP,
    POST_TRIP_FOREMP,
    PUT_TRIP_FORADMIN,
    PUT_TRIP_FOREMP,
    DELETE_TRIP_FORADMIN,
    DELETE_TRIP_FOREMP
} from "../modules/TripModule";

export const callTripAllListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-lists-admin`;
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
            dispatch({type: GET_TRIP_ALLFORADMIN, payload: result.data});
        };
    }
};

export const callTripNListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-n-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-n-lists-admin`;
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
            dispatch({type: GET_TRIP_NFORADMIN, payload: result.data});
        };
    }
};

export const callTripYListAdminAPI = ({currentPage}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-y-lists-admin?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-y-lists-admin`;
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
            dispatch({type: GET_TRIP_YFORADMIN, payload: result.data});
        };
    }
};

export const callTripAllListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-lists-emp/${empNo}/?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-lists-emp`;
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
            dispatch({type: GET_TRIP_ALLFOREMP, payload: result.data});
        };
    }
};

export const callTripNListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-n-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-n-lists-emp`;
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
            dispatch({type: GET_TRIP_NFOREMP, payload: result.data});
        };
    }
};

export const callTripYListEmpAPI = ({currentPage, empNo}) =>{
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://localhost:8090/reports/trip-y-lists-emp/${empNo}?offset=${currentPage}`;
    } else{
        requestURL = `http://localhost:8090/reports/trip-y-lists-emp`;
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
            dispatch({type: GET_TRIP_YFOREMP, payload: result.data});
        };
    }
};

export const callTripDetailForAdmin = ({tripReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/trip-detail-admin/${tripReportCode}`;

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

export const callTripDetailForEmp = ({tripReportCode}) =>{
    
    const requestURL = `http://localhost:8090/reports/trip-detail-emp/${tripReportCode}`;

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

export const callRegistTrip = ({form}) =>{
    const requestURL = `http://localhost:8090/reports/trip-lists-emp`;

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
                destination:form.destination,
                tripReportTitle:form.tripReportTitle,
                tripReportContent:form.tripReportContent,
                issuesImprovement:form.issuesImprovement,
                conclusion:form.conclusion
            })
        })
        .then (response => response.json());
   
        if(result.status === 201){
            console.log(result)
        dispatch({ type: POST_TRIP_FOREMP,  payload: result });
        }
  
    }
};

export const callUpdateTripForAdmin = ({form, tripReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/trip-lists-admin/${tripReportCode}`;

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
        dispatch({ type: PUT_TRIP_FORADMIN,  payload: result });
        }
    }
};

export const callUpdateTripForEmp = ({form, tripReportCode}) =>{
    const requestURL = `http://localhost:8090/reports/trip-lists-emp/${tripReportCode}`;

    return async(dispatch, getState) =>{
        const result = await fetch(requestURL, {
            method:'PUT',
            headers:{
                "Content-Type": "application/json",
                "Accept": "*/*",      
            },
            body: JSON.stringify({
                startDate:form.startDate,
                endDate:form.endDate,
                destination: form.destination,
                tripReportTitle: form.tripReportTitle,
                tripReportContent: form.tripReportContent,
                issuesImprovement:form.issuesImprovement,
                conclusion: form.conclusion
            })
        })
        .then (response => response.json());
        if(result.status === 200||result.status === 201){
            console.log(result)
        dispatch({ type: PUT_TRIP_FOREMP,  payload: result });
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

export const callDeleteTrip = ({tripReportCode}) => {
    const requestURL = `http://localhost:8090/reports/trip-lists-emp/${tripReportCode}`;
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
            dispatch({type:DELETE_TRIP_FOREMP, payload: result})
        }
    }
}


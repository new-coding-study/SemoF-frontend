import {
  POST_REGISTER,
  GET_EMPLOYEES,
  SEARCH_EMPLOYEES,
} from "../modules/EmployeeModule";

export const callRegisterAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/register`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: form,
    }).then((response) => response.json());

    console.log("[RegisterAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    }
  };
};

export const callGetEmployeesAPI = ({ currentPage }) => {
  let requestURL;

  console.log("[GetEmployeesAPI] currentPage : ", currentPage);

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/all?pageNo=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/all`;
  }

  console.log("[GetEmployeesAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log(
        "[GetEmployeesAPICalls] callGetEmployeesAPI RESULT : ",
        result
      );
      console.log(
        "[GetEmployeesAPICalls] callGetEmployeesAPI RESULT DATA : ",
        result.data
      );
      dispatch({ type: GET_EMPLOYEES, payload: result.data });
    }
  };
};

export const callSearchEmployeesAPI = ({ search, searchCategory = "" }) => {
  const requestURL = `http://${
    process.env.REACT_APP_RESTAPI_IP
  }:8090/employees/present/search?${searchCategory}=${encodeURIComponent(
    search
  )}`;

  console.log("[callSearchEmployeesAPI ] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log(
      "[callSearchEmployeesAPI] callSearchEmployeesAPI RESULT : ",
      result
    );

    dispatch({ type: SEARCH_EMPLOYEES, payload: result.data });
  };
};

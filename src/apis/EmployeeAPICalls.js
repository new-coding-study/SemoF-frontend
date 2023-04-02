import {
  POST_REGISTER,
  POST_EMPLOYEES_CONTRIBUTIONS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_BRANCHES,
  GET_EMPLOYEES_DEPARTMENTS,
  GET_EMPLOYEES_CONTRIBUTION,
  GET_EMPLOYEES_CONTRIBUTIONS,
  SEARCH_EMPLOYEES,
  PUT_EMPLOYEES_BRANCHES,
  PUT_EMPLOYEES_DEPARTMENTS,
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

    console.log("[EmployeeAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    }
  };
};

export const callGetEmployeesAPI = ({ currentPage }) => {
  let requestURL;

  console.log("[EmployeeAPICalls] currentPage : ", currentPage);

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/all?pageNo=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/all`;
  }

  console.log("[EmployeeAPICalls] requestURL : ", requestURL);

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
      console.log("[EmployeeAPICalls] callGetEmployeesAPI RESULT : ", result);
      console.log(
        "[EmployeeAPICalls] callGetEmployeesAPI RESULT DATA : ",
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

  console.log("[EmployeeAPICalls ] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callSearchEmployeesAPI RESULT : ", result);

    dispatch({ type: SEARCH_EMPLOYEES, payload: result.data });
  };
};

export const callTransferBranchesAPI = ({ form }) => {
  console.log("[EmployeeAPICalls] callTransferBranchesAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/branches`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callTransferBranchesAPI RESULT : ", result);

    dispatch({ type: PUT_EMPLOYEES_BRANCHES, payload: result.data });
  };
};

export const callTransferDepartmentsAPI = ({ form }) => {
  console.log("[EmployeeAPICalls] callTransferDepartmentsAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/departments`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(form),
    }).then((response) => response.json());

    console.log(
      "[EmployeeAPICalls] callTransferDepartmentsAPI RESULT : ",
      result
    );

    dispatch({ type: PUT_EMPLOYEES_DEPARTMENTS, payload: result });
  };
};

export const callGetEmpBranchesAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/branches`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpBranchesAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpBranchesAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_BRANCHES, payload: result.data });
    }
  };
};

export const callGetEmpDepartmentsAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/departments`;

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
      "[EmployeeAPICalls] callGetEmpDepartmentsAPI RESULT : ",
      result
    );
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpDepartmentsAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_DEPARTMENTS, payload: result.data });
    }
  };
};

export const callEmpEvaluationAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/evaluation`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empNo: form.empNo,
        categoryNo: form.categoryNo,
        grade: form.grade,
      }),
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callEmpEvaluationAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_EMPLOYEES_CONTRIBUTIONS, payload: result });
    }
  };
};

export const callGetEmpContAPI = (empNo) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/contributions/${empNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpContAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpContAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_CONTRIBUTION, payload: result.data });
    }
  };
};

export const callGetEmpContsAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/evaluation/contributions`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpContsAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpContsAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_CONTRIBUTIONS, payload: result.data });
    }
  };
};

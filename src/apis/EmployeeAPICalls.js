import {
  POST_REGISTER,
  POST_EMPLOYEES_CONTRIBUTIONS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_BIRTH,
  GET_EMPLOYEES_BIRTHDAY,
  GET_EMPLOYEES_DETAIL,
  GET_EMPLOYEES_PHOTO,
  GET_EMPLOYEES_BRANCHES,
  GET_EMPLOYEES_DEPARTMENTS,
  GET_EMPLOYEES_CONTRIBUTION,
  GET_EMPLOYEES_CONTRIBUTIONS,
  GET_EMPLOYEES_ATTENDANCE,
  GET_EMPLOYEES_VACATION,
  GET_EMPLOYEES_CHART,
  SEARCH_EMPLOYEES,
  PUT_EMPLOYEES_BRANCHES,
  PUT_EMPLOYEES_DEPARTMENTS,
  PUT_EMPLOYEES_CONTRIBUTION,
  PUT_EMPLOYEES_INFO,
  DELETE_EMPLOYEES_CONTRIBUTION,
  DELETE_EMPLOYEES,
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

export const callGetEmployeeDetail = (empNo) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/present/${empNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmployeeDetail RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmployeeDetail SUCCESS");
      dispatch({ type: GET_EMPLOYEES_DETAIL, payload: result.data });
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

export const callGetEmpContAPI = ({ empNo }) => {
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

export const callEmpContUpdateAPI = ({ form, empNo }) => {
  console.log("[EmployeeAPICalls] callEmpContUpdateAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/evaluation/contributions/${empNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        evalContNo: form.evalContNo,
        categoryNo: form.categoryNo,
        grade: form.grade,
      }),
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] form : ", form);
    console.log("[EmployeeAPICalls] callEmpContUpdateAPI RESULT : ", result);

    dispatch({ type: PUT_EMPLOYEES_CONTRIBUTION, payload: result });
  };
};

export const callDeleteEmpContAPI = ({ empNo }) => {
  console.log("[EmployeeAPICalls] callDeleteEmpContAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/evaluation/contributions/${empNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        // "Content-Type": "application/json",
        Accept: "*/*",
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callDeleteEmpContAPI RESULT : ", result);

    dispatch({ type: DELETE_EMPLOYEES_CONTRIBUTION, payload: result.data });
  };
};

export const callUpdateEmpAPI = ({ form }) => {
  console.log("[EmployeeAPICalls] callUpdateEmpAPI Call");

  console.log(
    "[EmployeeAPICalls] callUpdateEmpAPI form " + JSON.stringify(form)
  );

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/present`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // "Content-Type": "application/json",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callUpdateEmpAPI RESULT : ", result);

    dispatch({ type: PUT_EMPLOYEES_INFO, payload: result });
  };
};

export const callRetireEmpAPI = (empNo) => {
  console.log("[EmployeeAPICalls] callRetireEmpAPI Call");

  console.log("[EmployeeAPICalls] callRetireEmpAPI empNo : " + empNo);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/present`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        empNo: empNo,
      }),
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callRetireEmpAPI RESULT : ", result);

    dispatch({ type: DELETE_EMPLOYEES, payload: result });
  };
};

export const callGetEmpPhoto = (empNo) => {
  console.log("[EmployeeAPICalls] callGetEmpPhoto Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/present/photo/${empNo}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    });

    console.log("Raw response from API:", response);
    const result = await response.json();

    console.log("Parsed response from API:", result);

    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpPhoto SUCCESS");

      console.log("[EmployeeAPICalls] callGetEmpPhoto RESULT : ", result);

      console.log("Image URL from API:", result.data);

      const imageUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employeephotos/${result.data.filePath}`;

      dispatch({ type: GET_EMPLOYEES_PHOTO, payload: imageUrl });
    }
  };
};

export const callGetEmpBirthAPI = () => {
  console.log("[EmployeeAPICalls] callGetEmpBirthAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/birthday/count`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpBirthAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpBirthAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_BIRTH, payload: result.data });
    }
  };
};

export const callGetEmpBirthdayAPI = () => {
  console.log("[EmployeeAPICalls] callGetEmpBirthdayAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/birthday`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpBirthdayAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpBirthdayAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_BIRTHDAY, payload: result.data });
    }
  };
};

export const callGetEmpAtdAPI = () => {
  console.log("[EmployeeAPICalls] callGetEmpAtdAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/attendance/today`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpAtdAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpAtdAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_ATTENDANCE, payload: result.data });
    }
  };
};

export const callGetEmpVacationAPI = () => {
  console.log("[EmployeeAPICalls] callGetEmpVacationAPI Call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/vacation`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmployeeAPICalls] callGetEmpVacationAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpVacationAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_VACATION, payload: result.data });
    }
  };
};

export const callGetEmpChartAPI = (empNo) => {
  console.log("[EmployeeAPICalls] callGetEmpChartAPI Call");

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

    console.log("[EmployeeAPICalls] callGetEmpChartAPI RESULT : ", result);
    if (result.status === 200) {
      console.log("[EmployeeAPICalls] callGetEmpChartAPI SUCCESS");
      dispatch({ type: GET_EMPLOYEES_CHART, payload: result.data });
    }
  };
};

import {
  GET_SEND_EMAIL,
  GET_SEND_EMAILS,
  GET_RECEIVE_EMAILS,
  RECEIVE_EMAIL_DETAIL,
  POST_SEND_EMAIL,
  PUT_MOVE_EMAIL,
  SEARCH_EMAILS,
} from "../modules/EmailModule.js";

export const callSendListAPI = ({ currentPage, category }) => {
  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/send/list?pageNo=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/send/list`;
  }

  console.log("[EmailAPICalls] requestURL : ", requestURL);

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
      console.log("[EmailAPICalls] callSendListAPI RESULT : ", result);
      dispatch({ type: GET_SEND_EMAILS, payload: result.data });
    }
  };
};

export const callSendEmailAPI = ({ mailNo }) => {
  console.log("[callSendEmailAPI] mailNo : ", mailNo);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/send/${mailNo}`;

  console.log("[EmailAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log("[EmailAPICalls] callSendEmailAPI RESULT : ", result);
      dispatch({ type: GET_SEND_EMAIL, payload: result.data });
    } else {
      console.error(
        "[EmailAPICalls] callSendEmailAPI failed with status: ",
        response.status
      );
    }
  };
};

export const callTakeListAPI = ({ currentPage, category }) => {
  console.log("[callTakeListAPI] currentPage : " + currentPage);

  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/lists?pageNo=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/lists/`;
  }

  console.log("[EmailAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log("Received emails count from API:", result.data.length);
      console.log("[EmailAPICalls] callTakeListAPI RESULT : ", result);
      dispatch({ type: GET_RECEIVE_EMAILS, payload: result.data });
    } else {
      console.error(
        "[EmailAPICalls] callTakeListAPI failed with status: ",
        response.status
      );
    }
  };
};

export const callReceiveEmailAPI = ({ receiveNo }) => {
  console.log("[callReceiveEmailAPI] receiveNo : ", receiveNo);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/receive/${receiveNo}`;

  console.log("[EmailAPICalls] requestURL : ", requestURL);

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
      console.log("[EmailAPICalls] callReceiveEmailAPI RESULT : ", result);
      dispatch({ type: RECEIVE_EMAIL_DETAIL, payload: result.data });
    }
  };
};

export const callPostEmailAPI = ({ form, empNo }) => {
  console.log("[EmailAPICalls] callPostEmailAPI empNo : ", empNo);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/send?empNo=${empNo}`;

  console.log("[EmailAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "application/json; charset=utf-8",
        // "Content-Type": "multipart/form-data",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("[EmailAPICalls] callPostEmailAPI RESULT : ", result);
      dispatch({ type: POST_SEND_EMAIL, payload: result.data });
    }
  };
};

export const callMoveTrashAPI = ({ mailNo, category }) => {
  console.log("[EmailAPICalls] callMoveTrashAPI Call");
  // console.log("[EmailAPICalls] mailNo : " + mailNo);
  // console.log("[EmailAPICalls] category : " + category);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/${mailNo}/${category}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmailAPICalls] callMoveTrashAPI RESULT : ", result);

    dispatch({ type: PUT_MOVE_EMAIL, payload: result.data });
  };
};

export const callGetDelteListAPI = ({ currentPage, category }) => {
  console.log(
    "[EmailAPICalls] callGetDelteListAPI currentPage : " + currentPage
  );

  let requestURL;

  if (currentPage !== undefined || currentPage !== null) {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/deleted?pageNo=${currentPage}`;
  } else {
    requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/deleted/`;
  }

  console.log("[EmailAPICalls] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log("Received emails count from API:", result.data.length);
      console.log("[EmailAPICalls] callGetDelteListAPI RESULT : ", result);
      dispatch({ type: GET_RECEIVE_EMAILS, payload: result.data });
    } else {
      console.error(
        "[EmailAPICalls] callGetDelteListAPI failed with status: ",
        response.status
      );
    }
  };
};

export const callSearchEmailsAPI = ({ searchKeyword, currentPage }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/email/search?searchKeyword=${searchKeyword}&page=${currentPage}`;

  console.log("[EmailAPICalls ] requestURL : ", requestURL);

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());

    console.log("[EmailAPICalls] callSearchEmailsAPI RESULT : ", result);

    dispatch({ type: SEARCH_EMAILS, payload: result.data });
  };
};

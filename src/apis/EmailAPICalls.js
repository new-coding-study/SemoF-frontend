import { GET_SEND_EMAIL } from "../modules/EmailModule.js";

export const callSendListAPI = ({ currentPage }) => {
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
      dispatch({ type: GET_SEND_EMAIL, payload: result.data });
    }
  };
};

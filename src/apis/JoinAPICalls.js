import { GET_MEMBER, POST_LOGIN, POST_REGISTER } from "../modules/JoinModules";

export const callJoinAPI = ({ formData }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/join`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: formData, // body에 FormData를 전달
    }).then((response) => response.json());

    console.log("[JoinAPICalls] callJoinAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    }
  };
};

import { POST_REGISTER } from "../modules/EmployeeModule";

export const callRegisterAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/employees/register`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: form, // 수정된 코드
    }).then((response) => response.json());

    console.log("[RegisterAPICalls] callRegisterAPI RESULT : ", result);

    if (result.status === 201) {
      dispatch({ type: POST_REGISTER, payload: result });
    }
  };
};

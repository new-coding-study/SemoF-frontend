import {
  GET_SCHEDULELIST,
  GET_SCHEDULE,
  POST_SCHEDULE,
  PUT_SCHEDULE,
  DELETE_SCHEDULE,
  GET_SEARCHSCHEDULE,
  GET_CALENDARLIST,
  GET_CALENDAR,
  POST_CALENDAR,
  PUT_CALENDAR,
  DELETE_CALENDAR,
  GET_CALENDARMEMLIST,
  POST_CALENDARMEM,
  DELETE_CALENDARMEM,
  GET_SCHEDULECOMMENTLIST,
  POST_SCHEDULECOMMENT,
  PUT_SCHEDULECOMMENT,
  DELETE_SCHEDULECOMMENT,
} from "../modules/ScheduleModule.js";

export const callScheduleListAPI = (empNo) => {
  // console.log("GET_SCHEDULELIST call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedulelist/${empNo}`;

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
      console.log("GET_SCHEDULELIST result : ", result);
      dispatch({ type: GET_SCHEDULELIST, payload: result.data });
    }
  };
};

export const callScheduleDetailAPI = (scdNo) => {
  // console.log("GET_SCHEDULE call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule/${scdNo}`;

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
      console.log("GET_SCHEDULE result : ", result);
      dispatch({ type: GET_SCHEDULE, payload: result.data });
    }
  };
};

export const callRegistScheduleAPI = ({ form }) => {
  // console.log("POST_SCHEDULE call");
  console.log("form", form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log("POST_SCHEDULE result : ", result);

    dispatch({ type: POST_SCHEDULE, payload: result });
  };
};

export const callUpdateScheduleAPI = ({ form }) => {
  // console.log("PUT_SCHEDULE call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log("PUT_SCHEDULE result : ", result);

    dispatch({ type: PUT_SCHEDULE, payload: result });
  };
};

export const callDeleteScheduleAPI = (scdNo) => {
  // console.log("DELETE_SCHEDULE call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule/${scdNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      // console.log("DELETE_SCHEDULE result : ", result);

      dispatch({ type: DELETE_SCHEDULE, payload: result.data });
    }
  };
};

// 검색 메소드 호출
export const callSearchTodoAPI = (searchSchedule, empNo) => {
  // console.log("GET_SEARCHSCHEDULE call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule/search?s=${searchSchedule}&e=${empNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("GET_SEARCHSCHEDULE result : ", result);
      dispatch({ type: GET_SEARCHSCHEDULE, payload: result.data });
    }
  };
};

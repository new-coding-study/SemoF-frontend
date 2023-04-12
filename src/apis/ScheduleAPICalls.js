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

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/schedule-list/${empNo}`;

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

    // console.log("POST_SCHEDULE result : ", result);

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

    // console.log("PUT_SCHEDULE result : ", result);

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
export const callSearchSchedulePI = (searchSchedule, empNo) => {
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
      // console.log("GET_SEARCHSCHEDULE result : ", result);
      dispatch({ type: GET_SEARCHSCHEDULE, payload: result.data });
    }
  };
};

export const callCalendarListAPI = (empNo) => {
  // console.log("GET_CALENDARLIST call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar-list/${empNo}`;

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
      // console.log("GET_CALENDARLIST result : ", result);
      dispatch({ type: GET_CALENDARLIST, payload: result.data });
    }
  };
};

export const callCalendarDetailAPI = (calNo) => {
  // console.log("GET_CALENDAR call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar/${calNo}`;

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
      console.log("GET_CALENDAR result : ", result);
      dispatch({ type: GET_CALENDAR, payload: result.data });
    }
  };
};

export const callRegistCalendarAPI = ({ form }) => {
  // console.log("POST_CALENDAR call");
  console.log("form", form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    // console.log("POST_CALENDAR result : ", result);

    dispatch({ type: POST_CALENDAR, payload: result });
  };
};

export const callUpdateCalendarAPI = ({ form }) => {
  // console.log("PUT_CALENDAR call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    // console.log("PUT_CALENDAR result : ", result);

    dispatch({ type: PUT_CALENDAR, payload: result });
  };
};

export const callDeleteCalendarAPI = (calNo) => {
  // console.log("DELETE_CALENDAR call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar/${calNo}`;

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
      // console.log("DELETE_CALENDAR result : ", result);

      dispatch({ type: DELETE_CALENDAR, payload: result.data });
    }
  };
};

export const callCalendarMemListAPI = (calNo) => {
  // console.log("GET_CALENDARMEMLIST call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/schedules/calendar/member/${calNo}`;

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
      // console.log("GET_CALENDARMEMLIST result : ", result);
      dispatch({ type: GET_CALENDARMEMLIST, payload: result.data });
    }
  };
};

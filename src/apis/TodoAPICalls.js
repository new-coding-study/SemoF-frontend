import {
  GET_TODAYTODOLIST,
  GET_INTENDEDTODOLIST,
  GET_CATEGORYLIST,
  GET_SEARCHTODO,
  GET_TODO,
  POST_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  POST_TODO,
  PUT_TODO,
  DELETE_TODO,
  PUT_STAR,
} from "../modules/TodoModule.js";

export const callTodayTodoListAPI = (empNo) => {
  console.log("GET_TODAYTODOLIST call");

  const requestURL = `http://localhost:8090/todos/todolist/today/${empNo}`;

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
      console.log("GET_TODAYTODOLIST result : ", result);
      dispatch({ type: GET_TODAYTODOLIST, payload: result.data });
    }
  };
};

export const callIntendedTodoListAPI = (empNo) => {
  console.log("GET_INTENDEDTODOLIST call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todolist/intended/${empNo}`;

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
      console.log("GET_INTENDEDTODOLIST result : ", result);
      dispatch({ type: GET_INTENDEDTODOLIST, payload: result.data });
    }
  };
};

export const callTodoDetailAPI = (todoNo) => {
  console.log("GET_TODO call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todo/${todoNo}`;

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
      console.log("GET_TODO result : ", result);
      dispatch({ type: GET_TODO, payload: result.data });
    }
  };
};

export const callSearchTodoAPI = (searchWord, empNo) => {
  console.log("GET_SEARCHTODO call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todo/search?s=${searchWord}&e=${empNo}`;

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
      console.log("GET_SEARCHTODO result : ", result);
      dispatch({ type: GET_SEARCHTODO, payload: result.data });
    }
  };
};

export const callCategoryListAPI = (empNo) => {
  console.log("GET_CATEGORYLIST call");

  const requestURL = `http://localhost:8090/todos/category/${empNo}`;

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
      console.log("GET_CATEGORYLIST result : ", result);
      dispatch({ type: GET_CATEGORYLIST, payload: result.data });
    }
  };
};

export const callUpdateStarAPI = (todoNo) => {
  console.log("PUT_STAR call");

  const requestURL = `http://localhost:8090/todos/star/${todoNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("PUT_STAR result : ", result);
      dispatch({ type: PUT_STAR, payload: result.data });
    }
  };
};

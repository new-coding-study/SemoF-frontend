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
  PUT_FINISH,
} from "../modules/TodoModule.js";

export const callTodayTodoListAPI = (empNo) => {
  // console.log("GET_TODAYTODOLIST call");

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
  // console.log("GET_INTENDEDTODOLIST call");

  const requestURL = `http://localhost:8090/todos/todolist/intended/${empNo}`;

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
  // console.log("GET_TODO call");

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
  // console.log("GET_SEARCHTODO call");

  console.log("searchWord", searchWord);
  console.log("empNo", empNo);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todo/search?s=${searchWord}&e=${empNo}`;

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
      console.log("GET_SEARCHTODO result : ", result);
      dispatch({ type: GET_SEARCHTODO, payload: result.data });
    }
  };
};

export const callCategoryListAPI = (empNo) => {
  // console.log("GET_CATEGORYLIST call");

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

export const callTodoRegistAPI = ({ form }) => {
  // console.log("POST_TODO call");
  // console.log("form", form);

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todo`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log("POST_TODO result : ", result);

    dispatch({ type: POST_TODO, payload: result });
  };
};

export const callTodoUpdateAPI = ({ form }) => {
  console.log("PUT_TODO call");

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8090/todos/todo`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: form,
    }).then((response) => response.json());

    console.log("PUT_TODO result : ", result);

    dispatch({ type: PUT_TODO, payload: result });
  };
};

export const callDeleteTodoAPI = (todoNo) => {
  // console.log("DELETE_TODO call");

  const requestURL = `http://localhost:8090/todos/todo/${todoNo}`;

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
      console.log("DELETE_TODO result : ", result);
      dispatch({ type: DELETE_TODO, payload: result.data });
    }
  };
};

export const callUpdateStarAPI = (todoNo, changeStar) => {
  // console.log("PUT_STAR call");

  const requestURL = `http://localhost:8090/todos/star/${todoNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: changeStar,
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("PUT_STAR result : ", result);
      dispatch({ type: PUT_STAR, payload: result.data });
    }
  };
};

export const callUpdateFinishAPI = (todoNo, changeFinish) => {
  // console.log("PUT_FINISH call");

  const requestURL = `http://localhost:8090/todos/finish/${todoNo}`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        // Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
      },
      body: changeFinish,
    }).then((response) => response.json());
    if (result.status === 200) {
      console.log("PUT_FINISH result : ", result);
      dispatch({ type: PUT_FINISH, payload: result.data });
    }
  };
};

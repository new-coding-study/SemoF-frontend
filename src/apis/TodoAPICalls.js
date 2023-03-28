import {
  GET_TODOLIST,
  GET_TODO,
  POST_CATEGORY,
  PUT_CATEGORY,
  DELETE_CATEGORY,
  POST_TODO,
  PUT_TODO,
  DELETE_TODO,
  PUT_STAR,
} from "../modules/TodoModule.js";

export const callTodoListAPI = (empNo) => {
  console.log("GET_TodoList call");

  const requestURL = `http://localhost:8090/todos/todolist/${empNo}`;

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
      console.log("GET_TodoList result : ", result);
      dispatch({ type: GET_TODOLIST, payload: result.data });
    }
  };
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { callTodayTodoListAPI } from "../../apis/TodoAPICalls";
function MainTodo({ decodedUser }) {
  const dispatch = useDispatch();

  const todayList = useSelector((state) => state.todoReducer.todayList);

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callTodayTodoListAPI(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          textAlign: "left",
        }}
      >
        <img
          src={"/images/mainTodo.png"}
          alt="이미지확인!"
          style={{
            width: "16px",
            height: "16px",
            marginRight: "8px",
            verticalAlign: "sub",
          }}
        ></img>
        <span>할 일</span>
      </div>
      {Array.isArray(todayList) &&
        todayList.map((today) => (
          <div
            style={{ display: "flex", marginTop: "12px", marginLeft: "24px" }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: today?.cateColor,
                borderRadius: "0",
                marginRight: "8px",
              }}
            >
              {" "}
            </div>
            <div
              style={{
                color: "gray",
                fontSize: "14px",
              }}
            >
              {today?.todoName}
            </div>
          </div>
        ))}
    </>
  );
}

export default MainTodo;

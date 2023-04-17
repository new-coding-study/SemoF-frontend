import { useEffect } from "react";
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
          // marginTop: "16px",
          // marginLeft: "16px",
          margin: "16px 0 20px 16px",
          textAlign: "left",
          display: "flex",
        }}
      >
        <img
          src={"/images/mainTodo.png"}
          alt="이미지확인!"
          style={{
            width: "24px",
            height: "24px",
            marginRight: "8px",
            verticalAlign: "sub",
          }}
        ></img>
        <div style={{ marginTop: "2px", fontSize: "18px" }}>할 일</div>
      </div>
      {Array.isArray(todayList) &&
        todayList.map((today) => (
          <div
            style={{ display: "flex", marginTop: "12px", marginLeft: "24px" }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: today?.cateColor,
                borderRadius: "0",
                marginRight: "8px",
              }}
            ></div>
            <div
              style={{
                color: "gray",
                fontSize: "16px",
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

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { callTodayTodoListAPI } from "../../apis/TodoAPICalls";
function MainSchedule({ decodedUser }) {
  const dispatch = useDispatch();

  const todayList = useSelector((state) => state.todoReducer.todayList);
  console.log(" 여기는 MainSchedule", todayList);

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callTodayTodoListAPI(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div> 룰루랄라</div>
    </>
  );
}

export default MainSchedule;

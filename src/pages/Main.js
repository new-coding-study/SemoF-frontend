import MainCSS from "./Main.module.css";

import BoardNoticeTop3 from "../components/main/BoardNoticeTop3";
import MainTodo from "../components/main/MainTodo";
import MainBrith from "../components/main/MainBrith";
import MainSchedule from "../components/main/MainSchedule";
import EmpInfo from "../components/main/EmpInfo";
import MainCalendar from "../components/main/MainCalendar";
import Weather from "../components/main/Weather";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utils/tokenUtils";
import AttendanceStatus from "../components/main/AttendanceStatus";

function Main() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }
  // else {
  //   navigate(`/`, { replace: true });
  // }

  return (
    <>
      <div className={MainCSS.contour}> </div>

      <div className={MainCSS.content}>
        <div className={MainCSS.firstGroup}>
          <div className={MainCSS.calendarWrapper}>
            <div className={MainCSS.calendar}>
              <MainCalendar />
            </div>
            <div className={MainCSS.schedule}>
              <MainSchedule decodedUser={decodedUser} />
            </div>
          </div>
          <div className={MainCSS.info}>
            <EmpInfo decodedUser={decodedUser} />
          </div>
        </div>
        <div className={MainCSS.secondGroup}>
          <div className={MainCSS.banner}>
            <img src={"/images/banner.png"} alt="이미지확인!"></img>
          </div>
          <div className={MainCSS.workingHour}>
            <AttendanceStatus decodedUser={decodedUser} />
          </div>
        </div>
        <div className={MainCSS.thirdGroup}>
          <Weather city="Seoul" />
          <div className={MainCSS.birth}>
            <MainBrith />
          </div>
          <div className={MainCSS.todo}>
            <MainTodo decodedUser={decodedUser} />
          </div>
          <div className={MainCSS.notice}>
            <BoardNoticeTop3 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;

import MainCSS from "./Main.module.css";
import BoardNoticeTop3 from "../components/main/BoardNoticeTop3";
import MainTodo from "../components/main/MainTodo";
import Weather from "../components/main/Weather";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../utils/tokenUtils";

function Main() {
  // const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  return (
    <>
      <div className={MainCSS.contour}> </div>

      <div className={MainCSS.content}>
        <div className={MainCSS.firstGroup}>
          <div className={MainCSS.calendarWrapper}>
            <div className={MainCSS.calendar}> 달력 </div>
            <div className={MainCSS.schedule}> 일정 </div>
          </div>
          <div className={MainCSS.info}> 사원 정보 </div>
        </div>
        <div className={MainCSS.secondGroup}>
          <div className={MainCSS.banner}>
            <img src={"/images/banner.png"} alt="이미지확인!"></img>
          </div>
          <div className={MainCSS.workingHour}> 근무시간 </div>
        </div>
        <div className={MainCSS.thirdGroup}>
          <div className={MainCSS.weather}>
            <Weather city="Seoul" />
          </div>
          <div className={MainCSS.birth}> 생일자 </div>
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

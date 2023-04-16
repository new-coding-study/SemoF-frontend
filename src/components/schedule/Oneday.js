import OnedayCSS from "./Oneday.module.css";
import ScheduleDetailModal from "./ScheduleDetailModal";
import ScheduleUpdateModal from "./ScheduleUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";

import { callScheduleListAPI } from "../../apis/ScheduleAPICalls";
import ScheduleForCalendar from "./ScheduleForCalendar";
function Oneday({
  day,
  thisMonth,
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  setDefaultDate,
}) {
  // 현재 선택된 달에 대한 정보를 가져옴
  const selectMonth = thisMonth.getMonth() + 1;
  // console.log(selectMonth);

  // 각각 넘어온 값들을 합쳐서 하나의 날짜로 만듦
  const newDate = moment(`${day.year}-${day.month}-${day.date}`).format(
    "YYYY-MM-DD"
  );

  const today = moment(new Date()).format("YYYY-MM-DD");

  // 날짜 더블클릭 시 일정 추가 창으로 넘어가게 하는 핸들러
  const ondoubleClickRegistScdHandler = () => {
    setDefaultMode(false);
    setSearchMode(false);
    setRegistMode(true);
    setDefaultDate(newDate);
  };

  return (
    <>
      <div
        className={OnedayCSS.onedayWrapper}
        style={
          day.month !== selectMonth
            ? { color: "#adadad" }
            : day.day === "일"
            ? { color: "red" }
            : day.day === "토"
            ? { color: "blue" }
            : { color: "black" }
        }
        onDoubleClick={ondoubleClickRegistScdHandler}
      >
        <div>
          {day.date}
          {/* <span style={{ display: "none" }}> {newDate} </span> */}
        </div>
        <ScheduleForCalendar
          newDate={newDate}
          setDefaultMode={setDefaultMode}
        />
      </div>
    </>
  );
}

export default Oneday;

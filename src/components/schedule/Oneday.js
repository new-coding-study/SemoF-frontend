import OnedayCSS from "./Oneday.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { callScheduleListAPI } from "../../apis/ScheduleAPICalls";
import { useEffect } from "react";
function Oneday({
  day,
  selectMonth,
  // thisMonth,
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  setDefaultDate,
}) {
  const dispatch = useDispatch();

  // 현재 선택된 달에 대한 정보를 가져옴
  // const selectMonth = thisMonth.getMonth() + 1;

  // 각각 넘어온 값들을 합쳐서 하나의 날짜로 만듦
  const newDate = moment(`${day.year}-${day.month}-${day.date}`).format(
    "YYYY-MM-DD"
  );

  const scheduleList = useSelector(
    (state) => state.scheduleReducer.scheduleList
  );

  // 날짜 더블클릭 시 일정 추가 창으로 넘어가게 하는 핸들러
  const ondoubleClickRegistScdHandler = (e) => {
    // console.log("더블클릭 이벤트 발생");
    // console.log(e.target.children[0].children[0].textContent);
    const clickDate = e.target.children[0].children[0].textContent;
    setDefaultMode(false);
    setSearchMode(false);
    setRegistMode(true);
    setDefaultDate(clickDate);
  };

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callScheduleListAPI(41));
    }, // eslint-disable-next-line
    []
  );

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
          <span style={{ display: "none" }}> {newDate} </span>
        </div>
      </div>
    </>
  );
}

export default Oneday;

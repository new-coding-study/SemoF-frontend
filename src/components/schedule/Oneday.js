import OnedayCSS from "./Oneday.module.css";
import ScheduleDetailModal from "./ScheduleDetailModal";
import ScheduleUpdateModal from "./ScheduleUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";

import { callScheduleListAPI } from "../../apis/ScheduleAPICalls";
import { useEffect } from "react";
function Oneday({
  day,
  thisMonth,
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  setDefaultDate,
}) {
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const [scheduleDetailModal, setScheduleDetailModal] = useState(false);
  const [scheduleUpdateModal, setScheduleUpdateModal] = useState(false);
  const [selectScdNo, setSelectScdNo] = useState("");

  // 현재 선택된 달에 대한 정보를 가져옴
  const selectMonth = thisMonth.getMonth() + 1;
  // console.log(selectMonth);

  // 각각 넘어온 값들을 합쳐서 하나의 날짜로 만듦
  const newDate = moment(`${day.year}-${day.month}-${day.date}`).format(
    "YYYY-MM-DD"
  );

  const today = moment(new Date()).format("YYYY-MM-DD");

  const scheduleList = useSelector(
    (state) => state.scheduleReducer.scheduleList
  );

  // 날짜 더블클릭 시 일정 추가 창으로 넘어가게 하는 핸들러
  const ondoubleClickRegistScdHandler = () => {
    setDefaultMode(false);
    setSearchMode(false);
    setRegistMode(true);
    setDefaultDate(newDate);
  };

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기! 수정완료
      dispatch(callScheduleListAPI(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  const onClickScheduleDetailHandler = (e) => {
    // console.log(e.target.children[0].textContent);
    const scdNo = e.target.children[0].textContent;
    setSelectScdNo(scdNo);
    setScheduleDetailModal(true);
  };

  return (
    <>
      {scheduleDetailModal ? (
        <ScheduleDetailModal
          selectScdNo={selectScdNo}
          setScheduleDetailModal={setScheduleDetailModal}
          setScheduleUpdateModal={setScheduleUpdateModal}
        />
      ) : null}
      {scheduleUpdateModal ? (
        <ScheduleUpdateModal
          selectScdNo={selectScdNo}
          setScheduleDetailModal={setScheduleDetailModal}
          setScheduleUpdateModal={setScheduleUpdateModal}
          setDefaultMode={setDefaultMode}
        />
      ) : null}
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
        {Array.isArray(scheduleList) &&
          scheduleList
            .filter(
              (schedule) =>
                schedule?.scdStartDay === newDate && schedule?.scdAllDay === 0
            )
            .map((schedule) => (
              <div
                className={OnedayCSS.scdWrapper}
                onClick={onClickScheduleDetailHandler}
              >
                <div
                  style={{
                    backgroundColor: schedule?.calColor,
                  }}
                  className={OnedayCSS.notAllDayCalInfo}
                ></div>
                <div>
                  {schedule?.scdName}
                  <span style={{ display: "none" }}> {schedule?.scdNo} </span>
                </div>
              </div>
            ))}
        {Array.isArray(scheduleList) &&
          scheduleList
            .filter(
              (schedule) =>
                schedule?.scdStartDay === newDate && schedule?.scdAllDay === 1
            )
            .map((schedule) => (
              <div
                className={OnedayCSS.scdAllDayWrapper}
                style={{ backgroundColor: schedule?.calColor }}
                onClick={onClickScheduleDetailHandler}
              >
                <div>
                  {schedule?.scdName}
                  <span style={{ display: "none" }}> {schedule?.scdNo} </span>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Oneday;

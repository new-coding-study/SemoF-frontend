import ScheduleForCalendarCSS from "./ScheduleForCalendar.module.css";
import ScheduleDetailModal from "./ScheduleDetailModal";
import ScheduleUpdateModal from "./ScheduleUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";

import { callScheduleListAPI } from "../../apis/ScheduleAPICalls";
function ScheduleForCalendar({ newDate, setDefaultMode }) {
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

  const scheduleList = useSelector(
    (state) => state.scheduleReducer.scheduleList
  );

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
      {Array.isArray(scheduleList) &&
        scheduleList
          .filter(
            (schedule) =>
              schedule?.scdStartDay === newDate && schedule?.scdAllDay === 0
          )
          .map((schedule) => (
            <div
              className={ScheduleForCalendarCSS.scdWrapper}
              onClick={onClickScheduleDetailHandler}
            >
              <div
                style={{
                  backgroundColor: schedule?.calColor,
                }}
                className={ScheduleForCalendarCSS.notAllDayCalInfo}
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
              className={ScheduleForCalendarCSS.scdAllDayWrapper}
              style={{ backgroundColor: schedule?.calColor }}
              onClick={onClickScheduleDetailHandler}
            >
              <div className={ScheduleForCalendarCSS.scdAllDayName}>
                {schedule?.scdName}
                <span style={{ display: "none" }}> {schedule?.scdNo} </span>
              </div>
            </div>
          ))}
    </>
  );
}

export default ScheduleForCalendar;

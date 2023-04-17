import CalendarSelectListCSS from "./CalendarSelectList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { callCalendarListAPI } from "../../apis/ScheduleAPICalls";
function CalendarSelectList({
  setVisibleCalendar,
  setSelectedCalendar,
  selectedCalendar,
  decodedUser,
}) {
  const dispatch = useDispatch();

  const calendarList = useSelector(
    (state) => state.scheduleReducer.calendarList
  );

  const onClickSelectedCalHandler = (e) => {
    console.log(e.target.textContent); // 모든 정보 다 출력
    console.log(e.target.children);
    // console.log(e.target.children[1]);
    // console.log(e.target.children[3]);

    const calendarInfo = e.target.textContent;

    const calendar = calendarInfo.split(" ");

    console.log(calendar);
    const selectCalendarNo = calendar[1];
    const selectCalendarColor = calendar[2];
    const selectCalendarName = calendar[3];

    setSelectedCalendar({
      ...selectedCalendar,
      calNo: selectCalendarNo,
      calColor: selectCalendarColor,
      calName: selectCalendarName,
    });
    setVisibleCalendar(false);
  };

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCalendarListAPI(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={CalendarSelectListCSS.wrapper}>
        {calendarList?.map((calendar) => (
          <div
            className={CalendarSelectListCSS.calWrapper}
            key={calendar?.calNo}
            onClick={onClickSelectedCalHandler}
          >
            <div
              className={CalendarSelectListCSS.calColorBox}
              style={{
                backgroundColor: calendar?.calColor,
              }}
            ></div>
            <div className={CalendarSelectListCSS.calName}>
              <div style={{ display: "none" }}> {calendar?.calNo}</div>
              <div style={{ display: "none" }}> {calendar?.calColor} </div>
              {calendar?.calName}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarSelectList;

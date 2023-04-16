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
    // console.log(e.target);
    // console.log(e.target.children[0].textContent);
    // console.log(e.target.children[1].textContent);
    console.log(e.target.children[3].textContent);

    const selectCalendarNo = e.target.children[0].textContent;
    const selectCalendarColor = e.target.children[1].textContent;
    const selectCalendarName = e.target.children[3].textContent;

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
            <div style={{ display: "none" }}> {calendar?.calNo}</div>
            <div style={{ display: "none" }}> {calendar?.calColor}</div>
            <div
              className={CalendarSelectListCSS.calColorBox}
              style={{
                backgroundColor: calendar?.calColor,
              }}
            ></div>
            <div className={CalendarSelectListCSS.calName}>
              {calendar?.calName}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarSelectList;

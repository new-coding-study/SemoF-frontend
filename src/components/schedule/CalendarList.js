import CalendaListCSS from "./CalendarList.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CalendarList({
  calendar,
  setDefaultMode,
  setSearchMode,
  setSelectCalendarNo,
}) {
  const dispatch = useDispatch();

  const onClickMoveToSettingPageHandler = () => {
    setSelectCalendarNo(calendar.calNo);
    setDefaultMode(false);
    setSearchMode(false);
  };

  return (
    <>
      <div className={CalendaListCSS.calendarWrapper}>
        <div className={CalendaListCSS.calendarInfowrapper}>
          <div
            className={CalendaListCSS.calColorBox}
            style={{ backgroundColor: calendar.calColor }}
          ></div>
          <div className={CalendaListCSS.calName}> {calendar.calName} </div>

          <div className={CalendaListCSS.moveCalendarEditBtn}>
            <img
              src={"/images/edit.png"}
              alt="이미지확인!"
              className={CalendaListCSS.editIcon}
              onClick={onClickMoveToSettingPageHandler}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarList;

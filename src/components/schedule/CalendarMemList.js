import CalendarMemListCSS from "./CalendarMemList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { callCalendarMemListAPI } from "../../apis/ScheduleAPICalls";

function CalendarMemList({ selectCalendarNo }) {
  //   console.log(selectCalendarNo);
  const dispatch = useDispatch();

  const calendarMemList = useSelector(
    (state) => state.scheduleReducer.calendarMemList
  );

  useEffect(
    () => {
      dispatch(callCalendarMemListAPI(selectCalendarNo));
    }, // eslint-disable-next-line
    [selectCalendarNo]
  );

  return (
    <>
      <div className={CalendarMemListCSS.calMem}> 소속 멤버 </div>
      {Array.isArray(calendarMemList) &&
        calendarMemList.map((calendarMember) => (
          <div
            key={calendarMember.memEmpNo}
            className={CalendarMemListCSS.calMemList}
          >
            <div
              className={CalendarMemListCSS.calMemName}
              style={{
                fontSize: "16px",
                marginBottom: "4px",
              }}
            >
              {calendarMember?.memEmpName}
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingLeft: "4px",
              }}
            >
              이메일 출력
            </div>
          </div>
        ))}
    </>
  );
}

export default CalendarMemList;

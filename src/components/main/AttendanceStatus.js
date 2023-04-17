import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainCSS from "../../pages/Main.module.css";

import { callAttendanceDetailAPI } from "../../apis/AttendanceAPICalls";

function AttendanceStatus({ decodedUser }) {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.AttendanceReducer.attendanceStatus);

  //시간기준
  let con = new Date(status.atdDate === null ? new Date() : status.atdDate)
  let condition = con.getHours() < 12 ? "AM" : "PM";
  
  //요일
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let day = week[String(con.getDay()).toUpperCase()]
  
  //오늘
  let today = status.atdDate === null ? "" : String(status.atdDate).substring(0, 10);
  //출근시간
  let start = status.startTime === null ? "" : String(status.startTime).substring(10);
  //퇴근시간
  let end = status.endTime === null ? "" : String(status.endTime).substring(10);

  useEffect(
    () => {
      dispatch(callAttendanceDetailAPI({empNo:decodedUser}));
    }, // eslint-disable-next-line
    []
  );

  return (
    <div>
        <p className={MainCSS.attenDate}>{today}({day})</p>
        <p className={MainCSS.attenStatus}>현재 근태상태는</p>
        {status.statusName === "출근" ? <p className={MainCSS.attenSuccess}>출근 : {condition}{start}</p>
        : status.statusName === "퇴근" ? <div className={MainCSS.attenSuccess}><p>출근 : {condition}{start}</p><p>퇴근 : {condition}{end}</p></div>
        : <p className={MainCSS.attenSuccess}>공석</p>}
    </div>
  );
}

export default AttendanceStatus;

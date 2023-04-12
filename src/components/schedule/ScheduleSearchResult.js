import ScheduleSearchResultCSS from "./ScheduleSearchResult.module.css";
import moment from "moment";
// import { moment }

function ScheduleSearchResult({ scheduleSearch }) {
  console.log(scheduleSearch);

  // calColor: "#7CB342";
  // calName: "영업팀";
  // calNo: 41;
  // calendar: null;
  // madeEmpName: null;
  // madeEmpNo: null;
  // scdAllDay: 0;
  // scdContent: "영업팀 전체 회의";
  // scdEndDay: "";
  // scdEndTime: "";
  // scdName: "영업팀 전체 회의";
  // scdNo: 5;
  // scdPlace: "서울특별시 금천구 가산동 429-1";
  // scdStartDay: "2023-04-13";
  // scdStartTime: "14:00:00";
  // scdWriter: 41;
  // scdWriterName: null;

  // const test = new Date();
  // console.log(test.moment.fo);

  const scdDate = moment(scheduleSearch?.scdStartDay).format(
    "YYYY년 MM월 DD일"
  );

  const week = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열

  const scdDay = week[moment(scheduleSearch?.scdStartDay).day()];

  //   const scdStartTime = moment(new Date(scheduleSearch?.scdStartTime)).format(
  //     "hh시 mm분"
  //   );
  //   const testTiem = new Date(String(scheduleSearch?.scdStartTime));
  //   console.log("testTime ", testTiem);
  //   console.log(
  //     moment(scheduleSearch?.scdStartTime).format("YYYY:MM:dd HH:mm:ss")
  //   );

  //   console.log(scdStartTime);

  const scdTime = scheduleSearch?.scdStartTime.substr(0, 2);
  console.log("scdTime", scdTime);

  const condition = scdTime < 12 ? "오전" : "오후";

  const newScdTime = scdTime < 12 ? scdTime : scdTime - 12;

  console.log("condition", condition);
  console.log("newScdTime", newScdTime);
  // const timeFormat = scheduleSearch?.scdStartTime.padStart(2, "0")

  return (
    <>
      <div className={ScheduleSearchResultCSS.scdResultOneWrapper}>
        <div className={ScheduleSearchResultCSS.scdDate}>
          {/* {scheduleSearch?.scdStartDay} */}
          {scdDate}
        </div>
        <div className={ScheduleSearchResultCSS.scdDay}>{scdDay} </div>
        <div
          className={ScheduleSearchResultCSS.calColorWrapper}
          style={{ marginTop: "2px" }}
        >
          <div
            className={ScheduleSearchResultCSS.calColor}
            style={{ backgroundColor: scheduleSearch?.calColor }}
          ></div>
        </div>
        <div className={ScheduleSearchResultCSS.scdTime}>
          <span> {scheduleSearch?.scdStartTime} </span>
          <span> endTime </span>
        </div>
        <div className={ScheduleSearchResultCSS.scdName}>
          {scheduleSearch?.scdName}
        </div>
      </div>
    </>
  );
}

export default ScheduleSearchResult;

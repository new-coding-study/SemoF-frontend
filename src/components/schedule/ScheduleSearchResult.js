import ScheduleSearchResultCSS from "./ScheduleSearchResult.module.css";

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
  return (
    <>
      <div className={ScheduleSearchResultCSS.scdResultOneWrapper}>
        <div className={ScheduleSearchResultCSS.scdDate}>
          {scheduleSearch?.scdStartDay}
        </div>
        <div className={ScheduleSearchResultCSS.scdDay}> 요일</div>
        <div
          className={ScheduleSearchResultCSS.calColorWrapper}
          style={{ backgroundColor: scheduleSearch?.calColor }}
        >
          {/* <div style={{ backgroundColor: scheduleSearch?.calColor }}></div> */}
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

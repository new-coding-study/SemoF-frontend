import ScheduleSearchResultCSS from "./ScheduleSearchResult.module.css";
import ScheduleDetailModal from "./ScheduleDetailModal";
import ScheduleUpdateModal from "./ScheduleUpdateModal";
import moment from "moment";
import { useState } from "react";

function ScheduleSearchResult({ scheduleSearch }) {
  const [scheduleDetailModal, setScheduleDetailModal] = useState(false);
  const [scheduleUpdateModal, setScheduleUpdateModal] = useState(false);
  const [selectScdNo, setSelectScdNo] = useState("");

  // 날짜 포맷 설정
  const scdDate = moment(scheduleSearch?.scdStartDay).format(
    "YYYY년 MM월 DD일"
  );

  // 요일 정보 구하기
  const week = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열
  const scdDay = week[moment(scheduleSearch?.scdStartDay).day()];

  // 시간 출력 포맷 설정
  function changeTime(scdTime) {
    // "시"에 대한 정보만 가져옴
    const scdHour = scdTime.substr(0, 2);
    // "분"에 대한 정보만 가져옴
    const scdMinute = scdTime.substr(3, 2);
    // 24시로 되어있는 시간 정보를 12시간으로 표현
    const newScdTime =
      scdHour < 12 ? `오전 ${scdHour}시` : `오후 ${scdHour - 12}시`;
    // 분에 대한 정보가 00 이면 안보여주도록 설정
    const newScdMinute = scdMinute === "00" ? "" : `${scdMinute}분`;

    return `${newScdTime} ${newScdMinute}`;
  }

  // 오늘날짜와 비교
  function checkPast(scdDay) {
    const scdDate = moment(new Date()).format("YYYY-MM-DD");
    return scdDate <= scdDay;
  }

  const onClickScheduleDetailHandler = (scdNo) => {
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
        />
      ) : null}
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
          {/* <span> {scheduleSearch?.scdStartTime} </span> */}
          {scheduleSearch?.scdStartTime === "" ? (
            <span> 종일 </span>
          ) : (
            <span> {changeTime(scheduleSearch?.scdStartTime)} </span>
          )}
          {scheduleSearch?.scdEndTime === "" ? null : (
            <span> ~ {changeTime(scheduleSearch?.scdEndTime)}</span>
          )}
        </div>
        <div
          className={ScheduleSearchResultCSS.scdName}
          style={
            checkPast(scheduleSearch?.scdStartDay) ? { color: "#3c4040" } : null
          }
          onClick={() => onClickScheduleDetailHandler(scheduleSearch.scdNo)}
        >
          {scheduleSearch?.scdName}
        </div>
      </div>
    </>
  );
}

export default ScheduleSearchResult;

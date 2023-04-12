import ScheduleSearchCSS from "./ScheduleSearch.module.css";
import ScheduleSearchResult from "./ScheduleSearchResult";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { callSearchSchedulePI } from "../../apis/ScheduleAPICalls";
function ScheduleSearch(searchSchedule, setDefaultMode, setSearchMode) {
  const dispatch = useDispatch();

  // 구조분해 할당으로 검색어를 꺼냄
  const searchWord = searchSchedule.searchSchedule.searchWord;

  const scheduleSearchList = useSelector(
    (state) => state.scheduleReducer.scheduleSearchList
  );

  // const day = scheduleSearchList?.map((searchResult) => {
  //   console.log(searchResult.scdStartDay);
  // })

  console.log(scheduleSearchList);

  // function getDateStr(dateStr) {
  //   var yyyyMMdd = String(dateStr);
  //   var sYear = yyyyMMdd.substring(0, 4);
  //   var sMonth = yyyyMMdd.substring(4, 6);
  //   var sDate = yyyyMMdd.substring(6, 8);

  //   var date = new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));

  //   var week = ["일", "월", "화", "수", "목", "금", "토"];
  //   return week[date.getDay()] + "요일";
  // }

  // var result = getDateStr("20210215");

  // console.log(result);

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callSearchSchedulePI(searchWord, 41));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={ScheduleSearchCSS.searchScheduleWrapper}>
        <div
          className={ScheduleSearchCSS.backToCalendar}
          // onClick={onClickbackToCalendarHandler}
        >
          <div>←</div>
          <div> 돌아가기</div>
        </div>
        <div className={ScheduleSearchCSS.searchListWrapper}>
          <div className={ScheduleSearchCSS.searchTitle}>
            <h2> "{searchWord}" </h2>
            <div> 에 대한 검색결과</div>
          </div>
          <div className={ScheduleSearchCSS.searchSchedule}>
            {Array.isArray(scheduleSearchList) &&
              scheduleSearchList.map((scheduleSearch) => (
                <ScheduleSearchResult
                  key={scheduleSearch.scdNo}
                  scheduleSearch={scheduleSearch}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleSearch;
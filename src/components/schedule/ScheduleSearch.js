import ScheduleSearchCSS from "./ScheduleSearch.module.css";
import ScheduleSearchResult from "./ScheduleSearchResult";
import { useEffect } from "react";
// import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import { callSearchSchedulePI } from "../../apis/ScheduleAPICalls";
function ScheduleSearch({ searchSchedule, setDefaultMode, setSearchMode }) {
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  // 구조분해 할당으로 검색어를 꺼냄
  const searchWord = searchSchedule.searchWord;

  const scheduleSearchList = useSelector(
    (state) => state.scheduleReducer.scheduleSearchList
  );

  const onClickbackToCalendarHandler = () => {
    setDefaultMode(true);
    setSearchMode(false);
  };

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callSearchSchedulePI(searchWord, decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={ScheduleSearchCSS.searchScheduleWrapper}>
        <div
          className={ScheduleSearchCSS.backToCalendar}
          onClick={onClickbackToCalendarHandler}
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
                  setDefaultMode={setDefaultMode}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleSearch;

import DefaultCalendarCSS from "./DefaultCalendar.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function DefaultCalendar({
  setSearchSchedule,
  searchSchedule,
  setDefaultMode,
  setSearchMode,
}) {
  const dispatch = useDispatch();

  // const [searchSchedule, setSearchSchedule] = useState({
  //   searchWord: "",
  // });

  const onSearchScheduleChangeHandler = (e) => {
    const inputSearchWord = {
      ...searchSchedule,
      [e.target.name]: e.target.value,
    };

    setSearchSchedule(inputSearchWord);
  };

  const onEnterkeyHandler = (e) => {
    if (e.key === "Enter") {
      setDefaultMode(false);
      setSearchMode(true);
    }
  };

  return (
    <>
      <div className={DefaultCalendarCSS.calendarWrapper}>
        <div className={DefaultCalendarCSS.calHeaderWrapper}>
          <div className={DefaultCalendarCSS.moveToTodayBtn}> 오늘 </div>
          <div className={DefaultCalendarCSS.calBtnWrapper}>
            <div className={DefaultCalendarCSS.moveToPreMonthBtn}> &lt; </div>
            <div className={DefaultCalendarCSS.selectYearBtn}> 2023년 </div>
            <div className={DefaultCalendarCSS.selectMonthBtn}> 4월 </div>
            <div className={DefaultCalendarCSS.moveToNextMonthBtn}> &gt; </div>
          </div>
          <div className={DefaultCalendarCSS.calSearchWrapper}>
            <img src={"/images/search_gray.png"} alt="이미지확인!"></img>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              onChange={onSearchScheduleChangeHandler}
              onKeyUp={onEnterkeyHandler}
              name="searchWord"
            />
          </div>
        </div>
        <div className={DefaultCalendarCSS.calContentWrapper}>
          <div className={DefaultCalendarCSS.calDay}></div>
        </div>
      </div>
    </>
  );
}

export default DefaultCalendar;

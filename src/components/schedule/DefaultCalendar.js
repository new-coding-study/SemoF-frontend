import DefaultCalendarCSS from "./DefaultCalendar.module.css";
import Oneday from "./Oneday";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

function DefaultCalendar({
  setSearchSchedule,
  searchSchedule,
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  setDefaultDate,
}) {
  const dispatch = useDispatch();

  // 검색어 입력 관련 핸들러
  const onSearchScheduleChangeHandler = (e) => {
    const inputSearchWord = {
      ...searchSchedule,
      [e.target.name]: e.target.value,
    };

    setSearchSchedule(inputSearchWord);
  };

  // 엔터키 클릭 시 SearchMode 로 바뀜
  const onEnterkeyHandler = (e) => {
    if (e.key === "Enter") {
      setDefaultMode(false);
      setSearchMode(true);
    }
  };

  // 처음 랜더링될 때 오늘날짜 값을 보내서 달력을 출력
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [thisMonth, setThisMonth] = useState(new Date());
  const weekDay = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(
    () => {
      getCalendar(thisMonth);
    }, // eslint-disable-next-line
    [thisMonth]
  );

  // 달력 구하기
  const getCalendar = (date) => {
    const month = date.getMonth();
    const firstDay = new Date(date.getFullYear(), month, 1).getDay();
    const lastDay = new Date(date.getFullYear(), month + 1, 0).getDate();

    const daysOfMonth = [];

    let j = 1;
    let k = 1;
    for (let i = 0; i < 42; i++) {
      if (i < firstDay) {
        daysOfMonth.push({
          year: month > 1 ? date.getFullYear() : date.getFullYear() - 1,
          month: month > 1 ? month : 12,
          date:
            month > 1
              ? new Date(
                  date.getFullYear(),
                  month,
                  -(firstDay - i) + 1
                ).getDate()
              : 31 - (firstDay - i) + 1,
          day: weekDay[i % 7],
        });
      }

      if (i >= firstDay) {
        if (j <= lastDay) {
          daysOfMonth.push({
            year: date.getFullYear(),
            month: month + 1,
            date: new Date(date.getFullYear(), month, j++).getDate(),
            day: weekDay[i % 7],
          });
        } else {
          daysOfMonth.push({
            year: month === 12 ? date.getFullYear() + 1 : date.getFullYear(),
            month: month === 12 ? 1 : month + 2,
            date: new Date(date.getFullYear(), month, k++).getDate(),
            day: weekDay[i % 7],
          });
        }
      }
    }
    setSelectedMonth(daysOfMonth);
  };

  const onClickMonthChange = (plusMinus) => {
    const newDate = new Date(thisMonth);
    // console.log(newDate.getMonth(), thisMonth.getMonth());

    switch (plusMinus) {
      case "+":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "-":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      default:
        break;
    }

    if (newDate.getMonth() === thisMonth.getMonth()) {
      newDate.setMonth(newDate.getMonth() - 1);
    }

    // console.log(newDate.getMonth(), thisMonth.getMonth());
    setThisMonth(newDate);
  };

  return (
    <>
      <div className={DefaultCalendarCSS.calendarWrapper}>
        <div className={DefaultCalendarCSS.calHeaderWrapper}>
          <div className={DefaultCalendarCSS.moveToTodayBtn}> 오늘 </div>
          <div className={DefaultCalendarCSS.calBtnWrapper}>
            <div
              className={DefaultCalendarCSS.moveToPreMonthBtn}
              // onClick={prevMonth}
              onClick={() => onClickMonthChange("-")}
            >
              &lt;
            </div>
            <div className={DefaultCalendarCSS.selectYearBtn}>
              {thisMonth.getFullYear()}년
            </div>
            <div className={DefaultCalendarCSS.selectMonthBtn}>
              {thisMonth.getMonth() + 1}월
            </div>
            <div
              className={DefaultCalendarCSS.moveToNextMonthBtn}
              // onClick={nextMonth}
              onClick={() => onClickMonthChange("+")}
            >
              &gt;
            </div>
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
          <div className={DefaultCalendarCSS.weekWrapper}>
            {Array.isArray(weekDay) &&
              weekDay.map((week, index) => <div key={index}> {week} </div>)}
          </div>

          <div className={DefaultCalendarCSS.dayWrapper}>
            {Array.isArray(selectedMonth) &&
              selectedMonth.map((day, index) => (
                <Oneday
                  key={index}
                  day={day}
                  thisMonth={thisMonth}
                  setDefaultMode={setDefaultMode}
                  setSearchMode={setSearchMode}
                  setRegistMode={setRegistMode}
                  setDefaultDate={setDefaultDate}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DefaultCalendar;

import React, { useState } from "react";
import MainCalendarCSS from "./MainCalendar.module.css";

function MainCalendar() {
  const [date, setDate] = useState(new Date());
  const [holidays, setHolidays] = useState([
    { month: 1, day: 1 }, // 신정
    { month: 3, day: 1 }, // 3.1절
    { month: 5, day: 5 }, // 어린이날
    { month: 6, day: 6 }, // 현충일
    { month: 8, day: 15 }, // 광복절
    { month: 10, day: 3 }, // 개천절
    { month: 10, day: 9 }, // 한글날
    { month: 12, day: 25 }, // 크리스마스
  ]);

  const daysInMonth = () => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = () => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  for (let i = 1; i <= daysInMonth(); i++) {
    days.push(i);
  }

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<td key={`blank-${i}`}></td>);
  }

  const isHoliday = (day) => {
    const isSunday =
      new Date(date.getFullYear(), date.getMonth(), day).getDay() === 0;
    const isHoliday = holidays.some(
      (holiday) => holiday.month === date.getMonth() + 1 && holiday.day === day
    );
    return isSunday || isHoliday;
  };

  const cells = blanks.concat(
    days.map((day) => (
      <td
        key={`day-${day}`}
        className={`${MainCalendarCSS["day-cell"]} ${
          date.getFullYear() === new Date().getFullYear() &&
          date.getMonth() === new Date().getMonth() &&
          day === new Date().getDate()
            ? MainCalendarCSS["current-day"]
            : isHoliday(day)
            ? MainCalendarCSS.holiday
            : ""
        }`}
      >
        {day}
      </td>
    ))
  );

  const rows = [];
  let cellsIndex = 0;
  while (cellsIndex < cells.length) {
    rows.push(
      <tr key={`row-${cellsIndex}`}>
        {cells.slice(cellsIndex, cellsIndex + 7)}
      </tr>
    );
    cellsIndex += 7;
  }

  const prevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() - 1;
    const lastDayOfPrevMonth = new Date(year, month + 1, 0).getDate();
    const currentDate = date.getDate();
    const prevMonthDay =
      currentDate > lastDayOfPrevMonth ? lastDayOfPrevMonth : currentDate;
    setDate(new Date(year, month, prevMonthDay));
  };

  const nextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDayOfCurrentMonth = new Date(year, month, 0).getDate();
    const currentDate = date.getDate();
    const nextMonthDay =
      currentDate > lastDayOfCurrentMonth ? lastDayOfCurrentMonth : currentDate;
    setDate(new Date(year, month, nextMonthDay));
  };

  return (
    <div className={MainCalendarCSS.calendar}>
      <div className={MainCalendarCSS["month-year"]}>
        <button className={MainCalendarCSS["prev-month"]} onClick={prevMonth}>
          {"<"}
        </button>
        <span>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button className={MainCalendarCSS["next-month"]} onClick={nextMonth}>
          {">"}
        </button>
      </div>
      <table className={MainCalendarCSS.calendarTable}>
        <thead>
          <tr className={MainCalendarCSS["weekday-row"]}>
            <th className={MainCalendarCSS.weekend}>Sun</th>
            <th className={MainCalendarCSS.weekday}>Mon</th>
            <th className={MainCalendarCSS.weekday}>Tue</th>
            <th className={MainCalendarCSS.weekday}>Wed</th>
            <th className={MainCalendarCSS.weekday}>Thu</th>
            <th className={MainCalendarCSS.weekday}>Fri</th>
            <th className={MainCalendarCSS.weekday}>Sat</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
export default MainCalendar;

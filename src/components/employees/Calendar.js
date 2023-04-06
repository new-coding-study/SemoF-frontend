import React, { useState } from "react";
import CalendarCSS from "./Calendar.module.css";

function Calendar() {
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
        className={`${CalendarCSS["day-cell"]} ${
          date.getFullYear() === new Date().getFullYear() &&
          date.getMonth() === new Date().getMonth() &&
          day === new Date().getDate()
            ? CalendarCSS["current-day"]
            : isHoliday(day)
            ? CalendarCSS.holiday
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
    <div className={CalendarCSS.calendar}>
      <div className={CalendarCSS["month-year"]}>
        <button className={CalendarCSS["prev-month"]} onClick={prevMonth}>
          {"<"}
        </button>
        <span>
          {date.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button className={CalendarCSS["next-month"]} onClick={nextMonth}>
          {">"}
        </button>
      </div>
      <table className={CalendarCSS.calendarTable}>
        <thead>
          <tr className={CalendarCSS["weekday-row"]}>
            <th className={CalendarCSS.weekend}>Sun</th>
            <th className={CalendarCSS.weekday}>Mon</th>
            <th className={CalendarCSS.weekday}>Tue</th>
            <th className={CalendarCSS.weekday}>Wed</th>
            <th className={CalendarCSS.weekday}>Thu</th>
            <th className={CalendarCSS.weekday}>Fri</th>
            <th className={CalendarCSS.weekday}>Sat</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
export default Calendar;

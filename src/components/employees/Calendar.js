import React, { useState } from "react";
import "./Calendar.module.css";

function Calendar() {
  const [date, setDate] = useState(new Date());

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

  const cells = blanks.concat(
    days.map((day) => (
      <td
        key={`day-${day}`}
        className={
          date.getDate() === day &&
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
            ? "current-day"
            : ""
        }
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
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  return (
    <div className="calendar">
      <div className="month-year">
        <button className="prev-month" onClick={prevMonth}>
          &#8249;
        </button>
        {date.toLocaleString("default", { month: "long", year: "numeric" })}
        <button className="next-month" onClick={nextMonth}>
          &#8250;
        </button>
      </div>
      <table>
        <thead>
          <tr className="weekday-row">
            <th className="weekday">Sun</th>
            <th className="weekday">Mon</th>
            <th className="weekday">Tue</th>
            <th className="weekday">Wed</th>
            <th className="weekday">Thu</th>
            <th className="weekday">Fri</th>
            <th className="weekday">Sat</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Calendar;

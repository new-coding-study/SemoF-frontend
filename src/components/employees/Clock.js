import React, { useState, useEffect } from "react";
import ClockCSS from "./Clock.module.css";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentMeridiem, setCurrentMeridiem] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${formatHours(hours)}:${minutes}:${seconds}`);
      setCurrentMeridiem(getMeridiem(hours));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatHours = (hours) => {
    const formattedHours = hours % 12 || 12;
    return formattedHours.toString().padStart(2, "0");
  };

  const getMeridiem = (hours) => {
    return hours >= 12 ? "PM" : "AM";
  };

  return (
    <div className={ClockCSS.clock}>
      <h3 className={ClockCSS.title}>
        <img
          src={"/images/clock.png"}
          alt="이미지확인!"
          className={ClockCSS.logo}
        />
        현재 시간
      </h3>
      <div className={ClockCSS.time}>
        {currentTime}
        <span className={ClockCSS.separator}>:</span>
        <span className={ClockCSS.meridiem}>{currentMeridiem}</span>
      </div>
    </div>
  );
};

export default Clock;

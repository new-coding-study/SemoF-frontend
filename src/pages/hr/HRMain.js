import React, { useState } from "react";
import "./HRMain.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment"; // moment.js import

function HRMain() {
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className="header">
        <div className="title"> SMART 인사관리 </div>

        <div className="menu">
          <ul>
            <li>
              <a href="#">
                <div className="logoBox">
                  <img src={"/images/contract.png"} alt="이미지확인!" />
                </div>
                <span>사원등록</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="logoBox">
                  <img src={"/images/contract.png"} alt="이미지확인!" />
                </div>
                <span>인사평가</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="logoBox">
                  <img src={"/images/contract.png"} alt="이미지확인!" />
                </div>
                <span>근로계약</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="logoBox">
                  <img src={"/images/contract.png"} alt="이미지확인!" />
                </div>
                <span>발령관리</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="logoBox">
                  <img src={"/images/contract.png"} alt="이미지확인!" />
                </div>
                <span>조직도</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="noticeContent">
        <div className="reportCard">
          <h2>직원 현황</h2>
          <div className="status">
            <div className="attendance">
              <p>{today} 출근</p>
              <span>21명</span>
            </div>
            <div className="vacation">
              <p>휴가자</p>
              <span>5명</span>
            </div>
            <div className="birthday">
              <p>3월 생일자</p>
              <span>1명</span>
            </div>
          </div>
        </div>

        <div className="atdCard">
          <div className="atdHeader">
            <h2>근로 관리</h2>
            <p>{today}</p>
          </div>
          <div className="workload">
            <div className="overtime">
              <p>연장 근무</p>
              <span>10건</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="card"></div>
        <div className="calender">
          <Calendar onChange={onChange} value={value} />
        </div>
        <div className="card2"></div>
      </div>
    </>
  );
}

export default HRMain;

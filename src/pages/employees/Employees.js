import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeCSS from "./Employees.module.css";
import Calendar from "../../components/employees/Calendar";

function Employees() {
  const [today, setToday] = useState(new Date().toLocaleDateString());
  const [value, onChange] = useState(new Date());

  return (
    <>
      <div className={EmployeeCSS.header}>
        <div className={EmployeeCSS.title}> SMART 인사관리 </div>

        <div className={EmployeeCSS.menu}>
          <ul>
            <li>
              <Link to="/semof/employees/register">
                <span>사원관리</span>
              </Link>
            </li>
            <li>
              <Link to="/semof/employees/transfer">
                <span>사원발령</span>
              </Link>
            </li>
            <li>
              <a href="#">
                <span>사원평가</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>조직도</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={EmployeeCSS.noticeContent}>
        <div className={EmployeeCSS.reportCard}>
          <h2>직원 현황</h2>
          <div className={EmployeeCSS.status}>
            <div className={EmployeeCSS.attendance}>
              <p>{today} 출근</p>
              <span>21명</span>
            </div>
            <div className={EmployeeCSS.vacation}>
              <p>휴가자</p>
              <span>5명</span>
            </div>
            <div className={EmployeeCSS.birthday}>
              <p>3월 생일자</p>
              <span>1명</span>
            </div>
          </div>
        </div>

        <div className={EmployeeCSS.atdCard}>
          <div className={EmployeeCSS.atdHeader}>
            <h2>근로 관리</h2>
            <p>{today}</p>
          </div>
          <div className={EmployeeCSS.workload}>
            <div className={EmployeeCSS.overtime}>
              <p>연장 근무</p>
              <span>10건</span>
            </div>
          </div>
        </div>
      </div>

      <div className={EmployeeCSS.content}>
        <div className={EmployeeCSS.card}></div>
        <div className={EmployeeCSS.calender}>
          <Calendar />
        </div>
        <div className={EmployeeCSS.card2}></div>
      </div>
    </>
  );
}

export default Employees;

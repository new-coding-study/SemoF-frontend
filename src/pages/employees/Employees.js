import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeCSS from "./Employees.module.css";
import Calendar from "../../components/employees/Calendar";
import Birthday from "../../components/employees/Birthday";
import Attedance from "../../components/employees/Attendances";
import Vacation from "../../components/employees/Vacation";
import Clock from "../../components/employees/Clock";

function Employees() {
  const [today, setToday] = useState(new Date().toLocaleDateString());
  // const [value, onChange] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <>
      <div className={EmployeeCSS.header}>
        <div className={EmployeeCSS.title}> 인사 </div>

        <div className={EmployeeCSS.menu}>
          <ul>
            <li>
              <Link to="/semof/employees/management">
                <span>사원관리</span>
              </Link>
            </li>
            <li>
              <Link to="/semof/employees/transfer">
                <span>사원이동</span>
              </Link>
            </li>
            <li>
              <Link to="/semof/employees/evaluation">
                <span>사원평가</span>
              </Link>
            </li>
            <li>
              {/* <a href="#">
                <span>조직도</span>
              </a> */}
            </li>
          </ul>
        </div>
      </div>

      <div className={EmployeeCSS.noticeContent}>
        <div className={EmployeeCSS.reportCard}>
          <h2>직원 현황</h2>
          <div className={EmployeeCSS.status}>
            <div className={EmployeeCSS.vacation}>
              <div className={EmployeeCSS.box}>
                <img
                  src={"/images/vacation.png"}
                  alt="이미지확인!"
                  className={EmployeeCSS.logo}
                />
                <p>휴가자</p>
              </div>
              <div className={EmployeeCSS.textBox}>
                <Vacation />
                <span className={EmployeeCSS.count}>명</span>
              </div>
            </div>
            <div className={EmployeeCSS.attendance}>
              <div className={EmployeeCSS.box}>
                <img
                  src={"/images/bag.png"}
                  alt="이미지확인!"
                  className={EmployeeCSS.logo}
                />
                <p>{today} 출근</p>
              </div>
              <div className={EmployeeCSS.textBox}>
                <Attedance />
                <span className={EmployeeCSS.count}>명</span>
              </div>
            </div>
            <div className={EmployeeCSS.birthday}>
              <div className={EmployeeCSS.box}>
                <img
                  src={"/images/birth.png"}
                  alt="이미지확인!"
                  className={EmployeeCSS.logo}
                />
                <p>{month}월 생일자</p>
              </div>
              <div className={EmployeeCSS.textBox}>
                <Birthday />
                <span className={EmployeeCSS.count}>명</span>
              </div>
            </div>
          </div>
        </div>

        <div className={EmployeeCSS.atdCard}>
          <Clock />
          {/* <div className={EmployeeCSS.atdHeader}>
            <h2>근로 관리</h2>
            <p>{today}</p>
          </div>
          <div className={EmployeeCSS.workload}>
            <div className={EmployeeCSS.overtime}>
              <p>연장 근무</p>
              <span>10건</span>
            </div>
          </div> */}
        </div>
      </div>

      <div className={EmployeeCSS.content}>
        <div className={EmployeeCSS.card}>
          {/* <iframe
            title="키바나 총원 그래프"
            src="http://localhost:5601/app/dashboards#/view/27183f80-da9b-11ed-80f1-e5806c82133c?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          /> */}
          <iframe
            title="키바나 총원 그래프"
            src="http://localhost:5601/app/dashboards#/view/91259770-db2b-11ed-91d8-dd2d388003b8?embed=true&_g=(filters%3A!())&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          />
        </div>
        <div className={EmployeeCSS.card}>
          {/* <iframe
            title="키바나 성별 분포 그래프"
            src="http://localhost:5601/app/dashboards#/view/13f01e20-da6c-11ed-80f1-e5806c82133c?embed=true&_g=(filters%3A!())&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          /> */}
          <iframe
            title="키바나 성별 분포 그래프"
            src="http://localhost:5601/app/dashboards#/view/3a7842b0-db2b-11ed-91d8-dd2d388003b8?embed=true&_g=(filters%3A!())&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          />
        </div>
        <div className={EmployeeCSS.card}>
          {/* <iframe
            title="키바나 직급 분포 그래프"
            src="http://localhost:5601/app/dashboards#/view/b0bbb0f0-da9b-11ed-80f1-e5806c82133c?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          /> */}
          <iframe
            title="키바나 직급 분포 그래프"
            src="http://localhost:5601/app/dashboards#/view/eeb37b50-db2b-11ed-91d8-dd2d388003b8?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-30d%2Fd%2Cto%3Anow))&hide-filter-bar=true"
            height="100%"
            width="100%"
            allowFullScreen
          />
        </div>
        <div className={EmployeeCSS.calender}>
          <Calendar />
        </div>
      </div>
    </>
  );
}

export default Employees;

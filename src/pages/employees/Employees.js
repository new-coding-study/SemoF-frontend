import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeCSS from "./Employees.module.css";
import Calendar from "../../components/employees/Calendar";
import Birthday from "../../components/employees/Birthday";
import Attedance from "../../components/employees/Attendances";
import Vacation from "../../components/employees/Vacation";
import Clock from "../../components/employees/Clock";
import { decodeJwt } from "../../utils/tokenUtils";

function Employees() {
  const [today, setToday] = useState(new Date().toLocaleDateString());
  // const [value, onChange] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }
  console.log("decoded ", decoded);

  // 유저 권한 확인 함수
  const CheckRole = () => {
    if (decoded === "ROLE_ADMIN") {
      return true;
    }
  };

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
            {CheckRole() === true && (
              <li>
                <Link to="/semof/employees/transfer">
                  <span>사원이동</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/semof/employees/evaluation">
                <span>사원평가</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={EmployeeCSS.noticeContent}>
        <div className={EmployeeCSS.reportCard}>
          <h2>사원 현황</h2>
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
            src="http://localhost:5601/app/dashboards#/view/1762e770-dcc1-11ed-87e5-551937667ac7?embed=true&_g=(filters%3A!())&hide-filter-bar=true"
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
            src="http://localhost:5601/app/dashboards#/view/8beb7950-dcc0-11ed-87e5-551937667ac7?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))&hide-filter-bar=true"
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
            src="http://localhost:5601/app/dashboards#/view/66709dd0-dcf8-11ed-87e5-551937667ac7?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))&hide-filter-bar=true"
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

import NavbarCSS from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

function Navbar() {
  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }

  return (
    <>
      <div className={NavbarCSS.navWrapper}>
        <ul className={NavbarCSS.navListUl}>
          <NavLink to="/semof/board">
            <li>
              <img
                src={"/images/board.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 게시판 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/todo">
            <li>
              <img
                src={"/images/todo.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 할 일 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/attendance">
            <li>
              <img
                src={"/images/attendance.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 근태 </div>
            </li>
          </NavLink>

          {decoded === "ROLE_ADMIN" ? (
            <NavLink to="/semof/report-admin">
              <li>
                <img
                  src={"/images/report.png"}
                  alt="이미지확인!"
                  className={NavbarCSS.logo}
                ></img>
                <div> 보고서 </div>
              </li>
            </NavLink>
          ) : (
            <NavLink to="/semof/report-emp">
              <li>
                <img
                  src={"/images/report.png"}
                  alt="보고서이미지"
                  className={NavbarCSS.logo}
                />
                <div>보고서</div>
              </li>
            </NavLink>
          )}

          <NavLink to="/semof/approval">
            <li>
              <img
                src={"/images/approval.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 결재 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/vendor">
            <li>
              <img
                src={"/images/vendor.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 거래처 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/message">
            <li>
              <img
                src={"/images/message.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 메세지 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/email">
            <li>
              <img
                src={"/images/mail.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 이메일 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/schedule">
            <li>
              <img
                src={"/images/calendar.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 캘린더 </div>
            </li>
          </NavLink>

          <NavLink to="/semof/employees">
            <li>
              <img
                src={"/images/emp_evaluation.png"}
                alt="이미지확인!"
                className={NavbarCSS.logo}
              ></img>
              <div> 인사 </div>
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

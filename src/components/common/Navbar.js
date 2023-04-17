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

  // console.log(decoded);

  return (
    <>
      <div className={NavbarCSS.navWrapper}>
        <NavLink to="/semof/employees">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/emp_evaluation.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 인사 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/email">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/mail.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 이메일 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/board">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/board.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 게시판 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/report">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/report.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 보고서 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/approval">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/approval.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 결재 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/attendance">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/attendance.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 근태 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/todo">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/todo.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 할 일 </div>
          </div>
        </NavLink>

        <NavLink to="/semof/schedule">
          <div className={NavbarCSS.oneWrapper}>
            <img
              src={"/images/calendar.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 캘린더 </div>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;

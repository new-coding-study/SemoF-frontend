import NavbarCSS from "./Navbar.module.css";

function Navbar() {
  return (
    <>
      <div className={NavbarCSS.navWrapper}>
        <ul className={NavbarCSS.navListUl}>
          <li>
            <img
              src={"/images/board.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 게시판 </div>
          </li>
          <li>
            <img
              src={"/images/todo.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 할 일 </div>
          </li>
          <li>
            <img
              src={"/images/attendance.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 근태 </div>
          </li>
          <li>
            <img
              src={"/images/report.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 보고서 </div>
          </li>
          <li>
            <img
              src={"/images/approval.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 결재 </div>
          </li>
          <li>
            <img
              src={"/images/vendor.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 거래처 </div>
          </li>
          <li>
            <img
              src={"/images/message.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 메세지 </div>
          </li>
          <li>
            <img
              src={"/images/mail.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 이메일 </div>
          </li>
          <li>
            <img
              src={"/images/calendar.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 캘린더 </div>
          </li>
          <li>
            <img
              src={"/images/emp_evaluation.png"}
              alt="이미지확인!"
              className={NavbarCSS.logo}
            ></img>
            <div> 인사관리 </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;

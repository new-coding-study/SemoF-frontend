import HeaderCSS from "./Header.module.css";
import SearchEmp from "./SearchEmp";
import InfoEmp from "./InfoEmp";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callGetEmployeeDetail,
  callGetEmpPhoto,
} from "../../apis/EmployeeAPICalls";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickLogoHandler = () => {
    // 로고 클릭시 메인 페이지로 이동
    navigate("/semof", { replace: true });
  };

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
    decodedUser = temp.empNo;
  }

  // 권한 정보
  // console.log("header - decoded", decoded);

  return (
    <>
      <div className={HeaderCSS.headerWrapper}>
        <div className={HeaderCSS.headerContent}>
          <img
            src={"/images/logo.png"}
            alt="이미지확인!"
            className={HeaderCSS.logo}
            onClick={onClickLogoHandler}
          ></img>
          <div>
            {location.pathname === "/semof" ? (
              <SearchEmp />
            ) : (
              <InfoEmp decodedUser={decodedUser} />
            )}
          </div>
        </div>
        {/* <div className={HeaderCSS.headerBar}> </div> */}
      </div>
    </>
  );
}

export default Header;

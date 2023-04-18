import HeaderCSS from "./Header.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callGetEmployeeDetail,
  callGetEmpPhoto,
} from "../../apis/EmployeeAPICalls";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
function InfoEmp({ decodedUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeDetail = useSelector((state) => state.empReducer);
  const empPhoto = useSelector((state) => state.empReducer.empPhoto);

  useEffect(
    () => {
      dispatch(callGetEmployeeDetail(decodedUser));
      dispatch(callGetEmpPhoto(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  const onClickLogoutHandler = () => {
    Swal.fire({
      title: "로그아웃하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "아니오",
      confirmButtonText: "예",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.removeItem("accessToken");
        dispatch(callLogoutAPI());

        Swal.fire({
          title: "로그아웃되었습니다.",
          timer: 1500,
          showConfirmButton: false,
        }).then(
          navigate(`/`, { replace: true })
          // window.location.reload()
        );
      }
    });
  };

  return (
    <>
      <div className={HeaderCSS.infoWrapper}>
        {/* <img
          src={"/images/bell.png"}
          alt="이미지확인!"
          // className={HeaderCSS.logo}
          // onClick={onClickLogoHandler}
        ></img> */}
        <div className={HeaderCSS.empName}> <strong>{employeeDetail?.empName}</strong> 님 </div>
        <button onClick={onClickLogoutHandler}>로그아웃</button>
        <div className={HeaderCSS.empImgWrapper}>
          {empPhoto?.imageUrl ? (
            <img src={empPhoto?.imageUrl} alt="이미지확인!"></img>
          ) : (
            <img src={"/images/profileImg.png"} alt="이미지확인!"></img>
          )}
        </div>
      </div>
    </>
  );
}

export default InfoEmp;

import EmpInfoCSS from "./EmpInfo.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callGetEmployeeDetail,
  callGetEmpPhoto,
} from "../../apis/EmployeeAPICalls";
import { callLogoutAPI } from "../../apis/MemberAPICalls";
function EmpInfo({ decodedUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employeeDetail = useSelector((state) => state.empReducer);
  const empPhoto = useSelector((state) => state.empReducer.empPhoto);

  const [mailMode, setMailMode] = useState(true);

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

  useEffect(
    () => {
      dispatch(callGetEmployeeDetail(decodedUser));
      dispatch(callGetEmpPhoto(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={EmpInfoCSS.infoWrapper}>
        <div className={EmpInfoCSS.empImgWrapper}>
          {empPhoto?.imageUrl ? (
            <img src={empPhoto?.imageUrl} alt="이미지확인!"></img>
          ) : (
            <img src={"/images/profileImg.png"} alt="이미지확인!"></img>
          )}
        </div>
        <div className={EmpInfoCSS.empNameWrapper}>
          <div className={EmpInfoCSS.empName}>{employeeDetail?.empName}</div>
          <div className={EmpInfoCSS.empDeptInfo}>
            {employeeDetail?.deptName} / {employeeDetail?.jobName}
          </div>
        </div>
        <div className={EmpInfoCSS.logoutBtn} onClick={onClickLogoutHandler}>
          로그아웃
        </div>
      </div>
      <div className={EmpInfoCSS.moveTabBtn}>
        <div
          className={EmpInfoCSS.mailList}
          style={
            mailMode ? { borderBottom: "none", backgroundColor: "white" } : null
          }
          onClick={() => setMailMode(!mailMode)}
        >
          메일
        </div>
        <div
          className={EmpInfoCSS.approvalList}
          style={
            mailMode ? null : { borderBottom: "none", backgroundColor: "white" }
          }
          onClick={() => setMailMode(!mailMode)}
        >
          결재
        </div>
      </div>
      <div className={EmpInfoCSS.alarmWrapper}>
        {mailMode ? "메일리스트조회" : "결재리스트조회"}
      </div>
    </>
  );
}

export default EmpInfo;

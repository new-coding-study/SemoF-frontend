import { useEffect } from "react";
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
      <div
        style={{
          display: "flex",
          marginTop: "24px",
          paddingBottom: "12px",
          alignItems: "center",
          borderRadius: "0",
          borderBottom: "1px solid gray",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 24px",
            borderRadius: "100%",
            border: "1px solid gray",
            overflow: "hidden",
          }}
        >
          {empPhoto?.imageUrl ? (
            <img
              src={empPhoto?.imageUrl}
              alt="이미지확인!"
              style={{
                width: "60px",
                height: "60px",
                marginTop: "8px",
                objectFit: "contain",
              }}
            ></img>
          ) : (
            <img
              src={"/images/profileImg.png"}
              alt="이미지확인!"
              style={{
                width: "60px",
                height: "60px",
                marginTop: "8px",
                objectFit: "contain",
              }}
            ></img>
          )}
        </div>
        <div
          style={{
            width: "100px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              marginBottom: "4px",
            }}
          >
            {employeeDetail?.empName}
          </div>
          <div
            style={{
              marginLeft: "12px",
            }}
          >
            {employeeDetail?.deptName} / {employeeDetail?.jobName}
          </div>
        </div>
        <div
          style={{
            width: "60px",
            height: "32px",
            lineHeight: "32px",
            marginLeft: "100px",
            border: "1px solid gray",
            borderRadius: "4px",
            fontSize: "14px",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={onClickLogoutHandler}
        >
          로그아웃
        </div>
      </div>
    </>
  );
}

export default EmpInfo;

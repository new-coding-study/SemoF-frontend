import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { callGetMainEmpBirthAPI } from "../../apis/EmployeeAPICalls";
function MainBrith() {
  const dispatch = useDispatch();

  const mainEmpBirth = useSelector((state) => state.empReducer.mainEmpBirth);

  useEffect(
    () => {
      dispatch(callGetMainEmpBirthAPI());
    }, // eslint-disable-next-line
    []
  );

  const test = () => {
    const groups = [];

    for (let i = 0; i < mainEmpBirth.length; i += 2) {
      groups.push([
        <div
          style={{
            // border: "1px solid red",
            marginLeft: "12px",
            width: "100px",
          }}
        >
          <div
            style={{
              color: "gray",
              fontSize: "12px",
              visibility:
                mainEmpBirth[i]?.deptCode === "NO" ? "hidden" : "visible",
              //   display: mainEmpBirth[i]?.deptCode === "NO" ? "none" : "block",
              marginBottom: "4px",
            }}
          >
            {mainEmpBirth[i]?.deptName}팀
          </div>
          <div
            style={{
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            "{mainEmpBirth[i]?.empName}"
          </div>
        </div>,
        <div
          style={{
            // border: "1px solid red",
            marginLeft: "12px",
            width: "100px",
          }}
        >
          <div
            style={{
              color: "gray",
              fontSize: "12px",
              visibility:
                mainEmpBirth[i + 1]?.deptCode === "NO" ? "hidden" : "visible",
              //   display:
              //     mainEmpBirth[i + 1]?.deptCode === "NO" ? "none" : "block",
              marginBottom: "4px",
            }}
          >
            {mainEmpBirth[i + 1]?.deptName}팀
          </div>
          <div
            style={{
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            "{mainEmpBirth[i + 1]?.empName}"
          </div>
        </div>,
      ]);
    }
    return groups;
  };

  return (
    <>
      <div
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          textAlign: "left",
        }}
      >
        <img
          src={"/images/cake.png"}
          alt="이미지확인!"
          style={{
            width: "16px",
            height: "16px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        ></img>
        <span>이 달의 생일자</span>
      </div>
      {test().map((oneEmp, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            // border: "1px solid blue",
            marginTop: "12px",
          }}
        >
          {oneEmp}
        </div>
      ))}
    </>
  );
}

export default MainBrith;

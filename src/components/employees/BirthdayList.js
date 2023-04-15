import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BirthdayListCSS from "./BirthdayList.module.css";
import { callGetEmpBirthdayAPI } from "../../apis/EmployeeAPICalls";

function BirthdayList() {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const birthdayList = useSelector((state) => state?.empReducer.empBirthday);

  // console.log("[BirthdayName] birthdayList : " + JSON.stringify(birthdayList));

  const empNames = birthdayList.map((birthday) => birthday.empName);

  useEffect(
    () => {
      dispatch(callGetEmpBirthdayAPI());
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={BirthdayListCSS.title}>
        <img
          src={"/images/birth.png"}
          alt="이미지확인!"
          className={BirthdayListCSS.logo}
        />
        <b>
          <span>{month}</span>월 생일자
        </b>
      </div>
      <div className={BirthdayListCSS.empName}>
        {empNames.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>
    </>
  );
}

export default BirthdayList;

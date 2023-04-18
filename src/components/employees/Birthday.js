import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetEmpBirthAPI } from "../../apis/EmployeeAPICalls";

function Birthday() {
  const dispatch = useDispatch();
  const empBirth = useSelector((state) => state.empReducer.empBirth);

  console.log("[Birthday] empBirth : " + JSON.stringify(empBirth));

  useEffect(
    () => {
      dispatch(callGetEmpBirthAPI());
    }, // eslint-disable-next-line
    []
  );

  const birth = parseInt(empBirth) || 0;

  console.log("[Attedance] todayAtd : " + birth);

  return <span>{birth}</span>;
}

export default Birthday;

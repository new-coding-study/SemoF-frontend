import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetEmpVacationAPI } from "../../apis/EmployeeAPICalls";

function Vacation() {
  const dispatch = useDispatch();
  const empVacation = useSelector((state) => state.empReducer.empVacation);

  console.log("[Vacation] empAttendance : " + JSON.stringify(empVacation));

  useEffect(
    () => {
      dispatch(callGetEmpVacationAPI());
    }, // eslint-disable-next-line
    []
  );

  const vacation = parseInt(empVacation) || 0;

  console.log("[Vacation] vacation : " + vacation);

  return <span>{vacation}</span>;
}

export default Vacation;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetEmpAtdAPI } from "../../apis/EmployeeAPICalls";

function Attedances() {
  const dispatch = useDispatch();
  const empAttendance = useSelector((state) => state.empReducer.empAttendance);

  console.log("[Attedance] empAttendance : " + JSON.stringify(empAttendance));

  useEffect(
    () => {
      dispatch(callGetEmpAtdAPI());
    }, // eslint-disable-next-line
    []
  );

  const todayAtd = parseInt(empAttendance) || 0;

  console.log("[Attedance] todayAtd : " + todayAtd);

  return <span>{todayAtd}</span>;
}

export default Attedances;

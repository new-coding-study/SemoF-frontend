import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { callScheduleListAPI } from "../../apis/ScheduleAPICalls";
function MainSchedule({ decodedUser }) {
  const dispatch = useDispatch();

  const scheduleList = useSelector(
    (state) => state.scheduleReducer.scheduleList
  );

  const today = moment(new Date()).format("YYYY-MM-DD");
  const langeOfScd = moment().add(21, "days").format("YYYY-MM-DD");

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callScheduleListAPI(decodedUser));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      {" "}
      <div
        style={{
          marginTop: "16px",
          marginBottom: "16px",
          marginLeft: "16px",
          textAlign: "left",
        }}
      >
        <img
          src={"/images/mainSchedule.png"}
          alt="이미지확인!"
          style={{
            width: "16px",
            height: "16px",
            marginRight: "8px",
            verticalAlign: "sub",
          }}
        ></img>
        <span>가까운 일정</span>
      </div>
      {Array.isArray(scheduleList) &&
        scheduleList
          .filter(
            (schedule) =>
              schedule?.scdStartDay >= today &&
              schedule?.scdStartDay <= langeOfScd
          )
          .map((schedule) => (
            <div
              style={{
                display: "flex",
                marginTop: "12px",
                marginLeft: "16px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: schedule?.calColor,
                  borderRadius: "100%",
                  marginTop: "3px",
                }}
              ></div>
              <div
                style={{
                  margin: "0 12px",
                  fontWeight: "bold",
                }}
              >
                {moment(schedule?.scdStartDay).format("MM/DD")}
              </div>
              <div>{schedule?.scdName}</div>
            </div>
          ))}
    </>
  );
}

export default MainSchedule;

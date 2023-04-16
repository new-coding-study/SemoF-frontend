import RegistScheduleCSS from "./RegistSchedule.module.css";
import CalendarSelectList from "./CalendarSelectList";
import { useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { decodeJwt } from "../../utils/tokenUtils";

import { callRegistScheduleAPI } from "../../apis/ScheduleAPICalls";
function RegistSchedule({
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  defaultDate,
}) {
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const [checkAllDay, setCheckAllDay] = useState(true);
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState({
    calNo: "",
    calColor: "",
    calName: "",
  });

  const [newSchedule, setNewSchedule] = useState({
    scdName: "",
    scdStartDay: moment(defaultDate).format("YYYY-MM-DD"),
    scdStartTime: "",
    scdEndDay: moment(defaultDate).format("YYYY-MM-DD"),
    scdEndTime: "",
    scdAllDay: "",
    scdContent: "",
    scdPlace: "",
    calNo: "",
  });

  // 이전으로 버튼 클릭 시 달력으로 돌아감
  const onClickbackToCalendarHandler = () => {
    setDefaultMode(true);
  };

  // 종일 여부 변화 관리 핸들러
  const onChangeCheckAllDayHandler = () => {
    setCheckAllDay(!checkAllDay);
  };

  // 값이 입력되면 상태값을 변화시키는 핸들러
  const onChangeRegistScdHandler = (e) => {
    setNewSchedule({
      ...newSchedule,
      [e.target.name]: e.target.value,
    });
  };

  // 저장 버튼을 클릭하면 formData 에 값을 저장해서 dispatch 를 보냄
  const onClickRegistScdHandler = () => {
    const formData = new FormData();

    newSchedule.scdAllDay = checkAllDay ? 1 : 0;

    formData.append("scdName", newSchedule.scdName);
    formData.append("scdStartDay", newSchedule.scdStartDay);
    formData.append("scdStartTime", newSchedule.scdStartTime);
    formData.append("scdEndDay", newSchedule.scdEndDay);
    formData.append("scdEndTime", newSchedule.scdEndTime);
    formData.append("scdAllDay", newSchedule.scdAllDay);
    formData.append("scdContent", newSchedule.scdContent);
    formData.append("scdPlace", newSchedule.scdPlace);

    // 캘린더 값 선택해서 들어갈 수 있도록 수정해야함
    formData.append("calNo", selectedCalendar);

    // token 에서 유저No 받아서 넣어주기 수정완료
    formData.append("scdWriter", decodedUser);

    dispatch(callRegistScheduleAPI({ form: formData }));

    alert("일정 등록이 완료되었습니다.");
    setDefaultMode(true);
    setSearchMode(false);
    setRegistMode(false);
  };

  return (
    <>
      <div className={RegistScheduleCSS.registScdWrapper}>
        <div
          className={RegistScheduleCSS.backToCalendar}
          onClick={onClickbackToCalendarHandler}
        >
          <div>←</div>
          <div> 돌아가기</div>
        </div>
        <div className={RegistScheduleCSS.scdNameWrapper}>
          <div className={RegistScheduleCSS.scdName}>
            <input
              type="text"
              name="scdName"
              placeholder="제목 입력"
              onChange={onChangeRegistScdHandler}
              // className={RegistScheduleCSS.inputScdName}
            />
          </div>
        </div>
        <div className={RegistScheduleCSS.scdDateWrapper}>
          <div className={RegistScheduleCSS.scdStartDate}>
            <input
              type="Date"
              name="scdStartDay"
              value={newSchedule?.scdStartDay || ""}
              onChange={onChangeRegistScdHandler}
            />
            <input
              type="Time"
              name="scdStartTime"
              // value={updateSchedule?.scdStartTime || ""}
              onChange={onChangeRegistScdHandler}
              style={
                checkAllDay
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            />
          </div>
          <div className={RegistScheduleCSS.scdEndDate}>
            <input
              type="Date"
              name="scdEndDay"
              value={newSchedule?.scdEndDay || ""}
              onChange={onChangeRegistScdHandler}
            />
            <input
              type="Time"
              name="scdEndTime"
              // value={updateSchedule?.scdEndTime || ""}
              onChange={onChangeRegistScdHandler}
              style={
                checkAllDay
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            />
          </div>
          <div className={RegistScheduleCSS.allDayCheckbox}>
            <input
              type="checkbox"
              name="scdAllDay"
              id="allDayCheck"
              checked={checkAllDay}
              onChange={onChangeCheckAllDayHandler}
            />
            <label htmlFor="allDayCheck"> 종일 </label>
          </div>
        </div>
        <div
          className={RegistScheduleCSS.calendarWrapper}
          onClick={() => {
            setVisibleCalendar(!visibleCalendar);
          }}
        >
          {visibleCalendar ? (
            <div style={{ display: "flex" }}>
              <CalendarSelectList
                setVisibleCalendar={setVisibleCalendar}
                setSelectedCalendar={setSelectedCalendar}
                selectedCalendar={selectedCalendar}
                decodedUser={decodedUser}
              />
              <div> ▼ </div>
            </div>
          ) : selectedCalendar.calNo === "" ? (
            <div className={RegistScheduleCSS.selectCalendar}>
              <div>캘린더 선택</div>
              <div> ▼</div>
            </div>
          ) : (
            <div className={RegistScheduleCSS.selectedCalendar}>
              <div
                className={RegistScheduleCSS.selectedCalColor}
                style={{ backgroundColor: selectedCalendar?.calColor }}
              ></div>
              <div className={RegistScheduleCSS.selectedCalName}>
                {" "}
                {selectedCalendar?.calName}{" "}
              </div>
              <div> ▼</div>
            </div>
          )}
        </div>
        <div className={RegistScheduleCSS.scdPlaceWrapper}>
          <input
            type="text"
            name="scdPlace"
            placeholder="장소 추가"
            className={RegistScheduleCSS.inputScdPlace}
            onChange={onChangeRegistScdHandler}
          />
        </div>
        <div className={RegistScheduleCSS.scdContentWrapper}>
          <textarea
            name="scdContent"
            placeholder="설명 추가"
            className={RegistScheduleCSS.scdContent}
            onChange={onChangeRegistScdHandler}
          />
        </div>
        <div
          className={RegistScheduleCSS.registBtn}
          onClick={onClickRegistScdHandler}
        >
          {" "}
          저장{" "}
        </div>
      </div>
    </>
  );
}

export default RegistSchedule;

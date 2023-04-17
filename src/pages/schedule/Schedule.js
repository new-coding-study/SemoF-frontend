import ScheduleCSS from "./Schedule.module.css";
import CalendarList from "../../components/schedule/CalendarList";
import DefaultCalendar from "../../components/schedule/DefaultCalendar";
import ScheduleSearch from "../../components/schedule/ScheduleSearch";
import RegistSchedule from "../../components/schedule/RegistSchedule";
import CalendarOption from "../../components/schedule/CalendarOption";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callCalendarListAPI,
  callRegistCalendarAPI,
} from "../../apis/ScheduleAPICalls";

function Schedule() {
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const calendarList = useSelector(
    (state) => state.scheduleReducer.calendarList
  );

  // 캘린더 리스트에서 새로운 캘린더 추가하는데 필요한 상태값
  const [inputCalStyle, setInputCalStyle] = useState({ display: "none" });
  const [addCalendar, setAddCalendar] = useState(false);

  const [newCalendar, setNewCalendar] = useState({
    calName: "",
    calColor: "#adf542",
  });

  const [selectCalendarNo, setSelectCalendarNo] = useState("");

  const [defaultMode, setDefaultMode] = useState(true);
  const [searchMode, setSearchMode] = useState(false);
  const [registMode, setRegistMode] = useState(false);

  const [defaultDate, setDefaultDate] = useState(new Date());

  const onClickMoveTeRegistScdHandler = () => {
    setDefaultMode(false);
    setRegistMode(true);
    setDefaultDate(new Date());
  };

  // 새로운 캘린더 추가를 위한 값 입력
  const onChangeAddCalendarHandler = (e) => {
    setNewCalendar({
      ...newCalendar,
      [e.target.name]: e.target.value,
    });
  };

  // 새로운 캘린더 추가 API 호출 및 상태값 초기화
  const onEnterkeyForAddCalendarHandler = (e) => {
    if (e.key === "Enter") {
      const formData = new FormData();

      formData.append("calName", newCalendar.calName);
      formData.append("calColor", newCalendar.calColor);
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      formData.append("madeEmpNo", decodedUser);

      // 입력받은 값으로 dispatch 호출
      dispatch(
        callRegistCalendarAPI({
          form: formData,
        })
      );

      // 변경된 값을 초기화
      setNewCalendar({
        ...newCalendar,
        calName: "",
        calColor: "#adf542",
      });

      setInputCalStyle({
        display: "none",
      });

      setAddCalendar(true);
    }
  };

  // DefaultMode 에서 입력받은 검색어를 SearchMode로 보내주기 위한 상태값과 코드
  const [searchSchedule, setSearchSchedule] = useState({
    searchWord: "",
  });

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCalendarListAPI(decodedUser));
    }, // eslint-disable-next-line
    [addCalendar, defaultMode, searchMode, registMode, selectCalendarNo]
  );

  useEffect(
    () => {
      setAddCalendar(false);
    }, // eslint-disable-next-line
    [addCalendar]
  );

  return (
    <>
      <div className={ScheduleCSS.contour}> 일정 </div>

      <div className={ScheduleCSS.scheduleWrapper}>
        <div className={ScheduleCSS.calendarWrapper}>
          <div className={ScheduleCSS.addScheduleBox}>
            <button onClick={onClickMoveTeRegistScdHandler}>일정 추가</button>
          </div>
          {Array.isArray(calendarList) &&
            calendarList?.map((calendar) => (
              <CalendarList
                key={calendar.calNo}
                calendar={calendar}
                setDefaultMode={setDefaultMode}
                setSearchMode={setSearchMode}
                setRegistMode={setRegistMode}
                setSelectCalendarNo={setSelectCalendarNo}
              />
            ))}
          <div className={ScheduleCSS.inputCalWrapper} style={inputCalStyle}>
            <input
              type="color"
              name="calColor"
              value={newCalendar?.calColor || ""}
              onChange={onChangeAddCalendarHandler}
              className={ScheduleCSS.inputCalColor}
            ></input>
            <input
              type="text"
              name="calName"
              placeholder="캘린더 이름 입력"
              value={newCalendar?.calName || ""}
              onChange={onChangeAddCalendarHandler}
              onKeyUp={onEnterkeyForAddCalendarHandler}
              className={ScheduleCSS.inputCalName}
            ></input>
            <span
              onClick={() => {
                setInputCalStyle({ display: "none" });
              }}
            >
              x
            </span>
          </div>
          <div
            className={ScheduleCSS.addCalendarBtnWrapper}
            onClick={() => {
              setInputCalStyle({ display: "block" });
            }}
          >
            <div> + </div>
            <div> 캘린더 추가</div>
          </div>
        </div>
        <div className={ScheduleCSS.content}>
          {defaultMode ? (
            <DefaultCalendar
              setSearchSchedule={setSearchSchedule}
              searchSchedule={searchSchedule}
              setDefaultMode={setDefaultMode}
              setSearchMode={setSearchMode}
              setRegistMode={setRegistMode}
              setDefaultDate={setDefaultDate}
            />
          ) : searchMode ? (
            <ScheduleSearch
              searchSchedule={searchSchedule}
              setDefaultMode={setDefaultMode}
              setSearchMode={setSearchMode}
              setRegistMode={setRegistMode}
            />
          ) : registMode ? (
            <RegistSchedule
              setDefaultMode={setDefaultMode}
              setSearchMode={setSearchMode}
              setRegistMode={setRegistMode}
              defaultDate={defaultDate}
            />
          ) : (
            <CalendarOption
              setSelectCalendarNo={setSelectCalendarNo}
              selectCalendarNo={selectCalendarNo}
              setDefaultMode={setDefaultMode}
              setSearchMode={setSearchMode}
              setRegistMode={setRegistMode}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Schedule;

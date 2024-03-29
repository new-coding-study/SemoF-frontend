import CalendarOptionCSS from "./CalendarOption.module.css";
import CalendarMemList from "./CalendarMemList";
// import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callCalendarDetailAPI,
  // callCalendarMemListAPI,
  callUpdateCalendarAPI,
  callDeleteCalendarAPI,
} from "../../apis/ScheduleAPICalls";

function CalendarOption({
  setSelectCalendarNo,
  selectCalendarNo,
  setDefaultMode,
}) {
  const dispatch = useDispatch();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const calendarDetail = useSelector(
    (state) => state.scheduleReducer.calendarDetail
  );

  // const calendarMemList = useSelector(
  //   (state) => state.scheduleReducer.calendarMemList
  // );

  // console.log("calendarMemList : ", calendarMemList);

  // 수정 및 삭제 권한 확인 (로그인한 유저와 캘린더 생성자가 동일해야만 수정 및 삭제가 가능함. 그 외에 멤버는 불가능)
  // const localStorageEmpNo = 41; // 나중에 연결해서 가져와야함
  const permission = decodedUser === calendarDetail?.madeEmpNo;
  //   console.log(permission ? "권한있음" : "권한없음");

  // 돌아가기 버튼 => 달력으로 돌아감
  const onClickbackToCalendarHandler = () => {
    setDefaultMode(true);
    setSelectCalendarNo("");
  };

  // 캘린더 수정에 대한 상태값
  const [updateCalendar, setUpdateCalendar] = useState({
    calName: calendarDetail?.calName,
    calColor: calendarDetail?.calColor,
    calContent: calendarDetail?.calContent,
  });

  // 캘린더 수정 관리 핸들러
  const onChangeUpdateCalendarHandler = (e) => {
    setUpdateCalendar({
      ...updateCalendar,
      [e.target.name]: e.target.value,
    });
  };

  // 수정사항 저장 버튼 핸들러
  const onClickUpdateCalendar = () => {
    Swal.fire({
      title: "수정사항을 저장하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "저장",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.append("calNo", calendarDetail.calNo);
        formData.append("calName", updateCalendar.calName);
        formData.append("calColor", updateCalendar.calColor);
        formData.append("calContent", updateCalendar.calContent);

        // console.log(formData.get("calNo"));
        // console.log(formData.get("calName"));
        // console.log(formData.get("calColor"));
        // console.log(formData.get("calCotent"));

        dispatch(callUpdateCalendarAPI({ form: formData }));

        Swal.fire(
          "수정사항이 저장되었습니다.",
          //   "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          //   navigate(`/semof/todo`, { replace: true }),
          //   setTodoDetailModal(false),
          //   setTodoUpdateModal(false),
          setDefaultMode(true)
          //   window.location.reload()
        );
      }
    });
  };

  // 캘린더 삭제 버튼 핸들러
  const onClickDeleteCalendar = () => {
    Swal.fire({
      title: "할 일을 삭제하시겠습니까?",
      html: "캘린더 삭제 시 포함된 일정과 멤버도 모두 삭제되며,<br/> 되돌릴 수 없습니다.",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callDeleteCalendarAPI(selectCalendarNo));
        Swal.fire(
          "할 일이 삭제되었습니다.",
          //    "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          //    navigate(`/semof/todo`, { replace: true }),
          //    setTodoDetailModal(false),
          setDefaultMode(true)
          //   window.location.reload()
        );
      }
    });
  };

  useEffect(
    () => {
      dispatch(callCalendarDetailAPI(selectCalendarNo));
    }, // eslint-disable-next-line
    [selectCalendarNo]
  );

  useEffect(
    () => {
      setUpdateCalendar({
        calName: calendarDetail?.calName,
        calColor: calendarDetail?.calColor,
        calContent: calendarDetail?.calContent,
      });
    }, // eslint-disable-next-line
    [calendarDetail]
  );

  return (
    <>
      <div className={CalendarOptionCSS.calendarOptionsWrapper}>
        <div
          className={CalendarOptionCSS.backToCalendar}
          onClick={onClickbackToCalendarHandler}
        >
          <div>←</div>
          <div> 돌아가기</div>
        </div>
        <div className={CalendarOptionCSS.optionWrapper}>
          <h2> 캘린더 설정 </h2>
          <div className={CalendarOptionCSS.calNameWrapper}>
            <div className={CalendarOptionCSS.calName}> 이름 </div>
            <input
              type="text"
              name="calName"
              placeholder="캘린더 이름"
              // defaultValue={updateCalendar?.calName || ""}
              value={updateCalendar?.calName || ""}
              onChange={onChangeUpdateCalendarHandler}
              disabled={permission ? false : true}
            />
          </div>
          <div className={CalendarOptionCSS.calColorWrapper}>
            <div className={CalendarOptionCSS.calColor}> 색상 </div>
            <input
              type="color"
              name="calColor"
              // defaultValue={updateCalendar?.calColor}
              value={updateCalendar?.calColor}
              onChange={onChangeUpdateCalendarHandler}
              // disabled={permission ? false : true}
            />
          </div>
          <div className={CalendarOptionCSS.calContentWrapper}>
            <div className={CalendarOptionCSS.calContent}> 설명 </div>
            <textarea
              name="calContent"
              // defaultValue={updateCalendar?.calContent || ""}
              value={updateCalendar?.calContent || ""}
              onChange={onChangeUpdateCalendarHandler}
              disabled={permission ? false : true}
            />
          </div>
          <div className={CalendarOptionCSS.calOwnerWrapper}>
            <div className={CalendarOptionCSS.calOwner}> 소유자 </div>
            <div> {calendarDetail?.madeEmpName} </div>
          </div>
          <div className={CalendarOptionCSS.calMemberWrapper}>
            <CalendarMemList selectCalendarNo={selectCalendarNo} />
            {/* <div className={CalendarOptionCSS.calMem}> 소속 멤버 </div>
            {Array.isArray(calendarMemList) &&
              calendarMemList.map((calendarMember) => (
                <div
                  key={calendarMember.memEmpNo}
                  className={CalendarOptionCSS.calMemList}
                >
                  <div
                    className={CalendarOptionCSS.calMemName}
                    style={{
                      fontSize: "16px",
                      marginBottom: "4px",
                    }}
                  >
                    {calendarMember?.memEmpName}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      paddingLeft: "4px",
                    }}
                  >
                    이메일 출력
                  </div>
                </div>
              ))} */}
          </div>
          <div className={CalendarOptionCSS.addMemberBtn}> + 멤버 추가</div>
          <div> * 멤버정보 불러오는 API 필요함 </div>
          <div className={CalendarOptionCSS.calendarBtnArea}>
            <div
              className={CalendarOptionCSS.editCalendarBtn}
              onClick={onClickUpdateCalendar}
            >
              수정사항 저장
            </div>
            <div
              className={CalendarOptionCSS.deleteCalendarBtn}
              onClick={onClickDeleteCalendar}
            >
              캘린더 삭제
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarOption;

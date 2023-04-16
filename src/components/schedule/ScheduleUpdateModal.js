import ScheduleUpdateModalCSS from "./ScheduleUpdateModal.module.css";
import CalendarSelectList from "./CalendarSelectList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callScheduleDetailAPI,
  callUpdateScheduleAPI,
} from "../../apis/ScheduleAPICalls";
function ScheduleUpdateModal({
  selectScdNo,
  setScheduleDetailModal,
  setScheduleUpdateModal,
  setDefaultMode,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const scheduleDetail = useSelector(
    (state) => state.scheduleReducer.scheduleDetail
  );

  const [checkAllDay, setCheckAllDay] = useState(
    scheduleDetail?.scdAllDay === 1 ? true : false
  );

  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState({
    calNo: scheduleDetail?.calNo,
    calColor: scheduleDetail?.calColor,
    calName: scheduleDetail?.calName,
  });

  const [updateSchedule, setUpdateSchedule] = useState({
    scdName: scheduleDetail?.scdName,
    scdStartDay: scheduleDetail?.scdStartDay,
    scdStartTime: scheduleDetail?.scdStartTime,
    scdEndDay: scheduleDetail?.scdEndDay,
    scdEndTime: scheduleDetail?.scdEndTime,
    scdContent: scheduleDetail?.scdContent,
    scdPlace: scheduleDetail?.scdPlace,
    scdAllDay: scheduleDetail?.scdAllDay,
  });

  // x 버튼 클릭하면 모달 닫히도록 설정
  const onClickCloseModalHandelr = () => {
    setScheduleDetailModal(false);
    setScheduleUpdateModal(false);
  };

  // 디테일 모달로 이동하도록 설정
  const onClickBacoToDetailModalHandelr = () => {
    setScheduleDetailModal(true);
    setScheduleUpdateModal(false);
  };

  // 종일 여부 변화 관리 핸들러
  const onChangeCheckAllDayHandler = () => {
    setCheckAllDay(!checkAllDay);
  };

  const onChangeUpdateScdHandler = (e) => {
    setUpdateSchedule({
      ...updateSchedule,
      [e.target.name]: e.target.value,
    });
  };
  // 수정사항 저장
  const onClickUpdateScd = () => {
    Swal.fire({
      title: "수정사항을 저장하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "저장",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        updateSchedule.scdAllDay = checkAllDay ? 1 : 0;

        formData.append("scdNo", scheduleDetail?.scdNo);
        formData.append("scdName", updateSchedule.scdName);
        formData.append("scdStartDay", updateSchedule.scdStartDay);
        formData.append("scdStartTime", updateSchedule.scdStartTime);
        formData.append("scdEndDay", updateSchedule.scdEndDay);
        formData.append("scdEndTime", updateSchedule.scdEndTime);
        formData.append("scdContent", updateSchedule.scdContent);
        formData.append("scdPlace", updateSchedule.scdPlace);
        formData.append("scdAllDay", updateSchedule.scdAllDay);
        // 캘린더 수정할 수 있도록 수정해야함
        formData.append("calNo", selectedCalendar?.calNo);

        dispatch(callUpdateScheduleAPI({ form: formData }));

        Swal.fire(
          "수정사항이 저장되었습니다.",
          "캘린더로 돌아갑니다",
          "success"
        ).then(
          navigate(`/semof/schedule`, { replace: true }),
          setScheduleDetailModal(false),
          setScheduleUpdateModal(false),
          setDefaultMode(true)
        );
      }
    });
  };

  useEffect(
    () => {
      dispatch(callScheduleDetailAPI(selectScdNo));
    }, // eslint-disable-next-line
    [selectScdNo]
  );

  return (
    <>
      <div className={ScheduleUpdateModalCSS.modal}>
        <div className={ScheduleUpdateModalCSS.modalContainer}>
          <div className={ScheduleUpdateModalCSS.scdDetailModalModalDiv}>
            <div className={ScheduleUpdateModalCSS.scdHeader}>
              <div>
                <h1> {scheduleDetail?.scdName} </h1>
              </div>
              <div
                className={ScheduleUpdateModalCSS.closeBtn}
                onClick={onClickCloseModalHandelr}
              >
                x
              </div>
            </div>

            <div className={ScheduleUpdateModalCSS.scdTitle}>
              <div> 제목 </div>
              <input
                name="scdName"
                placeholder="일정 제목"
                value={updateSchedule?.scdName || ""}
                onChange={onChangeUpdateScdHandler}
              />
            </div>

            <div className={ScheduleUpdateModalCSS.scdCalendar}>
              <div className={ScheduleUpdateModalCSS.calLabel}> 캘린더 </div>
              <div
                className={ScheduleUpdateModalCSS.calBoxWrapper}
                onClick={() => {
                  setVisibleCalendar(!visibleCalendar);
                }}
                style={visibleCalendar ? { backgroundColor: "white" } : null}
              >
                {visibleCalendar ? (
                  <div style={{ display: "flex" }}>
                    <CalendarSelectList
                      setVisibleCalendar={setVisibleCalendar}
                      setSelectedCalendar={setSelectedCalendar}
                      selectedCalendar={selectedCalendar}
                      decodedUser={decodedUser}
                    />
                    {/* <div> ▼ </div> */}
                  </div>
                ) : (
                  <div className={ScheduleUpdateModalCSS.selectedCalendar}>
                    <div
                      className={ScheduleUpdateModalCSS.selectedCalColor}
                      style={{ backgroundColor: selectedCalendar?.calColor }}
                    ></div>
                    <div className={ScheduleUpdateModalCSS.selectedCalName}>
                      {selectedCalendar?.calName}
                    </div>
                    <div style={{ lineHeight: "24px" }}> ▼ </div>
                  </div>
                )}
              </div>
            </div>

            <div className={ScheduleUpdateModalCSS.scdDateWrapper}>
              <div className={ScheduleUpdateModalCSS.scdDateLabel}>일시</div>
              <div className={ScheduleUpdateModalCSS.scdDate}>
                <div className={ScheduleUpdateModalCSS.checkAllDay}>
                  <input
                    type="checkbox"
                    name="scdAllDay"
                    checked={updateSchedule?.scdAllDay === 1 ? true : false}
                    onChange={onChangeCheckAllDayHandler}
                  />
                  <div> 종일 </div>
                </div>
                <div className={ScheduleUpdateModalCSS.scdStart}>
                  시작일
                  <input
                    type="Date"
                    name="scdStartDay"
                    value={updateSchedule?.scdStartDay || ""}
                    onChange={onChangeUpdateScdHandler}
                  />
                  <input
                    type="Time"
                    name="scdStartTime"
                    value={updateSchedule?.scdStartTime || ""}
                    onChange={onChangeUpdateScdHandler}
                    style={
                      checkAllDay
                        ? { visibility: "hidden" }
                        : { visibility: "visible" }
                    }
                  />
                </div>
                <div className={ScheduleUpdateModalCSS.scdEnd}>
                  종료일
                  <input
                    type="Date"
                    name="scdEndDay"
                    value={updateSchedule?.scdEndDay || ""}
                    onChange={onChangeUpdateScdHandler}
                  />
                  <input
                    type="Time"
                    name="scdEndTime"
                    value={updateSchedule?.scdEndTime || ""}
                    onChange={onChangeUpdateScdHandler}
                    style={
                      checkAllDay
                        ? { visibility: "hidden" }
                        : { visibility: "visible" }
                    }
                  />
                </div>
              </div>
            </div>

            <div className={ScheduleUpdateModalCSS.scdContent}>
              <div> 상세내용 </div>
              <textarea
                name="scdContent"
                placeholder="상세내용을 입력하세요"
                value={
                  updateSchedule?.scdContent ? updateSchedule?.scdContent : ""
                }
                onChange={onChangeUpdateScdHandler}
              />
            </div>

            <div className={ScheduleUpdateModalCSS.scdPlace}>
              <div> 장소 </div>
              <input
                name="scdPlace"
                placeholder="주소 정보"
                value={scheduleDetail?.scdPlace || ""}
                disabled={true}
              />
            </div>
            <div className={ScheduleUpdateModalCSS.scdComment}>
              <div> 댓글영역 </div>
            </div>
            <div className={ScheduleUpdateModalCSS.scdButtonDiv}>
              <button onClick={onClickBacoToDetailModalHandelr}>
                이전으로
              </button>
              <button onClick={onClickUpdateScd}>변경사항 저장</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleUpdateModal;

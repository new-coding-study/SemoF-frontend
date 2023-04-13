import ScheduleUpdateModalCSS from "./ScheduleUpdateModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callScheduleDetailAPI,
  callUpdateScheduleAPI,
} from "../../apis/ScheduleAPICalls";
function ScheduleUpdateModal({
  selectScdNo,
  setScheduleDetailModal,
  setScheduleUpdateModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scheduleDetail = useSelector(
    (state) => state.scheduleReducer.scheduleDetail
  );

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
        formData.append("calNo", scheduleDetail?.calNo);

        dispatch(callUpdateScheduleAPI({ form: formData }));

        Swal.fire(
          "수정사항이 저장되었습니다.",
          "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          navigate(`/semof/schedule`, { replace: true }),
          setScheduleDetailModal(false),
          setScheduleUpdateModal(false)
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
                placeholder="할 일 제목"
                value={updateSchedule?.scdName || ""}
                onChange={onChangeUpdateScdHandler}
              />
            </div>

            <div className={ScheduleUpdateModalCSS.scdCalendar}>
              <div className={ScheduleUpdateModalCSS.calLabel}> 카테고리 </div>
              <div className={ScheduleUpdateModalCSS.calBoxWrapper}>
                <div
                  className={ScheduleUpdateModalCSS.calColorBox}
                  style={{
                    backgroundColor: updateSchedule?.calColor,
                  }}
                ></div>
                <span> {updateSchedule?.calName} </span>
              </div>
            </div>

            <div className={ScheduleUpdateModalCSS.scdDateWrapper}>
              <div className={ScheduleUpdateModalCSS.scdDateLabel}>일시</div>
              <div className={ScheduleUpdateModalCSS.scdDate}>
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
              <div
                name="scdPlace"
                value={updateSchedule?.scdPlace}
                onChange={onChangeUpdateScdHandler}
              >
                주소 정보 표시
              </div>
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

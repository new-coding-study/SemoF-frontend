import ScheduleDetailModalCSS from "./ScheduleDetailModal.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callScheduleDetailAPI,
  callDeleteScheduleAPI,
} from "../../apis/ScheduleAPICalls";
function ScheduleDetailModal({
  selectScdNo,
  setScheduleDetailModal,
  setScheduleUpdateModal,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const scheduleDetail = useSelector(
    (state) => state.scheduleReducer.scheduleDetail
  );

  const onClickScdUpdateModeHandelr = () => {
    setScheduleDetailModal(false);
    setScheduleUpdateModal(true);
  };

  const deleteTodo = (selectScdNo) => {
    Swal.fire({
      title: "할 일을 삭제하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callDeleteScheduleAPI(selectScdNo));
        Swal.fire(
          "할 일이 삭제되었습니다.",
          "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          navigate(`/semof/todo`, { replace: true }),
          callDeleteScheduleAPI(false),
          window.location.reload()
        );
      }
    });
  };

  useEffect(
    () => {
      dispatch(callScheduleDetailAPI(selectScdNo));
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={ScheduleDetailModalCSS.modal}>
        <div className={ScheduleDetailModalCSS.modalContainer}>
          <div className={ScheduleDetailModalCSS.scdDetailModalModalDiv}>
            <div className={ScheduleDetailModalCSS.scdHeader}>
              <div>
                <h1> {scheduleDetail?.scdName} </h1>
              </div>
              <div
                className={ScheduleDetailModalCSS.closeBtn}
                onClick={() => setScheduleDetailModal(false)}
              >
                x
              </div>
            </div>

            <div className={ScheduleDetailModalCSS.scdTitle}>
              <div> 제목 </div>
              <input
                name="scdName"
                placeholder="할 일 제목"
                value={scheduleDetail?.scdName || ""}
                disabled={true}
              />
            </div>

            <div className={ScheduleDetailModalCSS.scdCalendar}>
              <div className={ScheduleDetailModalCSS.calLabel}> 카테고리 </div>
              <div className={ScheduleDetailModalCSS.calBoxWrapper}>
                <div
                  className={ScheduleDetailModalCSS.calColorBox}
                  style={{
                    backgroundColor: scheduleDetail?.calColor,
                  }}
                ></div>
                <span> {scheduleDetail?.calName} </span>
              </div>
            </div>

            <div className={ScheduleDetailModalCSS.scdDateWrapper}>
              <div className={ScheduleDetailModalCSS.scdDateLabel}>일시</div>
              <div className={ScheduleDetailModalCSS.scdDate}>
                <div className={ScheduleDetailModalCSS.scdStart}>
                  시작일
                  <input
                    type="Date"
                    name="scdStartDay"
                    value={scheduleDetail?.scdStartDay || ""}
                    disabled={true}
                  />
                  <input
                    type="Time"
                    name="scdStartTime"
                    value={scheduleDetail?.scdStartTime || ""}
                    disabled={true}
                  />
                </div>
                <div className={ScheduleDetailModalCSS.scdEnd}>
                  종료일
                  <input
                    type="Date"
                    name="scdEndDay"
                    value={scheduleDetail?.scdEndDay || ""}
                    disabled={true}
                  />
                  <input
                    type="Time"
                    name="scdEndTime"
                    value={scheduleDetail?.scdEndTime || ""}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <div className={ScheduleDetailModalCSS.scdContent}>
              <div> 상세내용 </div>
              <textarea
                name="scdContent"
                placeholder="상세내용을 입력하세요"
                value={
                  scheduleDetail?.scdContent ? scheduleDetail?.scdContent : ""
                }
                disabled={true}
              />
            </div>

            <div className={ScheduleDetailModalCSS.scdPlace}>
              <div> 장소 </div>
              <div
                name="scdPlace"
                value={scheduleDetail?.scdPlace}
                disabled={true}
              >
                주소 정보 표시
              </div>
            </div>
            <div className={ScheduleDetailModalCSS.scdComment}>
              <div> 댓글영역 </div>
            </div>
            <div className={ScheduleDetailModalCSS.scdButtonDiv}>
              {/* madeEmpNo === localstorageNo 일때만 아래 보이도록 */}
              <button onClick={onClickScdUpdateModeHandelr}>수정</button>
              <button onClick={() => deleteTodo(selectScdNo)}>삭제</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleDetailModal;

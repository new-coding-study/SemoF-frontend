import MainCSS from "./Main.module.css";
import BoardNoticeTop3 from "../components/boards/BoardNoticeTop3";

function Main() {
  return (
    <>
      <div className={MainCSS.contour}> </div>

      <div className={MainCSS.content}>
        <div className={MainCSS.firstGroup}>
          <div className={MainCSS.calendar}> 달력 </div>
          <div className={MainCSS.info}> 사원 정보 </div>
        </div>
        <div className={MainCSS.secondGroup}>
          <div className={MainCSS.banner}> 배너이미지 </div>
          <div className={MainCSS.workingHour}> 근무시간 </div>
        </div>
        <div className={MainCSS.thirdGroup}>
          <div className={MainCSS.weather}> 날씨 </div>
          <div className={MainCSS.birth}> 생일자 </div>
          <div className={MainCSS.todo}> 할 일 </div>
          <div className={MainCSS.notice}> <BoardNoticeTop3/> </div>
        </div>
      </div>
    </>
  );
}

export default Main;

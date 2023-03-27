import TodayCSS from "./Today.module.css";

function Today() {
  return (
    <>
      <div className={TodayCSS.todo}>
        <div> </div>
        {/* 색 => DB에서 값 받아서 인라인으로 설정해주기 */}
        <input
          type="checkbox"
          // value={search}
          // onKeyUp={onEnterkeyHandler}
          // onChange={onSearchChangeHandler}
        />
        <label> 오늘의 할 일 </label>
        <img src={"/images/star_gray.png"} alt="이미지확인!"></img>
      </div>
    </>
  );
}
// checkbox 에 id 값 & label의 for 값 : DB에서 받아와서 넣어주기
// label 에서 보여주는 값도 DB에서 가져오는 값 (할 일 제목)

export default Today;

import IntendedCSS from "./Intended.module.css";

function Intended() {
  return (
    <>
      <div className={IntendedCSS.todoWrapper}>
        <div className={IntendedCSS.colorBar}> </div>
        <div className={IntendedCSS.contentWrapper}>
          <div className={IntendedCSS.todo}>
            {/* 색 => DB에서 값 받아서 인라인으로 설정해주기 */}
            <input
              type="checkbox"
              // value={search}
              // onKeyUp={onEnterkeyHandler}
              // onChange={onSearchChangeHandler}
            />
            <label> 예정된 할 일 </label>
            <img src={"/images/star_gray.png"} alt="이미지확인!"></img>
          </div>
          <div className={IntendedCSS.date}> 2023.04.03 월 </div>
        </div>
      </div>
    </>
  );
}

export default Intended;

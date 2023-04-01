import TodayCSS from "./Today.module.css";

function Today(todayList) {
  // console.log("Today todoList 확인 : ", todoList);

  // console.log("Today todo 확인 : ", todoList.todo);

  const today = todayList.todo;
  // console.log("todo", today);
  // console.log("todayList", todayList);

  return (
    <>
      <div className={TodayCSS.todo}>
        <div
          style={{
            backgroundColor: today.cateColor,
            border: today.cateColor,
          }}
        ></div>
        <input
          type="checkbox"
          style={{ accentColor: today.cateColor }}
          // value={search}
          // onKeyUp={onEnterkeyHandler}
          // onChange={onSearchChangeHandler}
        />
        <label> {today.todoName} </label>
        {today.todoStar === 0 ? (
          <img src={"/images/star_gray.png"} alt="이미지확인!"></img>
        ) : (
          <img src={"/images/star_fill.png"} alt="이미지확인!"></img>
        )}
      </div>
    </>
  );
}
// checkbox 에 id 값 & label의 for 값 : DB에서 받아와서 넣어주기
// label 에서 보여주는 값도 DB에서 가져오는 값 (할 일 제목)

export default Today;

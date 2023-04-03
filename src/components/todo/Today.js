import TodayCSS from "./Today.module.css";
import { useDispatch } from "react-redux";
import { callUpdateStarAPI } from "../../apis/TodoAPICalls";

function Today({ todo, setIntededStar }) {
  const dispatch = useDispatch();
  // console.log("Today todoList 확인 : ", todoList);

  // console.log("Today todo 확인 : ", todoList.todo);

  // const today = todayList.todo;
  // console.log("todo", today);
  // console.log("todayList", todayList);

  const onClickChangeStarHandler = (e) => {
    const todoNo = parseInt(e.target.id);
    console.log("todoNo 확인 : ", todoNo);

    dispatch(callUpdateStarAPI(todoNo));
    setIntededStar(true);
  };

  return (
    <>
      <div className={TodayCSS.todo}>
        <div
          style={{
            backgroundColor: todo.cateColor,
            border: todo.cateColor,
          }}
        ></div>
        <input
          type="checkbox"
          style={{ accentColor: todo.cateColor }}
          // value={search}
          // onKeyUp={onEnterkeyHandler}
          // onChange={onSearchChangeHandler}
        />
        <label>
          <div>{todo.todoName} </div>
        </label>
        {todo.todoStar === 0 ? (
          <img
            id={todo.todoNo}
            src={"/images/star_gray.png"}
            alt="이미지확인!"
            onClick={onClickChangeStarHandler}
          ></img>
        ) : (
          <img
            id={todo.todoNo}
            src={"/images/star_fill.png"}
            alt="이미지확인!"
            onClick={onClickChangeStarHandler}
          ></img>
        )}
      </div>
    </>
  );
}
// checkbox 에 id 값 & label의 for 값 : DB에서 받아와서 넣어주기
// label 에서 보여주는 값도 DB에서 가져오는 값 (할 일 제목)

export default Today;

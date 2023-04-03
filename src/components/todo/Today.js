import TodayCSS from "./Today.module.css";
import { useDispatch } from "react-redux";
import {
  callUpdateStarAPI,
  callUpdateFinishAPI,
} from "../../apis/TodoAPICalls";

function Today({ todo, setCheckStarAndFinish }) {
  const dispatch = useDispatch();

  // 중요표시 업데이트 (별)
  const onClickChangeStarHandler = (e) => {
    const todoNo = parseInt(e.target.id);

    dispatch(callUpdateStarAPI(todoNo));
    setCheckStarAndFinish(true);
  };

  // 완료여부 업데이트 (체크박스)
  const onChangeFinishHandler = (e) => {
    const todoNo = parseInt(e.target.id);
    // console.log("체크박스 Change 이벤트 발생");

    dispatch(callUpdateFinishAPI(todoNo));
    setCheckStarAndFinish(true);
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
          id={todo.todoNo}
          onChange={onChangeFinishHandler}
          checked={todo.todoFinish === 1}
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

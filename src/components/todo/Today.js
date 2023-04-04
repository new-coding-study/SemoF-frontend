import TodayCSS from "./Today.module.css";
import TodoDetailModal from "./TodoDetailModal";
import TodoUpdateModal from "./TodoUpdateModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  callUpdateStarAPI,
  callUpdateFinishAPI,
} from "../../apis/TodoAPICalls";

function Today({ todo, setCheckStarAndFinish }) {
  const dispatch = useDispatch();

  const [todoDetailModal, setTodoDetailModal] = useState(false);
  const [todoUpdateModal, setTodoUpdateModal] = useState(false);
  const [selectTodoNo, setSelectTodoNo] = useState("");

  // 중요표시 업데이트 (별)
  const onClickChangeStarHandler = (e) => {
    const todoNo = parseInt(e.target.id);

    const changeStar = todo.todoStar === 0 ? 1 : 0;

    dispatch(callUpdateStarAPI(todoNo, changeStar));
    setCheckStarAndFinish(true);
  };

  // 완료여부 업데이트 (체크박스)
  const onChangeFinishHandler = (e) => {
    const todoNo = parseInt(e.target.id);
    // console.log("체크박스 Change 이벤트 발생");
    const changeFinish = todo.todoFinish === 0 ? 1 : 0;

    dispatch(callUpdateFinishAPI(todoNo, changeFinish));
    setCheckStarAndFinish(true);
  };

  // 할 일 상세조회
  const onClickTodoDetailHandler = (todoNo) => {
    setSelectTodoNo(todoNo);
    setTodoDetailModal(true);
  };

  return (
    <>
      {todoDetailModal ? (
        <TodoDetailModal
          todoNo={selectTodoNo}
          setTodoDetailModal={setTodoDetailModal}
          setTodoUpdateModal={setTodoUpdateModal}
          // setCheckStarAndFinish={setCheckStarAndFinish}
        />
      ) : null}
      {todoUpdateModal ? (
        <TodoUpdateModal
          todoNo={selectTodoNo}
          setTodoDetailModal={setTodoDetailModal}
          setTodoUpdateModal={setTodoUpdateModal}
        />
      ) : null}
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
          <div onClick={() => onClickTodoDetailHandler(todo.todoNo)}>
            {todo.todoName}
          </div>
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

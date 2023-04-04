import IntendedCSS from "./Intended.module.css";
import TodoDetailModal from "./TodoDetailModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  callUpdateStarAPI,
  callUpdateFinishAPI,
} from "../../apis/TodoAPICalls";

function Intended({ todo, setCheckStarAndFinish }) {
  const dispatch = useDispatch();

  const [todoDetailModal, setTodoDetailModal] = useState(false);
  const [todoUpdateModal, setTodoUpdateModal] = useState(false);
  const [selectTodoNo, setSelectTodoNo] = useState("");

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

  // 할 일 상세조회
  const onClickTodoDetailHandler = (todoNo) => {
    setSelectTodoNo(todoNo);
    console.log(todoNo);
    setTodoDetailModal(true);
  };

  return (
    <>
      {todoDetailModal ? (
        <TodoDetailModal
          todoNo={selectTodoNo}
          setTodoDetailModal={setTodoDetailModal}
          setTodoUpdateModal={setTodoUpdateModal}
        />
      ) : null}
      {todoUpdateModal ? (
        <TodoDetailModal
          todoNo={selectTodoNo}
          setTodoDetailModal={setTodoDetailModal}
          setTodoUpdateModal={setTodoUpdateModal}
        />
      ) : null}
      <div className={IntendedCSS.todoWrapper}>
        <div
          className={IntendedCSS.colorBar}
          style={{
            backgroundColor: todo.cateColor,
            border: todo.cateColor,
          }}
        ></div>
        <div className={IntendedCSS.contentWrapper}>
          <div className={IntendedCSS.todo}>
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
          <div className={IntendedCSS.date}>
            {todo.todoDate} {todo.todoTime.substr(0, 5)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Intended;

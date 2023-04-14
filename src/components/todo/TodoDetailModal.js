import TodoDetailModalCSS from "./TodoDetailModal.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callTodoDetailAPI,
  callUpdateStarAPI,
  callDeleteTodoAPI,
} from "../../apis/TodoAPICalls";

function TodoDetailModal({
  todoNo,
  setTodoDetailModal,
  setTodoUpdateModal,
  setCheckStarAndFinish,
}) {
  const dispatch = useDispatch();
  const todoDetail = useSelector((state) => state.todoReducer.todoDetail);
  const navigate = useNavigate();

  useEffect(
    () => {
      dispatch(callTodoDetailAPI(todoNo));
    }, // eslint-disable-next-line
    []
  );

  // 상세보기 창에서 중요표시 기능,, 상태값이 바뀌면서 페이지 전체가 리렌더링되면서 에러발생
  // const onClickChangeStarHandler = (e) => {
  //   const todoNo = parseInt(e.target.id);

  //   dispatch(callUpdateStarAPI(todoNo));
  //   setCheckStarAndFinish(true);
  // };

  const onClickUpdateModeHandelr = () => {
    setTodoDetailModal(false);
    setTodoUpdateModal(true);
  };

  const deleteTodo = (todoNo) => {
    Swal.fire({
      title: "할 일을 삭제하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callDeleteTodoAPI(todoNo));
        Swal.fire(
          "할 일이 삭제되었습니다.",
          "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          navigate(`/semof/todo`, { replace: true }),
          setTodoDetailModal(false),
          window.location.reload()
        );
      }
    });
  };

  return (
    <div className={TodoDetailModalCSS.modal}>
      <div className={TodoDetailModalCSS.modalContainer}>
        <div className={TodoDetailModalCSS.todoDetailModalModalDiv}>
          <div className={TodoDetailModalCSS.todoHeader}>
            <div>
              <input
                type="checkbox"
                style={{ accentColor: todoDetail?.cateColor }}
                id={todoDetail?.todoNo}
                // onChange={onChangeFinishHandler}
                checked={todoDetail?.todoFinish === 1}
                readOnly={true}
              />
              <h1> {todoDetail?.todoName} </h1>
              {todoDetail?.todoStar === 0 ? (
                <img
                  id={todoDetail?.todoNo}
                  src={"/images/star_gray.png"}
                  alt="이미지확인!"
                  // onClick={onClickChangeStarHandler}
                ></img>
              ) : (
                <img
                  id={todoDetail?.todoNo}
                  src={"/images/star_fill.png"}
                  alt="이미지확인!"
                  // onClick={onClickChangeStarHandler}
                ></img>
              )}
            </div>
            <div onClick={() => setTodoDetailModal(false)}> x </div>
          </div>

          <div className={TodoDetailModalCSS.todoTitle}>
            <div> 제목 </div>
            <input
              name="todoName"
              placeholder="할 일 제목"
              value={todoDetail?.todoName || ""}
              disabled={true}
            />
          </div>

          <div className={TodoDetailModalCSS.todoCategory}>
            <div className={TodoDetailModalCSS.cateLabel}> 카테고리 </div>
            <div className={TodoDetailModalCSS.cateBoxWrapper}>
              <div
                className={TodoDetailModalCSS.cateColorBox}
                style={{
                  backgroundColor: todoDetail?.cateColor,
                }}
              ></div>
              <span> {todoDetail?.cateName} </span>
            </div>
          </div>

          <div className={TodoDetailModalCSS.todoDate}>
            <div> 날짜 및 시간 </div>
            <input
              type="Date"
              name="todoDate"
              value={todoDetail?.todoDate || ""}
              disabled={true}
            />
            <input
              type="Time"
              name="todoTime"
              value={todoDetail?.todoTime || ""}
              disabled={true}
            />
          </div>

          <div className={TodoDetailModalCSS.todoContent}>
            <div> 상세내용 </div>
            <textarea
              name="todoContent"
              placeholder="상세내용을 입력하세요"
              value={todoDetail?.todoContent ? todoDetail?.todoContent : ""}
              disabled={true}
            />
          </div>

          <div className={TodoDetailModalCSS.TodoButtonDiv}>
            <button onClick={onClickUpdateModeHandelr}>수정</button>
            <button onClick={() => deleteTodo(todoNo)}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailModal;

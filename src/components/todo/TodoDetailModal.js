import TodoDetailModalCSS from "./TodoDetailModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { callTodoDetailAPI, callDeleteTodoAPI } from "../../apis/TodoAPICalls";

function TodoDetailModal({ todoNo, setTodoDetailModal, setTodoUpdateModal }) {
  const dispatch = useDispatch();
  const todoDetail = useSelector((state) => state.todoReducer.todoDetail);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(callTodoDetailAPI(todoNo));
  }, []);

  const deleteTodo = (todoNo) => {
    Swal.fire({
      title: "공지사항을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "취소",
      confirmButtonText: "삭제",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callDeleteTodoAPI(todoNo));
        Swal.fire(
          "공지사항이 삭제되었습니다.",
          "게시판으로 돌아갑니다",
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
              <h1>할 일 확인 </h1>
              <img
                // id={intended.todoNo}
                src={"/images/star_gray.png"}
                alt="이미지확인!"
                // onClick={intendedList.changeStar}
                // onClick={onClickHandler}
              ></img>
            </div>
            <div onClick={() => setTodoDetailModal(false)}> x </div>
          </div>

          <div className={TodoDetailModalCSS.todoTitle}>
            <div> 제목 </div>
            <input
              name="todoName"
              placeholder="할 일 제목"
              //   value={
              //     (!modifyMode
              //       ? musicalOneDetail.musicalName
              //       : form.musicalName) || ""
              //   }
              //   onChange={onChangeHandler}
              //   readOnly={modifyMode ? false : true}
              //   style={!modifyMode ? { backgroundColor: "lightgray" } : null}
            />
          </div>

          <div className={TodoDetailModalCSS.todoCategory}>
            <div> 카테고리 </div>
            <input
              name="todoCate"
              placeholder="카테고리 -> select 박스로 변경해야함"
              //   value={
              //     (!modifyMode
              //       ? musicalOneDetail.musicalName
              //       : form.musicalName) || ""
              //   }
              //   onChange={onChangeHandler}
              //   readOnly={modifyMode ? false : true}
              //   style={!modifyMode ? { backgroundColor: "lightgray" } : null}
            />
          </div>

          <div className={TodoDetailModalCSS.todoDate}>
            <div> 날짜 </div>
            <input
              type="Date"
              name="todoDate"
              placeholder="날짜 -> Date"
              //   value={
              //     (!modifyMode
              //       ? musicalOneDetail.musicalName
              //       : form.musicalName) || ""
              //   }
              //   onChange={onChangeHandler}
              //   readOnly={modifyMode ? false : true}
              //   style={!modifyMode ? { backgroundColor: "lightgray" } : null}
            />
            <input
              type="Time"
              name="todoTime"
              placeholder="시간 -> Time"
              //   value={
              //     (!modifyMode
              //       ? musicalOneDetail.musicalName
              //       : form.musicalName) || ""
              //   }
              //   onChange={onChangeHandler}
              //   readOnly={modifyMode ? false : true}
              //   style={!modifyMode ? { backgroundColor: "lightgray" } : null}
            />
          </div>

          <div className={TodoDetailModalCSS.todoContent}>
            <div> 상세내용 </div>
            <textarea
              name="musicalName"
              placeholder="상세내용을 입력하세요"
              //   value={
              //     (!modifyMode
              //       ? musicalOneDetail.musicalName
              //       : form.musicalName) || ""
              //   }
              //   onChange={onChangeHandler}
              //   readOnly={modifyMode ? false : true}
              //   style={!modifyMode ? { backgroundColor: "lightgray" } : null}
            />
          </div>

          <div className={TodoDetailModalCSS.TodoButtonDiv}>
            <button onClick={() => setTodoUpdateModal(true)}>수정</button>
            <button onClick={() => deleteTodo(todoNo)}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailModal;

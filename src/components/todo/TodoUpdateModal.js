import TodoUpdateModalCSS from "./TodoUpdateModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callTodoDetailAPI,
  // callUpdateStarAPI,
  callTodoUpdateAPI,
  callDeleteTodoAPI,
} from "../../apis/TodoAPICalls";

function TodoUpdateModal({
  todoNo,
  setTodoDetailModal,
  setTodoUpdateModal,
  // setCheckStarAndFinish,
}) {
  const dispatch = useDispatch();
  const todoDetail = useSelector((state) => state.todoReducer.todoDetail);
  const navigate = useNavigate();

  const [updateTodo, setUpdateTodo] = useState({
    todoNo: todoDetail.todoNo,
    cateNo: todoDetail.cateNo,
    todoName: todoDetail.todoName,
    todoDate: todoDetail.todoDate,
    todoTime: todoDetail.todoTime,
    todoContent: todoDetail.todoContent,
    todoStar: todoDetail.todoStar,
  });

  console.log(updateTodo);

  useEffect(() => {
    dispatch(callTodoDetailAPI(todoNo));
  }, [todoNo]);

  // 상세보기 창에서 중요표시 기능,, 페이지가 리렌더링되면서 에러발생
  // const onClickChangeStarHandler = (e) => {
  //   const todoNo = parseInt(e.target.id);

  //   dispatch(callUpdateStarAPI(todoNo));
  //   setCheckStarAndFinish(true);
  // };

  const onClickCloseModalHandler = () => {
    setTodoDetailModal(false);
    setTodoUpdateModal(false);
  };

  const onClickBackToDetailModal = () => {
    setTodoDetailModal(true);
    setTodoUpdateModal(false);
  };

  const onChangeUpdateTodoHandler = (e) => {
    // console.log("e.target.name", e.target.name);
    // console.log("e.target.value", e.target.value);
    setUpdateTodo({
      ...updateTodo,
      [e.target.name]: e.target.value,
    });
  };

  // const onClickUpdateTodo = () => {
  //   console.log("수정사항 변경 버튼 클릭 발생");

  //   const formData = new FormData();
  //   formData.append("todoNo", todoDetail.todoNo);
  //   formData.append("todoName", updateTodo.todoName);
  //   formData.append("todoDate", updateTodo.todoDate);
  //   formData.append("todoTime", updateTodo.todoTime);
  //   formData.append("todoContent", updateTodo.todoContent);
  //   formData.append("todoStar", updateTodo.todoStar);
  //   formData.append("cateNo", todoDetail.cateNo);

  //   dispatch(callTodoUpdateAPI({ form: formData }));
  // };

  const onClickUpdateTodo = () => {
    Swal.fire({
      title: "수정사항을 저장하시겠습니까?",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "저장",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();

        formData.append("todoNo", todoDetail.todoNo);
        formData.append("todoName", updateTodo.todoName);
        formData.append("todoDate", updateTodo.todoDate);
        formData.append("todoTime", updateTodo.todoTime);
        formData.append("todoContent", updateTodo.todoContent);
        formData.append("todoStar", updateTodo.todoStar);
        formData.append("cateNo", updateTodo.cateNo);

        dispatch(callTodoUpdateAPI({ form: formData }));

        Swal.fire(
          "수정사항이 저장되었습니다.",
          "게시판으로 돌아갑니다",
          "success"
        ).then(
          navigate(`/semof/todo`, { replace: true }),
          setTodoDetailModal(false),
          setTodoUpdateModal(false),
          window.location.reload()
        );
      }
    });
  };

  return (
    <div className={TodoUpdateModalCSS.modal}>
      <div className={TodoUpdateModalCSS.modalContainer}>
        <div className={TodoUpdateModalCSS.todoDetailModalModalDiv}>
          <div className={TodoUpdateModalCSS.todoHeader}>
            <div>
              <h1> {todoDetail.todoName} </h1>
              {todoDetail.todoStar === 0 ? (
                <img
                  id={todoDetail.todoNo}
                  src={"/images/star_gray.png"}
                  alt="이미지확인!"
                  // onClick={onClickChangeStarHandler}
                ></img>
              ) : (
                <img
                  id={todoDetail.todoNo}
                  src={"/images/star_fill.png"}
                  alt="이미지확인!"
                  // onClick={onClickChangeStarHandler}
                ></img>
              )}
            </div>
            <div onClick={onClickCloseModalHandler}> x </div>
          </div>

          <div className={TodoUpdateModalCSS.todoTitle}>
            <div> 제목 </div>
            <input
              name="todoName"
              placeholder="할 일 제목"
              value={updateTodo.todoName}
              // readOnly={true}
              onChange={onChangeUpdateTodoHandler}
            />
          </div>

          {/* <div className={TodoUpdateModalCSS.todoCategory}>
            <div> 카테고리 </div>
            <input
              name="todoCate"
              placeholder="카테고리 -> select 박스로 변경해야함"
              onChange={onChangeUpdateTodoHandler}
            />
          </div> */}

          <div className={TodoUpdateModalCSS.todoCategory}>
            <div className={TodoUpdateModalCSS.cateLabel}> 카테고리 </div>
            <div className={TodoUpdateModalCSS.cateBoxWrapper}>
              <div
                className={TodoUpdateModalCSS.cateColorBox}
                style={{
                  backgroundColor: todoDetail.cateColor,
                }}
              ></div>
              <span> {todoDetail.cateName} </span>
            </div>
          </div>

          <div className={TodoUpdateModalCSS.todoDate}>
            <div> 날짜 및 시간</div>
            <input
              type="Date"
              name="todoDate"
              value={updateTodo.todoDate}
              onChange={onChangeUpdateTodoHandler}
            />
            <input
              type="Time"
              name="todoTime"
              value={updateTodo.todoTime}
              onChange={onChangeUpdateTodoHandler}
            />
          </div>

          <div className={TodoUpdateModalCSS.todoContent}>
            <div> 상세내용 </div>
            <textarea
              name="todoContent"
              placeholder="상세내용을 입력하세요"
              value={updateTodo.todoContent}
              onChange={onChangeUpdateTodoHandler}
            />
          </div>

          <div className={TodoUpdateModalCSS.TodoButtonDiv}>
            <button onClick={onClickBackToDetailModal}>이전으로</button>
            <button onClick={onClickUpdateTodo}>변경사항 저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoUpdateModal;

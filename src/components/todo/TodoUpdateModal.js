import TodoUpdateModalCSS from "./TodoUpdateModal.module.css";
import UpdateCategory from "./UpdateCategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callTodoDetailAPI,
  // callUpdateStarAPI,
  callTodoUpdateAPI,
} from "../../apis/TodoAPICalls";

function TodoUpdateModal({
  todoNo,
  setTodoDetailModal,
  setTodoUpdateModal,
  // setCheckStarAndFinish,
}) {
  const dispatch = useDispatch();
  const todoDetail = useSelector((state) => state.todoReducer.todoDetail);
  const categoryList = useSelector((state) => state.todoReducer.categoryList);
  const navigate = useNavigate();

  const [updateTodo, setUpdateTodo] = useState({
    todoNo: todoDetail.todoNo,
    todoName: todoDetail.todoName,
    todoDate: todoDetail.todoDate,
    todoTime: todoDetail.todoTime,
    todoContent: todoDetail.todoContent,
    todoStar: todoDetail.todoStar,
    todoFinish: todoDetail.todoFinish,
  });

  // console.log(updateTodo);

  // 수정창에서 카테고리 보일지 말지에 대한 상태 관리
  const [visibleUpdateCate, setVisibleUpdateCate] = useState(false);

  const [selectUpdateCate, setSelectUpdateCate] = useState({
    cateNo: todoDetail.cateNo,
    cateColor: todoDetail.cateColor,
    cateName: todoDetail.cateName,
  });

  useEffect(() => {
    dispatch(callTodoDetailAPI(todoNo));
  }, [todoNo]);

  // 수정창에서 중요표시 변경하는 핸들러
  const onClickChangeStarHandler = () => {
    const changeStar = updateTodo.todoStar === 0 ? 1 : 0;

    setUpdateTodo({
      ...updateTodo,
      todoStar: changeStar,
    });
  };

  // 수정창에서 체크표시 변경하는 핸들러
  const onClickFinishHandler = (e) => {
    const todoFinish = e.target.checked ? 1 : 0;

    setUpdateTodo({
      ...updateTodo,
      todoFinish: todoFinish,
    });
  };

  const onClickCloseModalHandler = () => {
    setTodoDetailModal(false);
    setTodoUpdateModal(false);
  };

  const onClickBackToDetailModal = () => {
    setTodoDetailModal(true);
    setTodoUpdateModal(false);
  };

  const onChangeUpdateTodoHandler = (e) => {
    setUpdateTodo({
      ...updateTodo,
      [e.target.name]: e.target.value,
    });
  };

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
        formData.append("cateNo", selectUpdateCate.cateNo);
        formData.append("todoFinish", updateTodo.todoFinish);

        dispatch(callTodoUpdateAPI({ form: formData }));

        Swal.fire(
          "수정사항이 저장되었습니다.",
          "할 일 리스트로 돌아갑니다",
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
              <input
                type="checkbox"
                style={{ accentColor: todoDetail?.cateColor }}
                id={todoDetail?.todoNo}
                onClick={onClickFinishHandler}
                defaultChecked={updateTodo?.todoFinish === 1}
                value={updateTodo?.todoFinish}
                name="todoFinish"
                // readOnly={true}
              />
              <h1> {todoDetail?.todoName} </h1>
              {updateTodo?.todoStar === 0 ? (
                <img
                  id={todoDetail?.todoNo}
                  src={"/images/star_gray.png"}
                  alt="이미지확인!"
                  onClick={onClickChangeStarHandler}
                  value={todoDetail?.todoStar}
                ></img>
              ) : (
                <img
                  id={todoDetail?.todoNo}
                  src={"/images/star_fill.png"}
                  alt="이미지확인!"
                  onClick={onClickChangeStarHandler}
                  value={todoDetail?.todoStar}
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
              value={updateTodo?.todoName}
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
              {visibleUpdateCate ? (
                <div className={TodoUpdateModalCSS.selectUpdateCate}>
                  <UpdateCategory
                    categorys={categoryList}
                    setVisibleUpdateCate={setVisibleUpdateCate}
                    visibleUpdateCate={visibleUpdateCate}
                    setSelectUpdateCate={setSelectUpdateCate}
                    selectUpdateCate={selectUpdateCate}
                  />
                </div>
              ) : (
                // categoryList?.map((category) => (
                //   <UpdateCategory
                //     key={category.cateNo}
                //     category={category}
                //     setVisibleUpdateCate={setVisibleUpdateCate}
                //     visibleUpdateCate={visibleUpdateCate}
                //     setSelectUpdateCate={setSelectUpdateCate}
                //     selectUpdateCate={selectUpdateCate}
                //   />
                // ))
                <div className={TodoUpdateModalCSS.defaultCate}>
                  <div
                    className={TodoUpdateModalCSS.defaultCateColorBox}
                    style={{
                      backgroundColor: selectUpdateCate?.cateColor,
                    }}
                  ></div>
                  <div> {selectUpdateCate?.cateName} </div>
                  <span
                    onClick={() => {
                      setVisibleUpdateCate(!visibleUpdateCate);
                    }}
                  >
                    ▼
                  </span>
                </div>
              )}
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

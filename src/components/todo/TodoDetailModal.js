import TodoDetailModalCSS from "./TodoDetailModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { callTodoDetailAPI } from "../../apis/TodoAPICalls";

function TodoDetailModal({ todoNo, setTodoDetailModal }) {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  //   const [form, setForm] = useState({
  //     productCode: productCode,
  //     memberCode: memberCode,
  //     reviewTitle: "",
  //     reviewContent: "",
  //   });

  //   const onChangeHandler = (e) => {
  //     setForm({
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  //   const onClickProductReviewHandler = () => {
  //     console.log("[ProductReviewModal] onClickProductReviewHandler Start!!");

  //     dispatch(
  //       callReviewWriteAPI({
  //         // 리뷰 작성
  //         form: form,
  //       })
  //     );

  //     setProductReviewModal(false);

  //     alert("리뷰 등록이 완료되었습니다.");

  //     navigate(`/review/${productCode}`, { replace: true });
  //     window.location.reload();

  //     console.log("[ProductReviewModal] onClickProductReviewHandler End!!");
  //   };

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
            <div> x </div>
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
            <button
            //   onClick={onClickBackHandler}
            // className={MusicalUpdateCSS.backButton}
            >
              수정
            </button>

            <button
            //   onClick={() =>
            //     onClickMusicalDeleteHandler(musicalOneDetail.musicalCode)
            //   }
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailModal;

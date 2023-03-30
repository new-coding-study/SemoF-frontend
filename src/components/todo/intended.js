import IntendedCSS from "./Intended.module.css";
import TodoDetailModal from "./TodoDetailModal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  callUpdateStarAPI,
  callIntendedTodoListAPI,
  callTodoDetailAPI,
} from "../../apis/TodoAPICalls";

function Intended(intendedList) {
  // console.log(intendedList);
  const intended = intendedList.todo;
  const setStar = intendedList.setStar;
  // const star = intendedList.star;
  const dispatch = useDispatch();
  // console.log("todo", intended);
  // console.log("intendedList", intendedList);

  const [todoDetailModal, setTodoDetailModal] = useState(false);

  // console.log("intended", intended);

  // useEffect(() => {
  //   dispatch(callIntendedTodoListAPI(41));
  // }, [star]);

  // const onClickHandler = (e) => {
  //   const todoNo = parseInt(e.target.id);
  //   // console.log(todoNo);
  //   // console.log(intended.todoStar);
  //   if (intended.todoStar === 1) {
  //     setStar(0);
  //   } else setStar(1);
  //   dispatch(callUpdateStarAPI(todoNo));
  //   // const changeFinish =
  //   //   intendedList &&
  //   //   intendedList.map((one) => {
  //   //     if (one.todoNo === parseInt(e.target.id)) {
  //   //       one.todoFinish = e.target.checked;
  //   //       console.log("종료여부 : ", one.todoFinish);
  //   //       console.log("할일번호 : ", one.todoNo);
  //   //     }
  //   //     return one;
  //   //   });
  // };

  const onClickHandler = (e) => {
    const todoNo = parseInt(e.target.id);
    console.log("todoNo 확인 : ", todoNo);
    // console.log("todo 확인 : ", intendedList[todoNo]);

    // const todo = intendedList.filter((todo) => todo.todoNo === todoNo);

    // console.log(todo[0]);
    // console.log("todo.todoStar : ", todo[0].todoStar);

    dispatch(callUpdateStarAPI(todoNo));
    setStar(true);

    // window.location.reload();

    // if (todo[0].todoStar === 1) {
    //   dispatch(callUpdateStarAPI(todoNo));
    //   setStar(0);
    // } else {
    //   dispatch(callUpdateStarAPI(todoNo));
    //   setStar(1);
    // }
    // console.log(star);
  };

  const onClickTodoDetailHandler = (intended) => {
    console.log("onClick 이벤트 발생");
    dispatch(callTodoDetailAPI(intended.todoNo));
    // setTodoNo(intended.todoNo);
    setTodoDetailModal(true);
  };

  return (
    <>
      {/* {todoDetailModal ? (
        <TodoDetailModal
          todoNo={intended.todoNo}
          setTodoDetailModal={setTodoDetailModal}
        />
      ) : null} */}
      {/* <TodoDetailModal
        todoNo={intended.todoNo}
        setTodoDetailModal={setTodoDetailModal}
        intended={intended}
      /> */}
      <div className={IntendedCSS.todoWrapper}>
        <div
          className={IntendedCSS.colorBar}
          style={{
            backgroundColor: intended.cateColor,
            border: intended.cateColor,
          }}
        ></div>
        <div className={IntendedCSS.contentWrapper}>
          <div className={IntendedCSS.todo}>
            <input
              type="checkbox"
              style={{ accentColor: intended.cateColor }}
              // value={search}
              // onKeyUp={onEnterkeyHandler}
              id={intended.todoNo}
              // onChange={onChangeHandler}
            />
            <label>
              <div onClick={() => onClickTodoDetailHandler(intended)}>
                {intended.todoName}
              </div>
            </label>
            {intended.todoStar === 0 ? (
              <img
                id={intended.todoNo}
                src={"/images/star_gray.png"}
                alt="이미지확인!"
                // onClick={intendedList.changeStar}
                onClick={onClickHandler}
              ></img>
            ) : (
              <img
                id={intended.todoNo}
                src={"/images/star_fill.png"}
                alt="이미지확인!"
                // onClick={intendedList.changeStar}
                onClick={onClickHandler}
              ></img>
            )}
          </div>
          <div className={IntendedCSS.date}>
            {intended.todoDate} {intended.todoTime.substr(0, 5)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Intended;

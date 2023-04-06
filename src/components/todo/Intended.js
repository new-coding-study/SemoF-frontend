import IntendedCSS from "./Intended.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  callUpdateStarAPI,
  callIntendedTodoListAPI,
} from "../../apis/TodoAPICalls";

function Intended(intendedList) {
  // console.log(intendedList);
  const intended = intendedList.todo;
  // const dispatch = useDispatch();
  // console.log("todo", intended);
  // console.log("intendedList", intendedList);

  // const [star, setStar] = useState();

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

  return (
    <>
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
            <label htmlFor={intended.todoNo}> {intended.todoName} </label>
            {intended.todoStar === 0 ? (
              <img
                id={intended.todoNo}
                src={"/images/star_gray.png"}
                alt="이미지확인!"
                onClick={intendedList.changeStar}
              ></img>
            ) : (
              <img
                id={intended.todoNo}
                src={"/images/star_fill.png"}
                alt="이미지확인!"
                onClick={intendedList.changeStar}
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

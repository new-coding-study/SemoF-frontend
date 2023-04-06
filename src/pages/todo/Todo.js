import TodoCSS from "./Todo.module.css";
import Category from "../../components/todo/Category";
import Today from "../../components/todo/Today";
import Intended from "../../components/todo/Intended";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  callTodayTodoListAPI,
  callIntendedTodoListAPI,
  callCategoryListAPI,
  callUpdateStarAPI,
} from "../../apis/TodoAPICalls";

function Todo() {
  const dispatch = useDispatch();
  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const todayList = useSelector((state) => state.todoReducer.todayList);
  const intendedList = useSelector((state) => state.todoReducer.intendedList);
  const categoryList = useSelector((state) => state.todoReducer.categoryList);
  // const todoList = todos.data;
  // console.log("state = todayList 확인 : ", todayList);
  // console.log("state = intendedList 확인 : ", intendedList);
  // console.log("state = categoryList 확인 : ", categoryList);

  const [star, setStar] = useState();

  // const [todayTodo, setTodayTodo] = useState();

  // console.log("todayTodo 확인", todayTodo);
  // console.log("todoList 확인 : ", todoList);
  // console.log(todos.data);
  // console.log(todoList);
  // console.log(
  //   "map 함수 확인",
  //   todoList.map((todo) => ("todoName : ", todo.todoName))
  // );

  // setTodayTodo([...todoList]); // 무한루프

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callTodayTodoListAPI(41));
      dispatch(callIntendedTodoListAPI(41));
      dispatch(callCategoryListAPI(41));
      // setTodayTodo(dispatch(callTodayTodoListAPI(41))); // promise 객체가 담김
    }, // eslint-disable-next-line
    [star]
  );

  // useEffect(
  //   () => {
  //     // 나중에 localStorage 에서 empNo 받아와서 보내주기!
  //     // dispatch(callIntendedTodoListAPI(41));
  //   }, // eslint-disable-next-line
  //   [todayTodo]
  // );

  const onClickHandler = (e) => {
    const todoNo = parseInt(e.target.id);
    console.log("todoNo 확인 : ", todoNo);
    // console.log("todo 확인 : ", intendedList[todoNo]);

    const todo = intendedList.filter((todo) => todo.todoNo === todoNo);

    // console.log(todo[0]);
    // console.log("todo.todoStar : ", todo[0].todoStar);

    if (todo[0].todoStar === 1) {
      dispatch(callUpdateStarAPI(todoNo));
      setStar(0);
    } else {
      dispatch(callUpdateStarAPI(todoNo));
      setStar(1);
    }
    // console.log(star);
  };

  return (
    <>
      <div className={TodoCSS.contour}> 할 일 </div>

      <div className={TodoCSS.todoWrapper}>
        <div className={TodoCSS.categoryWrapper}>
          <div className={TodoCSS.searchBox}>
            <img src={"/images/search_gray.png"} alt="이미지확인!"></img>
            <input
              type="text"
              placeholder="할 일 검색"
              // value={search}
              // onKeyUp={onEnterkeyHandler}
              // onChange={onSearchChangeHandler}
            />
          </div>
          {/* <Category /> */}
          {/* 리스트로 받아서 for문으로 출력해야함 */}
          {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category key={category.cateNo} category={category} />
            ))}
        </div>
        <div className={TodoCSS.content}>
          <div className={TodoCSS.addWrapper}>
            <div className={TodoCSS.addInputWrapper}>
              <div></div>
              <input
                type="text"
                placeholder="새로운 할 일을 입력하세요"
                // value={search}
                // onKeyUp={onEnterkeyHandler}
                // onChange={onSearchChangeHandler}
              />
              <img src={"/images/star_gray.png"} alt="이미지확인!"></img>
              <img src={"/images/calendar_gray.png"} alt="이미지확인!"></img>
            </div>
            <button
            // onClick={onClickLoginHandler}
            >
              할 일 추가
            </button>
          </div>
          <div className={TodoCSS.graphWrapper}>
            <div className={TodoCSS.graphTitle}>
              <div> 오늘의 달성률 </div>
              <span> 4 </span>
              <span> / 6</span>
            </div>
            <div className={TodoCSS.graph}>
              <div> </div>
              <span> 66%</span>
            </div>
          </div>
          <div className={TodoCSS.todoList}>
            <div className={TodoCSS.today}>
              <h2> 오늘의 할 일 </h2>
              {Array.isArray(todayList) &&
                todayList.map((today) => (
                  <Today key={today.todoNo} todo={today} />
                ))}
            </div>

            <div className={TodoCSS.intended}>
              <h2> 예정된 할 일 </h2>
              {Array.isArray(intendedList) &&
                intendedList.map((intended) => (
                  <Intended
                    key={intended.todoNo}
                    todo={intended}
                    changeStar={onClickHandler}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

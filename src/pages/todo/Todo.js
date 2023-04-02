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
  callSearchTodoAPI,
  callProductRegistAPI,
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

  const [intededStar, setIntededStar] = useState(false);
  // console.log("intededStar 상태값 확인 : ", intededStar);

  const [search, setSearch] = useState();
  const [visibleCate, setVisibleCate] = useState(false);
  const [addTodoStar, setAddTodoStar] = useState(false);
  const [newTodo, setNewTodo] = useState({
    cateNo: "",
    todoName: "",
    todoDate: "",
    todoTime: "",
    todoStar: "",
  });
  const [addTodo, setAddTodo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const onSearchChangeHandler = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
    console.log(search);
  };

  const onEnterkeyHandler = (e) => {
    console.log(search);
    if (e.key === "Enter") {
      dispatch(callSearchTodoAPI(search, 41));
    }
  };

  const onInsertTodoHandler = (e) => {
    setNewTodo({
      ...newTodo,
      todoName: e.target.value,
    });
  };

  const onChooseCate = (e) => {
    console.log(e.target);
    setSelectedCategory(e.target.cateName);
    setNewTodo({
      ...newTodo,
      cateNo: e.target.value,
    });
    setVisibleCate(false);
  };

  const onSetAddStarHandler = () => {
    const value = addTodoStar ? 0 : 1;
    console.log("value 확인", value);

    setNewTodo({
      ...newTodo,
      todoStar: value,
    });
    setAddTodoStar(!addTodoStar);
    // console.log(newTodo);
  };

  const onClickInsertTodoHandler = () => {
    console.log("할 일 등록 메소드 실행합니다");

    const formData = new FormData();

    formData.append("cateNo", newTodo.cateNo);
    formData.append("todoName", newTodo.todoName);
    formData.append("todoDate", newTodo.todoDate);
    formData.append("todoTime", newTodo.todoTime);
    formData.append("todoStar", newTodo.todoStar);

    dispatch(
      callProductRegistAPI({
        form: formData,
      })
    );

    alert("할 일이 정상 등록되었습니다.");
    // window.location.reload();
    setAddTodo(true);
  };

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
    [intededStar]
  );

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      // dispatch(callIntendedTodoListAPI(41));
      setIntededStar(false);
    }, // eslint-disable-next-line
    [intededStar]
  );

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      // dispatch(callIntendedTodoListAPI(41));
      setIntededStar(false);
    }, // eslint-disable-next-line
    [addTodo]
  );

  // useEffect(
  //   () => {
  //     // 나중에 localStorage 에서 empNo 받아와서 보내주기!
  //     // dispatch(callIntendedTodoListAPI(41));
  //   }, // eslint-disable-next-line
  //   [todayTodo]
  // );

  // const onClickHandler = (e) => {
  //   const todoNo = parseInt(e.target.id);
  //   console.log("todoNo 확인 : ", todoNo);
  //   // console.log("todo 확인 : ", intendedList[todoNo]);

  //   const todo = intendedList.filter((todo) => todo.todoNo === todoNo);

  //   // console.log(todo[0]);
  //   // console.log("todo.todoStar : ", todo[0].todoStar);

  //   if (todo[0].todoStar === 1) {
  //     dispatch(callUpdateStarAPI(todoNo));
  //     setStar(0);
  //   } else {
  //     dispatch(callUpdateStarAPI(todoNo));
  //     setStar(1);
  //   }
  //   // console.log(star);
  // };

  const SelectBox = (props) => {
    useEffect(() => {
      setSelectedCategory(props.categorys[0]);
    }, []);
    return (
      <ul className={TodoCSS.selectCateList}>
        {props.categorys.map((category) => (
          <li
            name="cateNo"
            value={category.cateNo}
            key={category.cateNo}
            style={{
              backgroundColor: category.cateColor,
            }}
            onClick={onChooseCate}
          >
            {/* <button
              type="button"
              style={{
                backgroundColor: category.cateColor,
              }}
            >
              {category.cateName}
            </button> */}
            {/* <div style={{ backgroundColor: category.cateColor }}></div> */}
          </li>
        ))}
      </ul>
    );
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
              onKeyUp={onEnterkeyHandler}
              onChange={onSearchChangeHandler}
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
              <div>
                {visibleCate && (
                  <SelectBox
                    categorys={categoryList}
                    setSelectedCategory={setSelectedCategory}
                  />
                )}
              </div>
              <span
                onClick={() => {
                  setVisibleCate(!visibleCate);
                }}
              >
                ▼
              </span>
              <input
                type="text"
                placeholder="새로운 할 일을 입력하세요"
                // value={newTodo}
                onChange={onInsertTodoHandler}
                name="todoName"
              />
              {addTodoStar ? (
                <img
                  src={"/images/star_fill.png"}
                  alt="이미지확인!"
                  onClick={onSetAddStarHandler}
                  // value={1}
                ></img>
              ) : (
                <img
                  src={"/images/star_gray.png"}
                  alt="이미지확인!"
                  onClick={onSetAddStarHandler}
                  // value={0}
                ></img>
              )}
              <img src={"/images/calendar_gray.png"} alt="이미지확인!"></img>
            </div>
            <button onClick={onClickInsertTodoHandler}>할 일 추가</button>
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
                    // changeStar={onClickHandler}
                    setIntededStar={setIntededStar}
                    // star={star}
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

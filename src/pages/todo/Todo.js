import TodoCSS from "./Todo.module.css";
import Category from "../../components/todo/Category";
import Today from "../../components/todo/Today";
import Intended from "../../components/todo/Intended";
import CategorySelectBox from "../../components/todo/CategorySelectBox";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callTodayTodoListAPI,
  callIntendedTodoListAPI,
  callCategoryListAPI,
  callTodoRegistAPI,
  callCategoryRegistAPI,
} from "../../apis/TodoAPICalls";

function Todo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const todayList = useSelector((state) => state.todoReducer.todayList);
  const intendedList = useSelector((state) => state.todoReducer.intendedList);
  const categoryList = useSelector((state) => state.todoReducer.categoryList);

  const [chooseCate, setChooseCate] = useState("");

  const chooseCateTodayTodoResult = todayList?.filter(
    (chooseCateTodayTodoResult) =>
      chooseCate === chooseCateTodayTodoResult.cateNo
  );

  const chooseCateIntendedTodoResult = intendedList?.filter(
    (chooseCateIntendedTodoResult) =>
      chooseCate === chooseCateIntendedTodoResult.cateNo
  );

  // 달성률에 나타낼 때 필요한 값들을 변수에 미리 저장
  const todayAllTodo = todayList?.length;
  const todayFinishTodoList = todayList?.filter(
    (today) => today.todoFinish === 1
  );
  const todayFinishTodo = todayFinishTodoList?.length;

  // 위에서 구한 값들로 달성률을 구함
  const achievementRate =
    Math.round((todayFinishTodo / todayAllTodo) * 100 * 10) / 10;

  // 카테고리 선택 창에서 기본적으로 띄워줄 색을 구함
  // const defaultCateColor = categoryList[0]?.cateColor;

  // 중요표시 및 완료여부 관리
  const [checkStarAndFinish, setCheckStarAndFinish] = useState(false);
  // 검색어 관리
  const [search, setSearch] = useState({
    searchWord: "",
  });
  const [newCategory, setNewCategory] = useState({
    cateColor: "#e026b7",
    cateName: "",
  });
  // 카테고리 추가 상태 관리
  const [addAndDeleteCategory, setAddAndDeleteCategory] = useState(false);

  const [inputCateStyle, setInputCateStyle] = useState({ display: "none" });
  // Todo 입력창에서의 카테고리 보일지 말지에 대한 상태 관리
  const [visibleCate, setVisibleCate] = useState(false);
  // Todo 입력창에서의 선택된 카테고리 값 관리 (일단은 중요표시에 대한 색을 초기값으로 넣어둠)
  const [selectedCateColor, setSelectedCateColor] = useState("#F5F937");

  // Todo 입력창에서의 중요표시 관리
  const [addTodoStar, setAddTodoStar] = useState(0);
  // Todo 입력창 값 관리
  const [newTodo, setNewTodo] = useState({
    cateNo: "",
    todoName: "",
    todoDate: "",
    todoTime: "",
    todoStar: addTodoStar,
  });
  // Todo 추가 버튼 상태 관리
  const [addTodo, setAddTodo] = useState(false);

  // 검색어 입력 핸들러
  const onSearchChangeHandler = (e) => {
    const inputSearch = {
      ...search,
      [e.target.name]: e.target.value,
    };

    setSearch(inputSearch);

    // console.log(inputSearch);
  };

  // 검색어 입력 후 값을 보내는 핸들러
  const onEnterkeyHandler = (e) => {
    if (e.key === "Enter") {
      navigate(`/semof/todo/search?s=${search.searchWord}`);
    }
  };

  // 새로운 카테고리 입력 핸들러
  const onChangeAddCategoryHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setNewCategory({
      ...newCategory,
      [e.target.name]: e.target.value,
    });
  };

  // 새로운 카테고리 입력 후 값을 보내는 핸들러
  const onEnterkeyForAddCategoryHandler = (e) => {
    if (e.key === "Enter") {
      const formData = new FormData();

      formData.append("cateName", newCategory.cateName);
      formData.append("cateColor", newCategory.cateColor);
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      formData.append("empNo", decodedUser);

      dispatch(
        callCategoryRegistAPI({
          form: formData,
        })
      );

      setNewCategory({
        ...newCategory,
        cateColor: "#e026b7",
        cateName: "",
      });

      setInputCateStyle({
        display: "none",
      });

      setAddAndDeleteCategory(true);
    }
  };

  // 새로운 Todo 입력 핸들러
  const onInsertTodoHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  // 새로운 Todo 중요표시 여부 핸들러
  const onSetAddStarHandler = () => {
    const value = addTodoStar === 0 ? 1 : 0;
    console.log("value 확인 :", value);

    setNewTodo({
      ...newTodo,
      todoStar: value,
    });
    // 중요한 일은 노란 별, 아니면 빈 별을 보여줘야해서 set으로 상태값을 바꿔줌
    setAddTodoStar(addTodoStar === 0 ? 1 : 0);
    console.log("addTodoStar 확인 : ", addTodoStar);
  };

  // 새로운 Todo 추가 버튼 클릭 핸들러
  const onClickInsertTodoHandler = () => {
    const formData = new FormData();

    if (newTodo.cateNo == null || newTodo.cateNo.length === 0) {
      formData.append("cateNo", categoryList[0].cateNo);
    } else formData.append("cateNo", newTodo.cateNo);

    formData.append("todoName", newTodo.todoName);
    formData.append("todoDate", newTodo.todoDate);
    formData.append("todoTime", newTodo.todoTime);
    formData.append("todoStar", newTodo.todoStar);

    dispatch(
      callTodoRegistAPI({
        form: formData,
      })
    );

    alert("할 일이 정상 등록되었습니다.");
    setAddTodo(true);
  };

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callTodayTodoListAPI(decodedUser));
      dispatch(callIntendedTodoListAPI(decodedUser));
      dispatch(callCategoryListAPI(decodedUser));
    }, // eslint-disable-next-line
    [checkStarAndFinish, addTodo, addAndDeleteCategory]
  );

  useEffect(
    () => {
      setCheckStarAndFinish(false);
      setAddTodo(false);
      setAddAndDeleteCategory(false);
      // setSelectedCateColor(defaultCateColor);
    }, // eslint-disable-next-line
    [checkStarAndFinish, addTodo, addAndDeleteCategory]
  );

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
              onKeyUp={onEnterkeyHandler}
              onChange={onSearchChangeHandler}
              name="searchWord"
            />
          </div>
          {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category
                key={category.cateNo}
                category={category}
                setChooseCate={setChooseCate}
                chooseCate={chooseCate}
                setAddAndDeleteCategory={setAddAndDeleteCategory}
              />
            ))}
          <div className={TodoCSS.inputCateWrapper} style={inputCateStyle}>
            <input
              type="color"
              name="cateColor"
              value={newCategory?.cateColor || ""}
              onChange={onChangeAddCategoryHandler}
              className={TodoCSS.inputCateColor}
            ></input>
            <input
              type="text"
              placeholder="카테고리 이름 입력"
              name="cateName"
              value={newCategory?.cateName || ""}
              onKeyUp={onEnterkeyForAddCategoryHandler}
              onChange={onChangeAddCategoryHandler}
              className={TodoCSS.inputCateName}
            ></input>
            <span
              onClick={() => {
                setInputCateStyle({ display: "none" });
              }}
            >
              x
            </span>
          </div>
          <div
            className={TodoCSS.addCateBtnWrapper}
            onClick={() => {
              setInputCateStyle({ display: "block" });
            }}
          >
            <div> + </div>
            <div> 카테고리 추가</div>
          </div>
        </div>
        <div className={TodoCSS.content}>
          <div className={TodoCSS.addWrapper}>
            <div className={TodoCSS.addInputWrapper}>
              {visibleCate ? (
                <div>
                  <CategorySelectBox
                    categorys={categoryList}
                    setSelectedCateColor={setSelectedCateColor}
                    setVisibleCate={setVisibleCate}
                    setNewTodo={setNewTodo}
                    newTodo={newTodo}
                  />
                </div>
              ) : (
                <div
                  className={TodoCSS.defaultCate}
                  style={{
                    backgroundColor: selectedCateColor,
                    border: "1px solid black",
                  }}
                ></div>
              )}
              <span
                onClick={() => {
                  setVisibleCate(!visibleCate);
                }}
              >
                ▼
              </span>
              <input
                type="text"
                name="todoName"
                onChange={onInsertTodoHandler}
                placeholder="새로운 할 일을 입력하세요"
              />
              {addTodoStar ? (
                <img
                  src={"/images/star_fill.png"}
                  alt="이미지확인!"
                  onClick={onSetAddStarHandler}
                ></img>
              ) : (
                <img
                  src={"/images/star_gray.png"}
                  alt="이미지확인!"
                  onClick={onSetAddStarHandler}
                ></img>
              )}
              {/* <img src={"/images/calendar_gray.png"} alt="이미지확인!"></img> */}
              <input
                type="date"
                name="todoDate"
                onChange={onInsertTodoHandler}
                className={TodoCSS.addInputDate}
              />
              <input
                type="time"
                name="todoTime"
                onChange={onInsertTodoHandler}
                className={TodoCSS.addInputTime}
              />
            </div>
            <button onClick={onClickInsertTodoHandler}>할 일 추가</button>
          </div>
          <div className={TodoCSS.graphWrapper}>
            <div className={TodoCSS.graphTitle}>
              <div> 오늘의 달성률 </div>
              <span> {todayFinishTodo} </span>
              <span> / {todayAllTodo} </span>
            </div>
            <div className={TodoCSS.graph}>
              <div className={TodoCSS.graphOutLine}>
                <div
                  style={
                    isNaN(achievementRate)
                      ? { width: 0 }
                      : { width: `${achievementRate}%` }
                  }
                ></div>
              </div>
              <span> {isNaN(achievementRate) ? 0 : achievementRate}%</span>
            </div>
          </div>
          <div className={TodoCSS.todoList}>
            <div className={TodoCSS.today}>
              <h2> 오늘의 할 일 </h2>
              {chooseCate !== null &&
              chooseCate !== undefined &&
              chooseCate.length !== 0
                ? chooseCateTodayTodoResult?.map((today) => (
                    <Today
                      key={today.todoNo}
                      todo={today}
                      setCheckStarAndFinish={setCheckStarAndFinish}
                    />
                  ))
                : todayList?.map((today) => (
                    <Today
                      key={today.todoNo}
                      todo={today}
                      setCheckStarAndFinish={setCheckStarAndFinish}
                    />
                  ))}
              {/* {Array.isArray(todayList) &&
                todayList.map((today) => (
                  <Today
                    key={today.todoNo}
                    todo={today}
                    setCheckStarAndFinish={setCheckStarAndFinish}
                  />
                ))} */}
            </div>

            <div className={TodoCSS.intended}>
              <h2> 예정된 할 일 </h2>
              {chooseCate !== null &&
              chooseCate !== undefined &&
              chooseCate.length !== 0
                ? chooseCateIntendedTodoResult?.map((intended) => (
                    <Intended
                      key={intended.todoNo}
                      todo={intended}
                      setCheckStarAndFinish={setCheckStarAndFinish}
                    />
                  ))
                : intendedList?.map((intended) => (
                    <Intended
                      key={intended.todoNo}
                      todo={intended}
                      setCheckStarAndFinish={setCheckStarAndFinish}
                    />
                  ))}
              {/* {Array.isArray(intendedList) &&
                intendedList.map((intended) => (
                  <Intended
                    key={intended.todoNo}
                    todo={intended}
                    setCheckStarAndFinish={setCheckStarAndFinish}
                  />
                ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

import TodoSearchCSS from "./TodoSearch.module.css";
import Category from "../../components/todo/Category";
import Intended from "../../components/todo/Intended";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  callCategoryListAPI,
  callSearchTodoAPI,
} from "../../apis/TodoAPICalls";

function TodoSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 쿼리스트링에서 s의 밸류값을 가지고와서 search에 담아줌
  const search = searchParams.get("s");
  // console.log(search);

  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const categoryList = useSelector((state) => state.todoReducer.categoryList);
  const todoSearchResult = useSelector(
    (state) => state.todoReducer.todoSearchList
  );

  // 깃 테스트

  // dlfkladsfjljwlfjljsadflk;

  // 오늘날짜 받아서 지난일정과 안지난일정을 따로 보여줄 수 있도록 => 필터에서 날짜 비교하기?!

  // const [pastTodo, setPastTodo] = useState();
  // const filterPast = todoSearchResult.filter((todoResult) => todoResult.todoDate)
  //   const today = new Date();
  //   console.log(today);

  // ---------------------------------------------------------------------------------

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCategoryListAPI(41));
      dispatch(callSearchTodoAPI(search, 41));
      // console.log(categoryList);
    }, // eslint-disable-next-line
    []
  );

  const onClickBackToTodoHandler = () => {
    navigate(`/semof/todo`);
  };

  return (
    <>
      <div className={TodoSearchCSS.contour}> 할 일 </div>

      <div className={TodoSearchCSS.todoSearchWrapper}>
        <div className={TodoSearchCSS.categoryWrapper}>
          {/* <div className={TodoSearchCSS.searchBox}>
            <img src={"/images/search_gray.png"} alt="이미지확인!"></img>
            <input type="text" placeholder="할 일 검색" name="searchWord" />
          </div> */}
          <div
            className={TodoSearchCSS.backToTodo}
            onClick={onClickBackToTodoHandler}
          >
            <div>←</div>
            <div> 돌아가기</div>
          </div>
          {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category key={category.cateNo} category={category} />
            ))}
        </div>
        <div className={TodoSearchCSS.content}>
          <div className={TodoSearchCSS.searchTitle}>
            <h3> "{search}" </h3>
            <div> 에 대한 검색결과</div>
          </div>
          {Array.isArray(todoSearchResult) &&
            todoSearchResult.map((todoResult) => (
              <Intended key={todoResult.todoNo} todo={todoResult} />
            ))}

          {/* {Array.isArray(todoSearchResult) &&
            todoSearchResult.filter((todoResult) => (
              <Intended
                key={todoResult.todoNo}
                todo={todoResult}
                // setCheckStarAndFinish={setCheckStarAndFinish}
              />
            ))} */}
        </div>
      </div>
    </>
  );
}

export default TodoSearch;

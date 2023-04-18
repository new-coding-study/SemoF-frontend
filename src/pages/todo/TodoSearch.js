import TodoSearchCSS from "./TodoSearch.module.css";
import Category from "../../components/todo/Category";
import Intended from "../../components/todo/Intended";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callCategoryListAPI,
  callSearchTodoAPI,
} from "../../apis/TodoAPICalls";

function TodoSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = window.localStorage.getItem("accessToken");
  let decodedUser = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decodedUser = temp.empNo;
  }

  const [searchParams] = useSearchParams();

  // 쿼리스트링에서 s의 밸류값을 가지고와서 search에 담아줌
  const search = searchParams.get("s");
  // console.log(search);

  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const categoryList = useSelector((state) => state.todoReducer.categoryList);
  const todoSearchResult = useSelector(
    (state) => state.todoReducer.todoSearchList
  );

  // 오늘 날짜를 구해서 yyyy-MM-dd 형식으로 변환해서 dateString 에 담아줌
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  // 위에서 구한 날짜와 할 일의 날짜를 비교해서 이미 지난 할일만 필터링함
  const pastTodoResult = todoSearchResult?.filter(
    (todoResult) => dateString > todoResult.todoDate
  );

  const futureTodoResult = todoSearchResult?.filter(
    (todoResult) => dateString < todoResult.todoDate
  );

  // ---------------------------------------------------------------------------------

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCategoryListAPI(decodedUser));
      dispatch(callSearchTodoAPI(search, decodedUser));
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
          <div className={TodoSearchCSS.resultWrapper}>
            <div className={TodoSearchCSS.pastTodo}>
              <div> 지난 할 일</div>
              {Array.isArray(pastTodoResult) &&
                pastTodoResult.map((pastTodo) => (
                  <Intended key={pastTodo.todoNo} todo={pastTodo} />
                ))}
            </div>
            <div className={TodoSearchCSS.futureTodo}>
              <div> 예정된 할 일 </div>
              {Array.isArray(futureTodoResult) &&
                futureTodoResult.map((futureTodo) => (
                  <Intended key={futureTodo.todoNo} todo={futureTodo} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoSearch;

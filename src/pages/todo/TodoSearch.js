import TodoSearchCSS from "./TodoSearch.module.css";
import Category from "../../components/todo/Category";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";

import {
  callCategoryListAPI,
  callSearchTodoAPI,
} from "../../apis/TodoAPICalls";

function TodoSearch() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  // 쿼리스트링에서 s의 밸류값을 가지고와서 search에 담아줌
  const search = searchParams.get("s");
  // console.log(search);

  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const categoryList = useSelector((state) => state.todoReducer.categoryList);
  console.log(categoryList);

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCategoryListAPI(41));
      dispatch(callSearchTodoAPI(search, 41));
      // console.log(categoryList);
    }, // eslint-disable-next-line
    []
  );

  return (
    <>
      <div className={TodoSearchCSS.contour}> 할 일 </div>

      <div className={TodoSearchCSS.todoWrapper}>
        <div className={TodoSearchCSS.categoryWrapper}>
          <div className={TodoSearchCSS.searchBox}>
            <img src={"/images/search_gray.png"} alt="이미지확인!"></img>
            <input type="text" placeholder="할 일 검색" name="searchWord" />
          </div>
          {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category key={category.cateNo} category={category} />
            ))}
        </div>
        <div className={TodoSearchCSS.content}>
          <div>
            ←<span> 돌아가기</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoSearch;

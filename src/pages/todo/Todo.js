import TodoCSS from "./Todo.module.css";
import Category from "../../components/todo/Category";
import TodoDefault from "../../components/todo/TodoDefault";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { callCategoryListAPI } from "../../apis/TodoAPICalls";

function TodoSearch() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState({
    searchWord: "",
  });

  const [searchEnter, setSearchEnter] = useState(false);

  // console.log(search.searchWord === ""); // true
  // console.log(search.searchWord === null); // false
  // console.log(search.searchWord === undefined); // false

  console.log(searchEnter === true); // true

  // useSelector : store에서 사용하고 있는 state를 전달받아서 다시 전달해주는 역할
  const categoryList = useSelector((state) => state.todoReducer.categoryList);

  useEffect(
    () => {
      // 나중에 localStorage 에서 empNo 받아와서 보내주기!
      dispatch(callCategoryListAPI(41));
    }, // eslint-disable-next-line
    []
  );

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
      // navigate(`/semof/todo/search?s=${search.searchWord}`);
      setSearchEnter(true);
    }
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
              onKeyUp={onEnterkeyHandler}
              onChange={onSearchChangeHandler}
              name="searchWord"
            />
          </div>
          {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category key={category.cateNo} category={category} />
            ))}
        </div>
        <div className={TodoCSS.content}>
          {setSearchEnter ? (
            <TodoSearch />
          ) : (
            <TodoDefault setSearchEnter={setSearchEnter} />
          )}
        </div>
      </div>
    </>
  );
}

export default TodoSearch;

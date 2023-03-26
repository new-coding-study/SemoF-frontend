import TodoCSS from "./Todo.module.css";
import Category from "../../components/todo/Category";
import Today from "../../components/todo/Today";
import Intended from "../../components/todo/Intended";

function Todo() {
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
          <Category /> {/* 리스트로 받아서 for문으로 출력해야함 */}
        </div>
        <div className={TodoCSS.content}>
          <div className={TodoCSS.addTodo}> </div>
          <div className={TodoCSS.graph}></div>
          <div className={TodoCSS.todoList}>
            <Today />
            <Intended />
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

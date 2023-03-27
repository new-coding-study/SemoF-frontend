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
              <Today />
            </div>

            <div className={TodoCSS.intended}>
              <h2> 예정된 할 일 </h2>
              <Intended />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

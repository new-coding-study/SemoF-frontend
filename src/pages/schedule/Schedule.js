import ScheduleCSS from "./Schedule.module.css";

function Schedule() {
  return (
    <>
      <div className={ScheduleCSS.contour}> 일정 </div>

      <div className={ScheduleCSS.todoWrapper}>
        <div className={ScheduleCSS.calendarWrapper}>
          <div className={ScheduleCSS.addScheduleBox}>
            <button
            // onClick={onClickInsertTodoHandler}
            >
              일정 추가
            </button>
          </div>
          {/* {Array.isArray(categoryList) &&
            categoryList.map((category) => (
              <Category
                key={category.cateNo}
                category={category}
                setChooseCate={setChooseCate}
                chooseCate={chooseCate}
                setAddAndDeleteCategory={setAddAndDeleteCategory}
              />
            ))} */}
          <div className={ScheduleCSS.inputCateWrapper}>
            <input
              type="color"
              name="cateColor"
              // value={newCategory?.cateColor || ""}
              // onChange={onChangeAddCategoryHandler}
              className={ScheduleCSS.inputCateColor}
            ></input>
            <input
              type="text"
              placeholder="캘린더 이름 입력"
              name="cateName"
              // value={newCategory?.cateName || ""}
              // onKeyUp={onEnterkeyForAddCategoryHandler}
              // onChange={onChangeAddCategoryHandler}
              className={ScheduleCSS.inputCateName}
            ></input>
            <span
            // onClick={() => {
            //   setInputCateStyle({ display: "none" });
            // }}
            >
              x
            </span>
          </div>
          <div
            className={ScheduleCSS.addCateBtnWrapper}
            // onClick={() => {
            //   setInputCateStyle({ display: "block" });
            // }}
          >
            <div> + </div>
            <div> 캘린더 추가</div>
          </div>
        </div>
        <div className={ScheduleCSS.content}></div>
      </div>
    </>
  );
}

export default Schedule;

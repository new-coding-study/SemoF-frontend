import IntendedCSS from "./Intended.module.css";

function Intended(intendedList) {
  const intended = intendedList.todo;
  // console.log("todo", intended);
  // console.log("intendedList", intendedList);

  // const onChangeHandler = (e) => {
  //   const changeFinish =
  //     intendedList &&
  //     intendedList.map((one) => {
  //       if (one.todoNo === parseInt(e.target.id)) {
  //         one.todoFinish = e.target.checked;
  //         console.log("종료여부 : ", one.todoFinish);
  //         console.log("할일번호 : ", one.todoNo);
  //       }
  //       return one;
  //     });
  // };

  return (
    <>
      <div className={IntendedCSS.todoWrapper}>
        <div
          className={IntendedCSS.colorBar}
          style={{
            backgroundColor: intended.cateColor,
            border: intended.cateColor,
          }}
        ></div>
        <div className={IntendedCSS.contentWrapper}>
          <div className={IntendedCSS.todo}>
            <input
              type="checkbox"
              style={{ accentColor: intended.cateColor }}
              // value={search}
              // onKeyUp={onEnterkeyHandler}
              id={intended.todoNo}
              // onChange={onChangeHandler}
            />
            <label> {intended.todoName} </label>
            <img src={"/images/star_gray.png"} alt="이미지확인!"></img>
          </div>
          <div className={IntendedCSS.date}> {intended.todoDate}</div>
        </div>
      </div>
    </>
  );
}

export default Intended;

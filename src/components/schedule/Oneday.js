import OnedayCSS from "./Oneday.module.css";
import { useDispatch } from "react-redux";
import moment from "moment";

function Oneday({
  day,
  thisMonth,
  setDefaultMode,
  setSearchMode,
  setRegistMode,
  setDefaultDate,
}) {
  const dispatch = useDispatch();

  const testMonth = thisMonth.getMonth() + 1;
  //   console.log(
  //     moment(`${day.year}-${day.month}-${day.date}`).format("YYYY-MM-DD")
  //   );
  const newDate = moment(`${day.year}-${day.month}-${day.date}`).format(
    "YYYY-MM-DD"
  );

  const ondoubleClickRegistScdHandler = (e) => {
    // console.log("더블클릭 이벤트 발생");
    // console.log(e.target.children[0].children[0].textContent);
    const clickDate = e.target.children[0].children[0].textContent;
    setDefaultMode(false);
    setSearchMode(false);
    setRegistMode(true);
    setDefaultDate(clickDate);
  };

  return (
    <>
      <div
        className={OnedayCSS.onedayWrapper}
        style={
          day.month !== testMonth
            ? { color: "#adadad" }
            : day.day === "일"
            ? { color: "red" }
            : day.day === "토"
            ? { color: "blue" }
            : { color: "black" }
        }
        onDoubleClick={ondoubleClickRegistScdHandler}
      >
        <div>
          {day.date}
          <span style={{ display: "none" }}> {newDate} </span>
        </div>
      </div>
    </>
  );
}

export default Oneday;

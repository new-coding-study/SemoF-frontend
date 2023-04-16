import { useEffect } from "react";
import { callBoardNoticeTop3Lists } from "../../apis/BoardAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function BoardNoticeTop3() {
  const notices = useSelector((state) => state?.boardReducer.noticeTopList);
  const noticeList = notices.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(noticeList);

  useEffect(() => {
    dispatch(callBoardNoticeTop3Lists());
  }, []);

  const navigateBoard = () => {
    Swal.fire("게시판으로 이동합니다.", "", "info").then(
      navigate("/semof/board")
    );
  };

  return (
    <>
      <div
        style={{
          // marginTop: "16px",
          // marginLeft: "16px",
          margin: "16px 0 8px 16px",
          textAlign: "left",
          display: "flex",
        }}
      >
        <img
          src={"/images/mainNotice.png"}
          alt="이미지확인!"
          style={{
            width: "18px",
            height: "24px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        ></img>
        <div style={{ marginTop: "2px", fontSize: "18px" }}>공지사항</div>
      </div>
      <table style={{ textAlign: "center", margin: "auto", marginTop: "4px" }}>
        <tbody>
          {Array.isArray(noticeList) &&
            noticeList.map((p) => (
              <tr
                key={p.boardCateCode}
                onClick={navigateBoard}
                style={{
                  height: "16px",
                  //   backgroundColor: "blue",
                }}
              >
                <td
                  style={{
                    borderBottom: "1px solid lightGray",
                  }}
                >
                  <img
                    src={"/images/noticeAlarm.png"}
                    alt="공지사항 이미지"
                    style={{ width: "16px" }}
                  />
                </td>
                <td
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid lightGray",
                    fontSize: "14px",
                  }}
                >
                  {p.boardTitle}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    borderBottom: "1px solid lightGray",
                  }}
                >
                  {p.empName}
                </td>
                <td
                  style={{
                    fontSize: "12px",
                    borderBottom: "1px solid lightGray",
                  }}
                >
                  {p.writeDate}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
export default BoardNoticeTop3;

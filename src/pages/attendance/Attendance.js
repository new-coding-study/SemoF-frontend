import AttendanceCSS from "./Attendance.module.css";
import {
  BsClipboard2Minus,
  BsClipboard2Plus,
  BsFileEarmarkText,
  BsCarFront,
  BsAirplane,
} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  callAttendanceDetailAPI,
  callAttendanceUpdateAPI,
} from "../../apis/AttendanceAPICalls";

function Attendance() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.AttendanceReducer);

  const [empNo, setEmpNo] = useState(2); // 로그인 전까지 값 확인용 상태관리
  const [check, setCheck] = useState(false);

  // 현재 날짜용 (년월일요일 등 근무시간 위에)
  const todayDate = new Date(); //현재 날짜

  let h = todayDate.getHours() < 12 ? "AM" : "PM"; // 구분

  const week = ["일", "월", "화", "수", "목", "금", "토"]; // 요일값

  let newTime = {
    year: String(todayDate.getFullYear()), // 년
    month: String(todayDate.getMonth() + 1).padStart(2, "0"), // 월
    date: String(todayDate.getDate()).padStart(2, "0"), // 일
    day: week[String(todayDate.getDay()).toUpperCase()], // 요일
    hours: String(todayDate.getHours()).padStart(2, "0"), // 시간
    minutes: String(todayDate.getMinutes()).padStart(2, "0"), //현재 분
  };

  // 근무시간 비교용
  // 출근시간 문자열로 받아오는걸 Date형식으로 변환
  const attTime = new Date(status.startTime ?? "00:00:00"); // # 초기값 없다면 00:00:00으로 설정
  // const attTime = new Date('2023-04-04 09:30:00') // 임시확인용

  // 시분초 계산 방식 변경하면서 안 쓰게 됨
  // let oldTime = {
  //     hours: String(attTime.getHours()).padStart(2, "0"), // 시간
  //     minutes: String(attTime.getMinutes()).padStart(2, "0"), //현재 분
  //     seconds: String(attTime.getSeconds()).padStart(2, "0") //현재 초
  // };

  // 문자열로 비교 확인
  // console.log(status.startTime);
  // console.log(`${todayDate.getFullYear()}-${newTime.month}-${newTime.date} ${newTime.hours}:${newTime.minutes}:${todayDate.getSeconds()}`);

  // 출퇴근 시간처리 (최적화g)
  const [nowTime, setNowTime] = useState("00:00:00");
  const [intervalId, setIntervalId] = useState(null);

  // oldDate 전체문장
  // let oldDate = `${String(attTime.getFullYear())}-${String(attTime.getMonth()+1).padStart(2, "0")}-${String(attTime.getDate()).padStart(2, "0")}`;

  useEffect(
    () => {
      dispatch(
        callAttendanceDetailAPI({
          // # 마운트 시작 시 사원 정보 조회
          empNo: empNo,
        })
      );

      let newDate = `${newTime.year}-${newTime.month}-${newTime.date}`;
      let oldDate = String(status.startTime ?? "00:00:00").substring(0, 10); // # oldDate 전체문장과 동일
      console.log("oldDate : " + oldDate);
      console.log("newDate : " + newDate);

      if (oldDate !== newDate) {
        console.log("날짜 비교 타나요");
        // status.statusName = "";
      }

      if (oldDate === newDate && status.statusName === "출근") {
        if (!intervalId) {
          const id = setInterval(() => {
            const todayTime = new Date();
            // 에러 발생 방식 (현재시간 - 출근시간 계산, 60초 넘어갈때 음수)
            // const hours = String(todayTime.getHours() - oldTime.hours).padStart(2, "0");        // # pad 안 붙는거 계산식 순서 바꿔서 해결(계산된 값에 pad)
            // const minutes = String(todayTime.getMinutes() - oldTime.minutes).padStart(2, "0");
            // const seconds = String(todayTime.getSeconds() - oldTime.seconds).padStart(2, "0");

            // 시분초 계산 방식1 (음수일때 양수로 변경 후 다음 단위 변경)
            // const currentSeconds = todayTime.getSeconds();
            // const diffSeconds = currentSeconds - oldTime.seconds;
            // const seconds = String(diffSeconds < 0 ? diffSeconds + 60 : diffSeconds).padStart(2, "0");

            // if (diffSeconds < 0) {
            // todayTime.setMinutes(todayTime.getMinutes() - 1);
            // }

            // const currentMinutes = todayTime.getMinutes();
            // const diffMinutes = currentMinutes - oldTime.minutes;
            // const minutes = String(diffMinutes < 0 ? diffMinutes + 60 : diffMinutes).padStart(2, "0");

            // if (diffMinutes < 0) {
            // todayTime.setHours(todayTime.getHours() - 1);
            // }

            // const currentHours = todayTime.getHours();
            // const diffHours = currentHours - oldTime.hours;
            // const hours = String(diffHours < 0 ? diffHours + 24 : diffHours).padStart(2, "0");
            // setNowTime(`${hours}:${minutes}:${seconds}`);

            // 시분초 계산 방식2 (시간 계산 후 시,분,초 저장)
            const diffTime = todayTime - attTime;
            console.log(diffTime / 1000);
            const seconds = String(Math.floor((diffTime / 1000) % 60)).padStart(
              2,
              "0"
            );
            const minutes = String(
              Math.floor((diffTime / 1000 / 60) % 60)
            ).padStart(2, "0");
            const hours = String(
              Math.floor((diffTime / 1000 / 60 / 60) % 24)
            ).padStart(2, "0");
            setNowTime(`${hours}:${minutes}:${seconds}`);
          }, 1000);
          setIntervalId(id);
        }
      }
      setCheck(false);
      // console.log('JS check : ' + check)
    }, // eslint-disable-next-line
    [check]
  );

  // 출근 버튼
  const onClickStartAttendanceHandler = async () => {
    // # 비동기 순서를 지정해 업데이트 이후 정보 조회 하도록 설정

    await dispatch(
      callAttendanceUpdateAPI({
        empNo: empNo,
      })
    );

    await dispatch(
      callAttendanceDetailAPI({
        // # setCheck으로 재렌더링 시켜서 이펙트안에 조회함수 다시 발생 안 돼서 추가로 조회 실행
        empNo: empNo,
      })
    );

    setCheck(true);
  };

  // 퇴근 버튼
  const onClickStopAttendanceHandler = async () => {
    // # 컨펌창 띄우고 시간 확인시켜주고 해야함
    await dispatch(
      callAttendanceUpdateAPI({
        // # 문제발생
        empNo: empNo,
      })
    );

    await dispatch(
      callAttendanceDetailAPI({
        empNo: empNo,
      })
    );

    clearInterval(intervalId);
    setIntervalId(null);
    setNowTime("00:00:00");
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId); // 인터벌 클린업 (강제 종료)
    };
  }, [intervalId]);

  // # 문자열로 출근값 뽑고 현재값 문자열로 변환해서 비교 시도 / 결과 : NaN
  //   const dada = `${todayDate.getFullYear()}-${time.month}-${time.date} ${time.hours}:${time.minutes}:${todayDate.getSeconds()}`
  //   console.log(dada - status.startTime);

  // # 날짜 형태로 비교 시도  / 결과 : 잘 나옴 (결과엔 pad 적용 안 됨)
  //   const newDate = new Date();
  //   const oldDate = new Date('2023-04-03 17:00:00')

  //   console.log(newDate);
  //   console.log(oldDate);

  //   console.log(newDate - oldDate);

  //   console.log((String(newDate.getHours()).padStart(2, "0") - String(oldDate.getHours()).padStart(2, "0")));
  //   console.log(String(newDate.getMinutes()).padStart(2, "0") - String(oldDate.getMinutes()).padStart(2, "0"));
  //   console.log(String(newDate.getSeconds()) - String(oldDate.getSeconds()).padStart(2, "0"));

  // # toLocaleString메소드를 이용한 사용자 지정 형식
  //   console.log(todayDate.toLocaleString('ko-KR', {
  //     weekday: 'short', // long, short, narrow
  //     day: '2-digit', // numeric, 2-digit
  //     year: '2-digit', // numeric, 2-digit
  //     month: 'long', // numeric, 2-digit, long, short, narrow
  //     hour: 'numeric', // numeric, 2-digit
  //     minute: 'numeric', // numeric, 2-digit
  //     second: 'numeric', // numeric, 2-digit
  // }));
  // Output: Tue, July 21, 2020, 10:01:14 AM

  // useInterval(()=>{
  //     setNowTime(Date.now())
  // },1000)
  // # pad 대신 10이하일때 0 붙이기
  // if (status.usedHalf < 10) {
  //     status.usedHalf = '0' + status.usedHalf
  // }
  // if (status.usedDays < 10) {
  //     status.usedDays = '0' + status.usedDays
  // }
  // if (status.leftDays < 10) {
  //     status.leftDays = '0' + status.leftDays
  // }    #총 사용 연차에서 문자열 합쳐지는 문제 발생

  // const token = decodeJwt(window.localStorage.getItem("accessToken"));

  return (
    <div>
      <div className={AttendanceCSS.contour}> 근태 </div>

      <div style={{ height: "800px", minWidth: "1680px" }}>
        <div className={AttendanceCSS.horizontalDiv}>
          <div className={AttendanceCSS.attendance}>
            <div>
              <span>
                {h} {newTime.hours}:{newTime.minutes} {newTime.month}/
                {newTime.date}({newTime.day})
              </span>
            </div>
            <br></br>
            <span className={AttendanceCSS.empName}>
              <strong>{status.empName}</strong>님의 근무시간은
            </span>
            <br></br>
            <span className={AttendanceCSS.time}>{nowTime}</span>
            <div className={AttendanceCSS.btnAtd}>
              {status.statusName === "출근" ? (
                <button
                  style={{
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  출근
                </button>
              ) : (
                <button onClick={onClickStartAttendanceHandler}>출근</button>
              )}
              {status.statusName === "퇴근" ? (
                <button
                  style={{
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                    pointerEvents: "none",
                  }}
                >
                  퇴근
                </button>
              ) : (
                <button onClick={onClickStopAttendanceHandler}>퇴근</button>
              )}
            </div>
          </div>
          <div className={AttendanceCSS.approvals}>
            <div className={AttendanceCSS.approvalsContent}>
              <NavLink to="/sticker/types/2" style={{ textDecoration: "none" }}>
                <div>
                  <BsClipboard2Minus />
                </div>
                <span>반차신청</span>
              </NavLink>
            </div>
            <div className={AttendanceCSS.approvalsContent}>
              <NavLink to="/sticker/types/2" style={{ textDecoration: "none" }}>
                <div>
                  <BsClipboard2Plus />
                </div>
                <span>연차신청</span>
              </NavLink>
            </div>
            <div className={AttendanceCSS.approvalsContent}>
              <NavLink to="/sticker/types/2" style={{ textDecoration: "none" }}>
                <div>
                  <BsFileEarmarkText />
                </div>
                <span>연장근로신청</span>
              </NavLink>
            </div>
            <div className={AttendanceCSS.approvalsContent}>
              <NavLink to="/sticker/types/2" style={{ textDecoration: "none" }}>
                <div>
                  <BsCarFront />
                </div>
                <span>외출신청</span>
              </NavLink>
            </div>
            <div className={AttendanceCSS.approvalsContent}>
              <NavLink to="/sticker/types/2" style={{ textDecoration: "none" }}>
                <div>
                  <BsAirplane />
                </div>
                <span>출장신청</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={AttendanceCSS.middleContent}>
          <div className={AttendanceCSS.vacation}>
            <span className={AttendanceCSS.totalVacation}>
              - 연차 사용 현황
            </span>
            <span>기본 연차 : {status.allDays}개</span>
            <div className={AttendanceCSS.vacationDiv}>
              <div>
                <span>사용한 반차</span>
                <span>{status.usedHalf}개</span>
              </div>
              <div>
                <span>사용한 연차</span>
                <span>{status.usedDays}개</span>
              </div>
              <div>
                <span>총 사용 연차</span>
                <span>{status.usedDays + status.usedHalf / 2}개</span>
              </div>
              <div>
                <span>사용가능한 연차</span>
                <span>{status.leftDays}개</span>
              </div>
            </div>
          </div>
          <div
            className={AttendanceCSS.totalAttendance}
            style={{ border: "1px solid black" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;

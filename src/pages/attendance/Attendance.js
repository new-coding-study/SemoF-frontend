import AttendanceCSS from './Attendance.module.css';
import { BsClipboard2Minus, BsClipboard2Plus, BsFileEarmarkText, BsCarFront,  BsAirplane } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Swal from 'sweetalert2';

import {
    callAttendanceDetailAPI,
    callAttendanceUpdateAPI,
    callAttendanceListAPI
} from '../../apis/AttendanceAPICalls';

function Attendance() {
    const dispatch = useDispatch();
    const status  = useSelector(state => state.AttendanceReducer.attendanceStatus);
    const statusList  = useSelector(state => state.AttendanceReducer.attendanceList);
    const putStatus  = useSelector(state => state.AttendanceReducer.updateAttendance); // # 리듀서를 복사해서 같은 곳을 참조하지만 다른 값을 가지게 설정
    // console.log('statusList : ' + statusList);
    
    // const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [empNo, setEmpNo] = useState(1);      // # 로그인 기능 구현 전까지 값 확인용 상태관리
    const [check, setCheck] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [nowTime, setNowTime] = useState("00:00:00");
    
    const [currentPage, setCurrentPage] = useState(1);
    const attendanceList = statusList.data;
    // console.log('attendanceList : ' + attendanceList)
    const pageInfo = statusList.pageInfo;
    // console.log('pageInfo : ' + pageInfo)

    //페이징
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    } 
    
                                                                        // moment 버전
    
    // 현재 날짜용 (년월일요일 등 근무시간 위에)
    const todayDate = new Date();   //현재 날짜

    let condition = todayDate.getHours() < 12 ? "AM" : "PM"; // 시간 구분

    const week = ['일', '월', '화', '수', '목', '금', '토'] // 요일 배열

    // 현재 날짜 문자열 처리 (퇴근시간 고정 (렌더링 됐을때 시간 저장), 현재시간 시계)
    let newTime = {
        year: String(todayDate.getFullYear()),                   // 년
        month: String(todayDate.getMonth()+1).padStart(2, "0"), // 월
        date: String(todayDate.getDate()).padStart(2, "0"), // 일
        day: week[String(todayDate.getDay()).toUpperCase()], // 요일
        hours: String(todayDate.getHours()).padStart(2, "0"), // 시
        minutes: String(todayDate.getMinutes()).padStart(2, "0"), //분
        seconds: String(todayDate.getSeconds()).padStart(2, "0"), //초
    };    
    
    //근무기록 상 현재 근무시간 계산
    function attenMinus(endTime, startTime){
        endTime = endTime===null ? new Date() : endTime;
        startTime = startTime===null ? "" : startTime;
        
        const oldStatus = {endTime, startTime};
        // console.log('oldStatus' + oldStatus)
        // console.log('calculateTime' + calculateTime(oldStatus));
        
        return calculateTime(oldStatus);
    }
    
    // 날짜 문자열 처리 함수
    const formatDate = (date) => {
        return {
            year: date.getFullYear().toString(),
            month: (date.getMonth() + 1).toString().padStart(2, "0"),
            date: date.getDate().toString().padStart(2, "0"),
            day: week[date.getDay()].toUpperCase(),
            hours: date.getHours().toString().padStart(2, "0"),
            minutes: date.getMinutes().toString().padStart(2, "0"),
            seconds: date.getSeconds().toString().padStart(2, "0")
        }
    }
    
    // 시분초 계산 함수 (근무시간) Date.now()
    function calculateTime(status) {
        const startTime = Date.parse(status.startTime || "00:00:00");
        const endTime = Date.parse(status.endTime || "00:00:00");
        const diffTime = status.statusName === "출근" ? new Date() - startTime : endTime - startTime;
        // console.log('startTime : ' + startTime);
        // console.log('endTime : ' + endTime);
        // console.log('diffTime : ' + diffTime);

        const seconds = String(Math.floor(diffTime / 1000) % 60).padStart(2, "0");
        const minutes = String(Math.floor(diffTime / (1000 * 60)) % 60).padStart(2, "0");
        const hours = String(Math.floor(diffTime / (1000 * 60 * 60)) % 24).padStart(2, "0");
        // console.log(`${hours}:${minutes}:${seconds}`);
        
        return `${hours}:${minutes}:${seconds}`;
    }
    
    // 근태 상태에 따라 시분초 계산 함수 실행
    useEffect(() => {
        if (status.statusName === "출근" || status.statusName === "퇴근") {
            setNowTime(calculateTime(status));
        }
    }, [status]);
    
     // 스톱워치
    useEffect(
        () => {
            dispatch(callAttendanceDetailAPI({                                      // # 마운트 시작 시 사원 정보 조회
                empNo : empNo
            }));

            let newIntervalTime = formatDate(todayDate);    // 함수 사용해 반복마다 날짜 구해서 시분초 대입
            let newDate = `${newIntervalTime.year}-${newIntervalTime.month}-${newIntervalTime.date}`;
            let oldDate = String(status.startTime ?? "00:00:00").substring(0, 10);
            // console.log('oldDate : ' + oldDate)
            // console.log('newDate : ' + newDate)

            if (oldDate === newDate && status.statusName === "출근") {
                const id = setInterval(() => {
                    // 계산식 함수 사용 방식
                    setNowTime(calculateTime(status));
                }, 1000);
                setIntervalId(id);
            }
            setCheck(false);
        } // eslint-disable-next-line
        ,[check]
    );
    
    //근무 기록
    useEffect(
        () => {
            // setStart((currentPage - 1) * 5);
            dispatch(callAttendanceListAPI({
                empNo: empNo,
                currentPage: currentPage
            }));
            }
          // eslint-disable-next-line
        ,[currentPage, putStatus]
    );

    // 출근 버튼
    const onClickStartAttendanceHandler = async () => {     // # 비동기 순서를 지정해 업데이트 이후 정보 조회 하도록 설정

        const newStartDate = new Date();    // 출근 클릭 시 새로운 날짜 받아서 함수 사용해 날짜 저장 후 전달
        let newStartTime = formatDate(newStartDate);
        
        await dispatch(callAttendanceUpdateAPI({          
            empNo : empNo,
            nowTime : `${newStartTime.year}-${newStartTime.month}-${newStartTime.date} ${newStartTime.hours}:${newStartTime.minutes}:${newStartTime.seconds}`
        }));

        await dispatch(callAttendanceDetailAPI({            // # setCheck으로 재렌더링 시켜서 이펙트안에 조회함수 다시 발생 안 돼서 추가로 조회 실행
            empNo : empNo
        }));

        setCheck(true);         // # 상태 변경하여 반복(useEffect) 실행
    };

    // 퇴근 버튼
    const onClickStopAttendanceHandler = () => {
    
        setIntervalId(null);        // # 퇴근 클릭 시 반복을 멈춰 시간 고정
        setNowTime(nowTime);    // # 멈췄을때의 시간을 설정하여 표시
    
        Swal.fire({
            icon: 'question',
            title: '정말 퇴근하시겠습니까?',
            text: `현재까지 근무 시간은 ${nowTime} 입니다.`,
            showDenyButton: true,
            confirmButtonText: '아니오',
            denyButtonText: `예`,
          }).then(async (result) => {        // # 핸들러에 있던 비동기 처리(async)
            if (result.isDenied) {
                Swal.fire('퇴근 완료!', '', 'success')
                
                await dispatch(callAttendanceUpdateAPI({ 
                    empNo : empNo,
                    nowTime : `${newTime.year}-${newTime.month}-${newTime.date} ${newTime.hours}:${newTime.minutes}:${newTime.seconds}` // 렌더링 후 인터벌 멈췄을때 값 저장
                }));
        
                await dispatch(callAttendanceDetailAPI({
                    empNo : empNo
                }));
        
            } else {
                setCheck(true);         // # 상태 변경하여 다시 반복 실행
            }
        })
    };

    // 인터벌 클린업 (강제 종료)
    useEffect(() => {
        return () => {
            clearInterval(intervalId);                  
        };
    }, [intervalId]);

    return (
        <div>
            <div className={AttendanceCSS.contour}> 근태 </div>

            <div style={{minWidth:'1680px'}}>
                <div className={ AttendanceCSS.horizontalDiv }>
                    <div className={ AttendanceCSS.attendance }>
                        <div>
                            <span>{condition} {newTime.hours}:{newTime.minutes} {newTime.month}/{newTime.date}({newTime.day})</span>
                        </div>
                        <br></br>
                        <span className={ AttendanceCSS.empName }><strong>{status.empName}</strong>님의 근무시간은</span>
                        <br></br>
                        <span className={ AttendanceCSS.time }>{nowTime}</span>
                        <div className={ AttendanceCSS.btnAtd }>
                            {status.statusName === "출근" ? <button style={{background:'red', color:'white', fontWeight:'bold', pointerEvents:'none'}}>출근</button> : 
                            <button onClick={onClickStartAttendanceHandler}>출근</button>}
                            {status.statusName === "퇴근" ? <button style={{background:'red', color:'white', fontWeight:'bold', pointerEvents:'none'}}>퇴근</button> : 
                            status.statusName !== "출근" ? <button style={{color:'gray', pointerEvents:'none'}}>퇴근</button> : 
                            <button onClick={onClickStopAttendanceHandler}>퇴근</button>}
                        </div>
                    </div>
                    <div className={ AttendanceCSS.approvals }>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/attendance/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsClipboard2Minus/>
                                </div>
                                <span>반차신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/attendance/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsClipboard2Plus/>
                                </div>
                                <span>연차신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/attendance/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsFileEarmarkText/>
                                </div>
                                <span>연장근로신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/attendance/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsCarFront/>
                                </div>
                                <span>외출신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/attendance/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsAirplane/>
                                </div>
                                <span>출장신청</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={ AttendanceCSS.middleContent }>
                    <div className={ AttendanceCSS.vacation }>
                        <span className={ AttendanceCSS.totalVacation }>  연차 사용 현황</span>
                        <span>기본 연차 : {status.allDays}개</span>
                        <div className={ AttendanceCSS.vacationDiv }>
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
                                <span>{status.usedDays + (status.usedHalf / 2)}개</span>
                            </div>
                            <div>
                                <span>사용가능한 연차</span>
                                <span>{status.leftDays}개</span>
                            </div>
                            </div>
                    </div>
                </div>
                <div>
                    {/* <AttendanceList/> */}
                    <div className={ AttendanceCSS.bodyDiv }>
                        <table className={ AttendanceCSS.attendanceTable }>
                            <colgroup>
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                <th>근무일</th>
                                <th>출근 시간</th>
                                <th>퇴근 시간</th>
                                <th>근무 시간</th>
                                <th>상태</th>
                                </tr>
                            </thead>
                            <tbody>
                            { Array.isArray(attendanceList) && attendanceList.map((p) => (
                                <tr key={p.atdNo}>
                                <td>{ p.atdDate===null ? "" : p.atdDate.substring(0, 10) } ({week[String(new Date(p.atdDate).getDay()).toUpperCase()]})</td>
                                <td>{ p.startTime===null ? "" : p.startTime.substring(10) }</td>
                                <td>{ p.endTime===null ? "" : p.endTime.substring(10) }</td>
                                <td>{ attenMinus(p.endTime, p.startTime) }</td>
                                <td>{ p.finalStatus>=90000 ? "정상출근" : p.finalStatus>=45000 ? "비정상출근" : "결근"}</td>
                                </tr>
                            ))}
                            </tbody>                    
                        </table>
                    </div>
                    <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
                        { Array.isArray(attendanceList) &&
                        <button 
                            onClick={() => setCurrentPage(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className={ AttendanceCSS.pagingBtn }
                        >
                            &lt;
                        </button>
                        }
                        {pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={ currentPage === num ? {backgroundColor : '#E52E2E', color:'white' } : null}
                                className={ AttendanceCSS.pagingBtn }
                            >
                                {num}
                            </button>
                        </li>
                        ))}
                        { Array.isArray(attendanceList) &&
                        <button 
                            className={ AttendanceCSS.pagingBtn }
                            onClick={() => setCurrentPage(currentPage + 1)} 
                            disabled={currentPage === pageInfo.endPage || pageInfo.totalCount === 0}
                        >
                            &gt;
                        </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
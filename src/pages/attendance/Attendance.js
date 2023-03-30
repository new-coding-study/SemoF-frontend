import AttendanceCSS from './Attendance.module.css';
import { BsClipboard2Minus, BsClipboard2Plus, BsFileEarmarkText, BsCarFront,  BsAirplane } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux';

function Main() {
    return (
        <div>
            <div className={AttendanceCSS.contour}> 근태 </div>

            <div style={{height:'800px', border:'1px solid black'}}>
                <div className={ AttendanceCSS.horizontalDiv } style={{border:'1px solid red'}}>
                    <div className={ AttendanceCSS.attendance }>
                        <div>
                            <span>AM 09:00 03/03(금)</span>
                        </div>
                        <br></br>
                        <span className={ AttendanceCSS.empName }><strong>공성식</strong>님의 근무시간은</span>
                        <br></br>
                        <span className={ AttendanceCSS.time }>00:32:59</span>
                        <div className={ AttendanceCSS.btnAtd }>
                            <button>출근</button>
                            <button>퇴근</button>
                        </div>
                    </div>
                    <div className={ AttendanceCSS.approvals }>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/sticker/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsClipboard2Minus/>
                                </div>
                                <span>반차신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/sticker/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsClipboard2Plus/>
                                </div>
                                <span>연차신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/sticker/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsFileEarmarkText/>
                                </div>
                                <span>연장근로신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/sticker/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsCarFront/>
                                </div>
                                <span>외출신청</span>
                            </NavLink>
                        </div>
                        <div className={ AttendanceCSS.approvalsContent }>
                            <NavLink to="/sticker/types/2" style={{textDecoration:'none'}}>
                                <div>
                                    <BsAirplane/>
                                </div>
                                <span>출장신청</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={ AttendanceCSS.middleContent } style={{border:'1px solid black'}}>
                    <div className={ AttendanceCSS.vacation }>
                        <span className={ AttendanceCSS.totalVacation }>- 연차 사용 현황</span>
                        <span>기본 연차 : 15개</span>
                        <div className={ AttendanceCSS.vacationDiv }>
                            <div>
                                <span>사용한 반차</span>
                                <span>01개</span>
                            </div>
                            <div>
                                <span>사용한 연차</span>
                                <span>01개</span>
                            </div>
                            <div>
                                <span>총 사용 연차</span>
                                <span>1.5개</span>
                            </div>
                            <div>
                                <span>사용가능한 연차</span>
                                <span>13.5개</span>
                            </div>
                            </div>
                    </div>
                    <div className={ AttendanceCSS.totalAttendance } style={{border:'1px solid black'}}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
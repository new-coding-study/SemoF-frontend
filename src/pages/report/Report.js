import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import reportcss from "./Report.module.css"
import { decodeJwt } from "../../utils/tokenUtils";


function Report(){
    const navigate = useNavigate();


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }

    const worksReportEmp = () => {
        navigate("/semof/works-report-emp", {replace: false})
    }

    const worksReport = () => {
        navigate("/semof/works-report-admin", {replace: false})
    }

    const salesReportEmp = () => {
        navigate("/semof/sales-report-emp", {replace: false})
    }

    const salesReportAdmin = () => {
        navigate("/semof/sales-report-admin", {replace: false})
    }

    const tripReportEmp = () => {
        navigate("/semof/trip-report-emp", {replace: false})
    }

    const tripReportAdmin = () => {
        navigate("/semof/trip-report-admin", {replace: false})
    }

    const meetingEmp = () => {
        navigate("/semof/meeting-report-emp", {replace: false})
    }  

    const meetingAdmin = () => {
        navigate("/semof/meeting-report-admin", {replace: false})
    }
    return(
        <>
        <div>
            <div className={reportcss.title}>보고서</div>
            <br/><br/>
            <div className={reportcss.wholeContent}>
            <div className={reportcss.elkArea}>
            </div>
            <div className={reportcss.reportsbtnArea}>
                {decoded === "ROLE_USER"? 
                <button className={reportcss.worksbtn} onClick={worksReportEmp}>업무보고서</button>:
                <button className={reportcss.worksbtn} onClick={worksReport}>업무보고서</button>
                }
                <br/>
                {decoded === "ROLE_USER"?
                <button className={reportcss.salesbtn} onClick={salesReportEmp}>영업보고서</button>:
                <button className={reportcss.salesbtn} onClick={salesReportAdmin}>영업보고서</button>            
                }
                <br/>
                {decoded === "ROLE_USER"?
                <button className={reportcss.meetingbtn} onClick={meetingEmp}>회의보고서</button>:
                <button className={reportcss.meetingbtn} onClick={meetingAdmin}>회의보고서</button>
                }
                <br/>
                {decoded === "ROLE_USER"?
                <button className={reportcss.tripbtn} onClick={tripReportEmp}>출장보고서</button>:
                <button className={reportcss.tripbtn} onClick={tripReportAdmin}>출장보고서</button>
                }
                <br/>
                <button className={reportcss.main} onClick={()=> navigate("/semof")}>메인으로</button>
            </div>
            </div>
        </div>
        </>
    );

}export default Report;
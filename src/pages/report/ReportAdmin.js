import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import reportcss from "./Report.module.css"


function ReportAdmin(){
    const navigate = useNavigate();


    const worksReport = () => {
        navigate("/semof/works-report-admin", {replace: false})
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
                <button className={reportcss.worksbtn} onClick={worksReport}>업무보고서</button>
                <br/>
                <button className={reportcss.salesbtn}>영업보고서</button>
                <br/>
                <button className={reportcss.meetingbtn}>회의보고서</button>
                <br/>
                <button className={reportcss.tripbtn}>출장보고서</button>
                
            </div>
            </div>
        </div>
        </>
    );

}export default ReportAdmin;
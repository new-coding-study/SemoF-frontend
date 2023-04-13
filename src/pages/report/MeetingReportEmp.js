import meetingCss from "./MeetingCss.module.css";
import {useState, useEffect} from "react"
import MeetingAllForEmp from "../../components/meetingReport/MeetingAllForEmp";
import NStatusForEmp from "../../components/meetingReport/NStatusForEmp";
import YStatusForEmp from "../../components/meetingReport/YStatusForEmp";
import { decodeJwt } from "../../utils/tokenUtils";

function MeetingReportEmp(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isMeetingAllEmp, setIsMeetingAllEmp] = useState(true);
    const [isNStatusEmp, setIsNStatusEmp] = useState(false);
    const [isYStatusEmp, setIsYStatusEmp] = useState(false);

    const handleAllList = () =>{
        setIsMeetingAllEmp(true);
        setIsNStatusEmp(false);
        setIsYStatusEmp(false);  
    }

    const handleNList = () =>{
        setIsMeetingAllEmp(false)
        setIsNStatusEmp(true)
        setIsYStatusEmp(false)

    }

    const handleYList = () =>{
        setIsMeetingAllEmp(false);
        setIsNStatusEmp(false);
        setIsYStatusEmp(true);
    }


    return(
        <>
        <div>
        <div className={meetingCss.title}>회의보고서</div>
        <br/>
        <div className={meetingCss.btnArea}>
        <button onClick={handleAllList}>
            전체 
        </button> &nbsp;
        <button onClick={handleYList}>
            읽은 보고서
        </button> &nbsp;
        <button onClick={handleNList}>
            읽지 않은 보고서
        </button>
        </div>
        <br/>
        <div className={meetingCss.listArea}>
            <div>
            {isNStatusEmp? <NStatusForEmp setIsNStatusEmp={setIsNStatusEmp}/>:null}
            {isMeetingAllEmp? <MeetingAllForEmp setIsMeetingAllEmp={setIsMeetingAllEmp}/>:null}
            {isYStatusEmp? <YStatusForEmp setIsYStatusEmp={setIsYStatusEmp}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default MeetingReportEmp;
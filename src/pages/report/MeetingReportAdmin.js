import meetingCss from "./MeetingCss.module.css";
import {useState, useEffect} from "react"
import MeetingAll from "../../components/meetingReport/MeetingAll";
import NStatus from "../../components/meetingReport/NStatus";
import YStatus from "../../components/meetingReport/YStatus";
import { decodeJwt } from "../../utils/tokenUtils";

function MeetingReportAdmin(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isMeetingAll, setIsMeetingAll] = useState(true);
    const [isNStatus, setIsNStatus] = useState(false);
    const [isYStatus, setIsYStatus] = useState(false);

    const handleAllList = () =>{
        setIsMeetingAll(true);
        setIsNStatus(false);
        setIsYStatus(false);  
    }

    const handleNList = () =>{
        setIsMeetingAll(false)
        setIsNStatus(true)
        setIsYStatus(false)

    }

    const handleYList = () =>{
        setIsMeetingAll(false);
        setIsNStatus(false);
        setIsYStatus(true);
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
            {isNStatus? <NStatus setIsNStatus={setIsNStatus}/>:null}
            {isMeetingAll? <MeetingAll setIsMeetingAll={setIsMeetingAll}/>:null}
            {isYStatus? <YStatus setIsYStatus={setIsYStatus}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default MeetingReportAdmin;
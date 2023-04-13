import tripCss from "./TripCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import TripAll from "../../components/tripReport/TripAll";
import NStatus from "../../components/tripReport/NStatus";
import YStatus from "../../components/tripReport/YStatus";
import { decodeJwt } from "../../utils/tokenUtils";

function TripReportAdmin(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isTripAll, setIsTripAll] = useState(true);
    const [isNStatus, setIsNStatus] = useState(false);
    const [isYStatus, setIsYStatus] = useState(false);

    const handleAllList = () =>{
        setIsTripAll(true);
        setIsNStatus(false);
        setIsYStatus(false);  
    }

    const handleNList = () =>{
        setIsTripAll(false)
        setIsNStatus(true)
        setIsYStatus(false)

    }

    const handleYList = () =>{
        setIsTripAll(false);
        setIsNStatus(false);
        setIsYStatus(true);
    }


    return(
        <>
        <div>
        <div className={tripCss.title}>출장보고서</div>
        <br/>
        <br/>
        <div className={tripCss.btnArea}>
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
        <div className={tripCss.listArea}>
            <div>
            {isNStatus? <NStatus setIsNStatus={setIsNStatus}/>:null}
            {isTripAll? <TripAll setIsTripAll={setIsTripAll}/>:null}
            {isYStatus? <YStatus setIsYStatus={setIsYStatus}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default TripReportAdmin;
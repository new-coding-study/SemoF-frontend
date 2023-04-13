import tripCss from "./TripCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import TripAllForEmp from "../../components/tripReport/TripAllForEmp";
import NStatusForEmp from "../../components/tripReport/NStatusForEmp";
import YStatusForEmp from "../../components/tripReport/YStatusForEmp";
import { decodeJwt } from "../../utils/tokenUtils";

function TripReportEmp(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isTripAllEmp, setIsTripAllEmp] = useState(true);
    const [isNStatusEmp, setIsNStatusEmp] = useState(false);
    const [isYStatusEmp, setIsYStatusEmp] = useState(false);

    const handleAllList = () =>{
        setIsTripAllEmp(true);
        setIsNStatusEmp(false);
        setIsYStatusEmp(false);  
    }

    const handleNList = () =>{
        setIsTripAllEmp(false)
        setIsNStatusEmp(true)
        setIsYStatusEmp(false)

    }

    const handleYList = () =>{
        setIsTripAllEmp(false);
        setIsNStatusEmp(false);
        setIsYStatusEmp(true);
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
            {isNStatusEmp? <NStatusForEmp setIsNStatusEmp={setIsNStatusEmp}/>:null}
            {isTripAllEmp? <TripAllForEmp setIsTripAllEmp={setIsTripAllEmp}/>:null}
            {isYStatusEmp? <YStatusForEmp setIsYStatusEmp={setIsYStatusEmp}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default TripReportEmp;
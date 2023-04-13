import salescss from "./SalesCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import SalesAll from "../../components/salesReport/SalesAll";
import NStatus from "../../components/salesReport/NStatus";
import YStatus from "../../components/salesReport/YStatus";
import { decodeJwt } from "../../utils/tokenUtils";

function SalesReportAdmin(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isSalesAll, setIsSalesAll] = useState(true);
    const [isNStatus, setIsNStatus] = useState(false);
    const [isYStatus, setIsYStatus] = useState(false);

    const handleAllList = () =>{
        setIsSalesAll(true);
        setIsNStatus(false);
        setIsYStatus(false);  
    }

    const handleNList = () =>{
        setIsSalesAll(false);
        setIsNStatus(true);
        setIsYStatus(false);

    }

    const handleYList = () =>{
        setIsSalesAll(false);
        setIsNStatus(false);
        setIsYStatus(true);
    }


    return(
        <>
        <div>
        <div className={salescss.title}>영업보고서</div>
        <br/>
        <br/>
        <div className={salescss.btnArea}>
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
        <div className={salescss.listArea}>
            <div>
            {isSalesAll? <SalesAll setIsSalesAll={setIsSalesAll}/>:null}
            {isNStatus? <NStatus setIsNStatus={setIsNStatus}/>:null}
            {isYStatus? <YStatus setIsYStatus={setIsYStatus}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default SalesReportAdmin;
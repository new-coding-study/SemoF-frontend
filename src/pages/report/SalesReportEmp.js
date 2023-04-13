import workscss from "./SalesCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import SalesAllForEmp from "../../components/salesReport/SalesAllForEmp";
import NStatusForEmp from "../../components/salesReport/NStatusForEmp";
import YStatusForEmp from "../../components/salesReport/YStatusForEmp";
import { decodeJwt } from "../../utils/tokenUtils";

function SalesReportEmp(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isSalesAllEmp, setIsSalesAllEmp] = useState(true);
    const [isNStatusEmp, setIsNStatusEmp] = useState(false);
    const [isYStatusEmp, setIsYStatusEmp] = useState(false);

    const handleAllList = () =>{
        setIsSalesAllEmp(true);
        setIsNStatusEmp(false);
        setIsYStatusEmp(false);  
    }

    const handleNList = () =>{
        setIsSalesAllEmp(false)
        setIsNStatusEmp(true)
        setIsYStatusEmp(false)

    }

    const handleYList = () =>{
        setIsSalesAllEmp(false);
        setIsNStatusEmp(false);
        setIsYStatusEmp(true);
    }


    return(
        <>
        <div>
        <div className={workscss.title}>영업보고서</div>
        <br/>
        <div className={workscss.btnArea}>
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
        <div className={workscss.listArea}>
            <div>
            {isSalesAllEmp? <SalesAllForEmp setIsSalesAllEmp={setIsSalesAllEmp}/>:null}
            {isNStatusEmp? <NStatusForEmp setIsNStatusEmp={setIsNStatusEmp}/>:null}
            {isYStatusEmp? <YStatusForEmp setIsYStatusEmp={setIsYStatusEmp}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default SalesReportEmp;
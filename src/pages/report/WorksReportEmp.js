import workscss from "./WorksCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import WorksAllForEmp from "../../components/worksReport/WorksAllForEmp";
import NStatusForEmp from "../../components/worksReport/NStatusForEmp";
import YStatusForEmp from "../../components/worksReport/YStatusForEmp";
import { decodeJwt } from "../../utils/tokenUtils";

function WorksReportEmp(){

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }


    const [isWorksAllEmp, setIsWorksAllEmp] = useState(true);
    const [isNStatusEmp, setIsNStatusEmp] = useState(false);
    const [isYStatusEmp, setIsYStatusEmp] = useState(false);

    const handleAllList = () =>{
        setIsWorksAllEmp(true);
        setIsNStatusEmp(false);
        setIsYStatusEmp(false);  
    }

    const handleNList = () =>{
        setIsWorksAllEmp(false)
        setIsNStatusEmp(true)
        setIsYStatusEmp(false)

    }

    const handleYList = () =>{
        setIsWorksAllEmp(false);
        setIsNStatusEmp(false);
        setIsYStatusEmp(true);
    }


    return(
        <>
        <div>
        <div className={workscss.title}>업무보고서</div>
        <br/>
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
            {isNStatusEmp? <NStatusForEmp setIsNStatusEmp={setIsNStatusEmp}/>:null}
            {isWorksAllEmp? <WorksAllForEmp setIsWorksAllEmp={setIsWorksAllEmp}/>:null}
            {isYStatusEmp? <YStatusForEmp setIsYStatusEmp={setIsYStatusEmp}/>:null}
            </div>
        </div>
        </div>
    </>
    )
}export default WorksReportEmp;
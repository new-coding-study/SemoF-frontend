import workscss from "./WorksCss.module.css";
import {useState, useEffect} from "react"
import { Dispatch } from "react";
import WorksAll from "../../components/worksReport/WorksAll";
import NStatus from "../../components/worksReport/NStatus";
import YStatus from "../../components/worksReport/YStatus";

function WorksReportAdmin(){

    const [isWorksAll, setIsWorksAll] = useState(true);
    const [isNStatus, setIsNStatus] = useState(false);
    const [isYStatus, setIsYStatus] = useState(false);

    const handleAllList = () =>{
        setIsWorksAll(true),
        setIsNStatus(false),
        setIsYStatus(false)
    }

    const handleNList = () =>{
        setIsWorksAll(false),
        setIsNStatus(true),
        setIsYStatus(false)

    }

    const handleYList = () =>{
        setIsWorksAll(false),
        setIsNStatus(false),
        setIsYStatus(true)
    }

    return(
        <>
        <div>
        <div className={workscss.title}>업무보고서</div>
        <br/>
        <div>
        <button onClick={handleAllList}>
            전체 
        </button>
        <button onClick={handleYList}>
            읽은 보고서
        </button>
        <button onClick={handleNList}>
            읽지 않은 보고서
        </button>
        </div>
        <div>
            {isNStatus? <NStatus setIsNStatus={setIsNStatus}/>:null}
            {isWorksAll? <WorksAll setIsWorksAll={setIsWorksAll}/>:null}
            {isYStatus? <YStatus setIsYStatus={setIsYStatus}/>:null}
        </div>
        </div>
    </>
    )
}export default WorksReportAdmin;
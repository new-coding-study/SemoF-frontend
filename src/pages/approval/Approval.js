import ApprovalCSS from './Approval.module.css';
// import {callApprovalListAPI} from '../../apis/ApprovalListAPICalls';
// import { useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Approval(){
    // const dispatch = useDispatch();
    // const approvList = useSelector(state => state.approvalReducer);

    // useEffect(
    //     () => {
    //         dispatch(callApprovalListAPI());
    //     },[]
    // );

    const navigate = useNavigate();
    return(
        <>
        <div className={ApprovalCSS.title}>
            전자결재
        </div>
        <br/>
        <div className={ApprovalCSS.outLine}>
        <div className={ ApprovalCSS.statistic}>
        <iframe src="http://localhost:5601/app/dashboards#/view/d6288380-dca4-11ed-b84c-1f6e35e8f968?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))" height="600" width="800"></iframe>
        </div >
        <div className={ApprovalCSS.menuBox}>
            {/* 여기서 상신함, 수신함 분리를 해야할까.. 완료된 결재도,,, 
             */}
            <div>
            <button className={ApprovalCSS.outBox} onClick={()=>{navigate(`/semof/inbox`)}}>
            <img
                src={"/images/결재상신.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>상신함</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.inBox} onClick={()=>{navigate(`/semof/outbox`)}}>
            <img
                src={"/images/결재수신.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>수신함</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.complete} onClick={()=>{navigate(`/semof/complete/in`)}}>
            <img
                src={"/images/결재완료.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>완료된 결재</span>
            </button>
            </div>
            <div>
            {/* <button className={ApprovalCSS.statistics} onClick={()=>{navigate(`/semof/statistics`)}}>
            <img
                src={"/images/결재통계.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>결재통계</span>
            </button> */}
            </div>
            <div>
            <button className={ApprovalCSS.line} onClick={()=>{navigate(`/semof/lines`)}}>
            <img
                src={"/images/결재라인.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>결재라인</span>
            </button>
            </div>

        </div>
        </div>
        </>
    )
}

export default Approval;
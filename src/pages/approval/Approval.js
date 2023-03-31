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
            <img></img>
            <img></img>
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
            <button className={ApprovalCSS.complete} onClick={()=>{navigate(`/semof/complete`)}}>
            <img
                src={"/images/결재완료.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>완료된 결재</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.statistics} onClick={()=>{navigate(`/semof/statistics`)}}>
            <img
                src={"/images/결재통계.png"}
                alt="이미지확인!"
                className={ApprovalCSS.logo}
              ></img>
                <span className={ApprovalCSS.btnTitle}>결재통계</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.line} onClick={()=>{navigate(`/semof/line`)}}>
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
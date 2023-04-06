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
            <div>
            <button className={ApprovalCSS.outBox} onClick={()=>{navigate(`/approval/outbox`)}}>
                <img></img>
                <span>상신함</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.inBox} onClick={()=>{navigate(`/approval/inbox`)}}>
                <img></img>
                <span>수신함</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.complete} onClick={()=>{navigate(`/approval/complete`)}}>
                <img></img>
                <span>완료된 결재</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.statistics} onClick={()=>{navigate(`/approval/statistics`)}}>
                <img></img>
                <span>결재통계</span>
            </button>
            </div>
            <div>
            <button className={ApprovalCSS.line} onClick={()=>{navigate(`/approval/line`)}}>
                <img></img>
                <span>결재라인</span>
            </button>
            </div>
            <br/>
            <div className={ApprovalCSS.back}>
            <button className={ApprovalCSS.turn} onClick={()=>{navigate(`/semof`)}}>
            메인으로
            </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Approval;
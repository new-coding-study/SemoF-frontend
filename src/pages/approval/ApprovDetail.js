import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalDetailAPI, callLineDetailAPI } from '../../apis/ApprovalAPICalls';
import { useEffect } from 'react';

function ApprovDetail(){

    const nav = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const approvInfo = useSelector(state => state.approvalReducer.approval);
    // const lineInfo = useSelector(state => state.approvalReducer.line);
    console.log(approvInfo);
    // console.log(lineInfo);
    console.log(Array.isArray(approvInfo));
    // console.log(Array.isEmpty(approvInfo));
    console.log(params.approvNo);
    useEffect(
        () => {
            dispatch(callApprovalDetailAPI(
                parseInt(params.approvNo)
            )  )
            // dispatch(callLineDetailAPI(
                //  approvInfo.lineNo
            // )); 
        } // eslint-disable-next-line
        ,[]
    );

    return(
        <>
            <div 
            // className={title}
            >
                {approvInfo?.approvTitle}
            </div>
            <div >
                {approvInfo?.approvStatus}
                {approvInfo?.approvDate}
            </div>
            {/*결재 작성된 내용 */}
            <div 
            // className={application}
            >
                {
                approvInfo.length>0 &&
                approvInfo?.approvContentDTOList.map(dto => (
                <div key={dto.contentNo}>
                <span>{dto.formTitle}</span>:
                <span>{dto.content}</span>
                </div>
                ))
                }
               
            </div>
            
            {/* 진행상황 : 결재라인 */}
            {/*
                lineInfo?.approvOrderDTOList.map(dto => (
                <div key={dto.orderNo}>
                <span>{dto.jobName}</span>:
                <span>{dto.empNo}</span>
                </div>

                ))
                */}
            <div>
            {/*
                lineInfo?.approvOrderDTOList.map(dto => (
                <div key={dto.orderNo}>
                <span>{dto.jobName}</span>:
                <span>{dto.empNo}</span>
                </div>

                ))
            */}
{/* 상태를 어떻게 받지 ??/??????큰일났다~~~~~ */}
            </div>
            <div 
            // className={opinion}
            ></div>
            <button 
            // className={btnTurn}
             onClick={()=>{nav(-1)}}>돌아가기</button>
            <button 
            // className={btnModify} 
            onClick={()=>{nav(`semof/modify-approval`)}}>내용수정</button>
            <button 
            // className={btnRe}
             onClick={()=>{nav(-1)}}>결재 재상신</button>
            <button 
            // className={btnDelete}
             onClick={()=>{nav(-1)}}>결재 삭제</button>
        </>
    )
}
export default ApprovDetail;
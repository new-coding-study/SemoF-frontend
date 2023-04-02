import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalDetailAPI, callLineListAPI } from '../../apis/ApprovalAPICalls';

function ApprovDetail(){

    const nav = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const approvInfo = useSelector(state => state.approvalReducer.approval);
    const lineInfo = useSelector(state => state.approvalReducer.line);
    useEffect(
        () => {
            dispatch(callApprovalDetailAPI({	// 상품 상세 정보 조회
                approvNo: params.approvNo
            }));  
            dispatch(callLineListAPI({
                lineNo : params.lineNo
            })); 
        } // eslint-disable-next-line
        ,[]
    );

    return(
        <>
            <div className={title}>
                {approvInfo.approvTitle}
            </div>
            <div >
                {approvInfo.approvStatus}
                {approvInfo.approvDate}
            </div>
            {/* 결재 작성된 내용 */}
            <div className={application}>
                {approvInfo.approvContentDTOList.map(dto => (
                <div key={dto.contentNo}>
                <span>{dto.formTitle}</span>:
                <span>{dto.content}</span>
                </div>
                ))}
            </div>
            {/* 진행상황 : 결재라인 */}
            {
                lineInfo.approvOrderDTOList.map(dto => (
                <div key={dto.orderNo}>
                <span>{dto.jobName}</span>:
                <span>{dto.empNo}</span>
                </div>

                ))
            }
            <div>
{/* 상태를 어떻게 받지 ??/??????큰일났다~~~~~ */}
            </div>
            <div className={opinion}></div>
            <button className={btnTurn} onClick={()=>{nav(-1)}}>돌아가기</button>
            <button className={btnModify} onClick={()=>{nav(-1)}}>내용수정</button>
            <button className={btnRe} onClick={()=>{nav(-1)}}>결재 재상신</button>
            <button className={btnDelete} onClick={()=>{nav(-1)}}>결재 삭제</button>
        </>
    )
}
export default ApprovDetail;
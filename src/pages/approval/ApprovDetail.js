import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

function ApprovDetail(){

    const nav = useNavigate();
    const approvInfo = useSelector(state => state.approvalReducer);

    return(
        <>
            <div className={title}>
                {approvInfo.approvTitle}
            </div>
            <div >
                {approvInfo.approvStatus}
                {approvInfo.approvDate}
            </div>
            <div className={application}>
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
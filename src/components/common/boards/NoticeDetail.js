import { useDispatch, useSelector } from "react-redux";
import { callBoardNoticeDetail } from "../../../apis/BoardAPICalls";
import noticedetailcss from "./NoticeDetail.module.css";
import { useEffect } from "react";


function NoticeDetailModal({boardNo, setNoticeModal, setIsUpdateNotice}){
    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.boardReducer.noticeDetail);
  
    useEffect(()=>{
        dispatch(callBoardNoticeDetail({
            boardNo : boardNo
        }));
    }, []);

    return(
        <>
       
        <div className={noticedetailcss.modal}>
        <div className={ noticedetailcss.modalContainer }>
            <div className={noticedetailcss.title}>공지사항</div>
            <br/>
                <div className={noticedetailcss.displayBox}>
                    <div>     
                    <div>
                    <div className={noticedetailcss.boardTitle}>
                    {noticeDetail.boardTitle}
                    </div>
                    <div style={{float:'right'}}>
                    <div className={noticedetailcss.writer}>작성자: {noticeDetail.empName}</div>
                    <div className={noticedetailcss.date}>일시: {noticeDetail.writeDate}</div>
                    </div>
                    </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <div className={noticedetailcss.content}>{noticeDetail.boardContent}</div>
                </div>
                <br/>
                <div className={noticedetailcss.modalbtn}>
                <button onClick = {() => setIsUpdateNotice(true)} >수 정</button> &nbsp;&nbsp;&nbsp;
                <button onClick = {()=> setNoticeModal(false)} >닫 기</button>
                </div>
            </div>
        </div>
        </>
    )
} export default NoticeDetailModal;
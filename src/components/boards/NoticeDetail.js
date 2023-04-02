import { useDispatch, useSelector } from "react-redux";
import { callBoardNoticeDetail,
         callDeleteNoticeAPI} from "../../apis/BoardAPICalls";
import noticedetailcss from "./NoticeDetail.module.css";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


function NoticeDetailModal({boardNo, setNoticeModal, setIsUpdateNotice}){
    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.boardReducer.noticeDetail);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(callBoardNoticeDetail({
            boardNo : boardNo
        }));
    }, []);


    const deleteNotice = (boardNo) =>{
      Swal.fire({
        title:'공지사항을 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: '취소',
        confirmButtonText:'삭제'
      }).then((result)=>{
        if(result.isConfirmed){
            dispatch(callDeleteNoticeAPI({
                boardNo:boardNo
            }))
            Swal.fire('공지사항이 삭제되었습니다.','게시판으로 돌아갑니다','success')
            .then(
                navigate(`/semof/board`, {replace: true}),
                setNoticeModal(false),
                window.location.reload()
             
            )
        }
      })
    }

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
                <button onClick = {()=> deleteNotice(noticeDetail.boardNo)} >삭 제</button> &nbsp;&nbsp;&nbsp;
                <button onClick = {()=> setNoticeModal(false)} >닫 기</button>
                </div>
            </div>
        </div>
        </>
    )
} export default NoticeDetailModal;
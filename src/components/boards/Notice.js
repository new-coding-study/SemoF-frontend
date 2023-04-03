import boardcss from "../../pages/board/Board.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {callBoardNoticeListAPI} from "../../apis/BoardAPICalls"
import 'sweetalert2/dist/sweetalert2.min.css';
import NoticeDetailModal from "./NoticeDetail";
import NoticeUpdate from "./NoticeUpdate";
import BoardRegistForAdmin from "./BoardRegistForAdmin";

function Notice (){

const navigate = useNavigate();
const dispatch = useDispatch();
const notices = useSelector(state => state.boardReducer.notices);   
const noticeList = notices.data;
console.log(noticeList);
const [currentPage, setCurrentPage] = useState(1);
const [noticeModal, setNoticeModal] = useState(false);
const [selectNo, setSelectNo] = useState('');

const [isUpdateNotice, setIsUpdateNotice] = useState(false);
const [isRegistModalForAdmin, setIsRegistModalForAdmin] = useState(false);
const pageInfo = notices.pageInfo;
console.log(currentPage+'====================')
const pageNumber = [];
if(pageInfo){
    for(let i = 1; i <= pageInfo.endPage; i++){
        pageNumber.push(i);
    }
}

useEffect (() =>{
    dispatch(callBoardNoticeListAPI({
        currentPage : currentPage
    }));
}, [currentPage]
)

const onClickNotice = (boardNo) => {
    setSelectNo(boardNo);
    setNoticeModal(true);
}

    return(
        <>
        {isRegistModalForAdmin? <BoardRegistForAdmin setIsRegistModalForAdmin={setIsRegistModalForAdmin}/>:null}
        {noticeModal? <NoticeDetailModal setIsUpdateNotice={setIsUpdateNotice} boardNo={selectNo} setNoticeModal={setNoticeModal}/>:null}
        {isUpdateNotice? <NoticeUpdate boardNo={selectNo} setIsUpdateNotice={setIsUpdateNotice} setNoticeModal={setNoticeModal}/> : null}
          
        <br/>
        <br/>
            <div className={boardcss.NoticelistDisply}>
                <table className={boardcss.noticeTable}>
                    <colgroup>
                        <col width="10%"/>
                        <col width="50%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr 
                        className={boardcss.tableheader}>
                            <th style={{borderRight:'1px solid lightGray'}}>No.</th>
                            <th style={{borderRight:'1px solid lightGray'}}>제 목</th>
                            <th style={{borderRight:'1px solid lightGray'}}>등록자</th>
                            <th>날 짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    { Array.isArray(noticeList) && noticeList.map((n) => (
                        <tr
                            key={n.boardCateCode}
                            onClick={() => 
                                // onClickNotice()
                                onClickNotice(n.boardNo)
                            }
                        >
                            <td style={{borderRight:'1px solid lightGray'}}><img
                            src={"/images/noticeAlarm.png"}
                            alt="공지사항 이미지"
                            className={boardcss.noticeImg}
                            /></td>
                            <td style={{textAlign:'left', borderRight:'1px solid lightGray', textIndent: '10px'}}>{n.boardTitle}</td>
                            <td style={{borderRight:'1px solid lightGray'}}>{n.empName}</td>
                            <td>{n.writeDate}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>  
                <div>
                <button 
                 onClick={() => navigate("/semof")}
                 className={boardcss.btnstyle1}>
                    메인으로
                </button>
                <button 
                onClick = {() => setIsRegistModalForAdmin(true)} className={boardcss.btnstyle2}>
                    등 록(foradmin)
                </button>
                </div>
            </div>
            <br/>
            <div>
                <div className={boardcss.pagingbtn}>
                    { Array.isArray(noticeList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &lt;&lt;&nbsp;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button>
                                    {num}&nbsp;
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(noticeList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.endPage || pageInfo.total === 0}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &gt;&gt;
                        </button>
                        
                    }
                </div>
        </div>
        </>
    )
} export default Notice;
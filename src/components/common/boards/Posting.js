import boardcss from "../../../pages/board/Board.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {callBoardPostingListAPI, 
        callBoardNoticeTop3Lists} from "../../../apis/BoardAPICalls"

function Posting (){

const navigate = useNavigate();
const dispatch = useDispatch();
const postings = useSelector(state => state.boardReducer.postingList);
const notices = useSelector(state => state.boardReducer.noticeTopList);    
const postingList = postings.data;
const noticeList = notices.data;
console.log(postingList);

const [currentPage, setCurrentPage] = useState(1);
const pageInfo = postings.pageInfo;

const pageNumber = [];
if(pageInfo){
    for(let i = 1; i <= pageInfo.endPage; i++){
        pageNumber.push(i);
    }
}
console.log(pageNumber);
console.log('현재페이지'+currentPage)
useEffect (() =>{
    dispatch(callBoardNoticeTop3Lists({
    }));

    dispatch(callBoardPostingListAPI({
        currentPage : currentPage
    }));
}, []
)

useEffect (() =>{
    dispatch(callBoardPostingListAPI({
        currentPage : currentPage
    }));
}, [currentPage]
)


const onClickPosting = (boardNo) => {
    console.log('게시글 상세조회=======');
    navigate(`/semof/posting-detail/${boardNo}`, {replace : false});
} 

    return(
        <>
        <br/>
        <br/>
            <div>
                <table>
                    <colgroup>
                        <col width="10%"/>
                        <col width="50%"/>
                        <col width="20%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr className={boardcss.tableheader}>
                            <th style={{borderRight:'1px solid lightGray'}}>No.</th>
                            <th style={{borderRight:'1px solid lightGray'}}>제 목</th>
                            <th style={{borderRight:'1px solid lightGray'}}>등록자</th>
                            <th>날 짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    { Array.isArray(noticeList) && noticeList.map((p) => (
                            p.boardCateCode == 1 &&
                        <tr
                            key={p.boardCateCode}
                        >
                            <td style={{borderRight:'1px solid lightGray'}}><img
                            src={"/images/noticeAlarm.png"}
                            alt="공지사항 이미지"
                            /></td>
                            <td style={{textAlign:'left', borderRight:'1px solid lightGray', textIndent:'10px'}}>{p.boardTitle}</td>
                            <td style={{borderRight:'1px solid lightGray'}}>{p.empName}</td>
                            <td>{p.writeDate}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>

                        { Array.isArray(postingList) && postingList.map((p) => (
                        <tr
                            key={p.boardCateCode}
                            onClick={() => onClickPosting(p.boardNo)}
                        >
                           
                            <td style={{borderRight:'1px solid lightGray'}}>{p.rowNum}</td>
                            <td style={{textAlign:'left', borderRight:'1px solid lightGray', textIndent:'10px'}}>{p.boardTitle}</td>
                            <td style={{borderRight:'1px solid lightGray'}}>{p.empName}</td>
                            <td>{p.writeDate}</td>
                        </tr>
                        ))
                        }
                          
                        </tfoot>
                </table>  
                <div>
                <button 
                 onClick={() => navigate("/semof")}
                 className={boardcss.btnstyle1}>
                    메인으로
                </button>
                <button className={boardcss.btnstyle2}>
                    등 록
                </button>
                </div>
            </div>
            <br/>
            <div>
                <div className={boardcss.pagingbtn}>
                    { Array.isArray(postingList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &lt;&lt; &nbsp;
                        </button>
                    } 
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button clasName={boardcss.numstyle}>
                                    {num} &nbsp;
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(postingList) &&
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
} export default Posting;
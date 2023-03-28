import boardcss from "./Board.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {callBoardNoticeListAPI, 
        callBoardPostingListAPI, 
        callBoardNoticeTop3Lists, 
        callBoardNoticeDetail,
        callBoardPostingDetail} from "../../apis/BoardAPICalls"

function Board (){

const navigate = useNavigate();
const dispatch = useDispatch();
const boards = useSelector(state => state.boardReducer);
const boardList = boards.data;
let index = 0;
console.log(boardList);
const [currentPage, setCurrentPage] = useState(1);

const pageInfo = boards.pageInfo;


const pageNumber = [];
if(pageInfo){
    for(let i = 1; i <= pageInfo.endPage; i++){
        pageNumber.push(i);
    }
}

useEffect (() =>{
    dispatch(callBoardNoticeTop3Lists({
        currentPage : currentPage
    }));
}, [currentPage]
)

useEffect (() =>{
    dispatch(callBoardPostingListAPI({
        currentPage : currentPage
    }));
}, [currentPage]
)



// useEffect (() =>{
//     dispatch(callBoardNoticeListAPI({
//         currentPage : currentPage
//     }));
// }, [currentPage]
// )


    return(
        <>
        <div className={boardcss.title}>게시판</div>
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
                            <th>No.</th>
                            <th>제 목</th>
                            <th>등록자</th>
                            <th>날 짜</th>
                        </tr>
                    </thead>
                    <tbody>
                    { Array.isArray(boardList) && boardList.map((p) => (
                            p.boardCateCode === 1 &&
                        <tr
                            key={p.boardCateCode === 1}
                        >
                            <td>공지사항</td>
                            <td>{p.boardContent}</td>
                            <td>{p.empName}</td>
                            <td>{p.writeDate}</td>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>

                        { Array.isArray(boardList) && boardList.map((p) => (
                            p.boardCateCode === 2 &&
                        <tr
                            key={p.boardCateCode === 1}
                        >
                            <td>{++index}</td>
                            <td>{p.boardContent}</td>
                            <td>{p.empName}</td>
                            <td>{p.writeDate}</td>
                        </tr>
                        ))
                        }
                          
                        </tfoot>
                </table>
                <div>
                <button className={boardcss.btnstyle}>
                    등 록
                </button>
                </div>
            </div>
           
            <br/>
            <div>
                <div className={boardcss.pagingbtn}>
                    { Array.isArray(boardList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        style={{color: '#E52E2E', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &lt;&lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button style={currentPage === num ? {backgroundColor : 'rgba(237, 237, 240, 1)', fontSize: '15px', border: 'none'} : null}>
                                    {num}
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(boardList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.endPage || pageInfo.total === 0}
                        style={{color: '#E52E2E', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &gt;&gt;
                        </button>
                        
                    }
                </div>
        </div>
        </>
    )
} export default Board;
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
const [currentPage, setCurrentPage] = useState(1);

const pageInfo = boards.pageInfo;


const pageNumber = [];
if(pageInfo){
    for(let i = 1; i <= pageInfo.endPage; i++){
        pageNumber.push(i);
    }
}

useEffect (() =>{
    dispatch(callBoardPostingListAPI({
        currentPage : currentPage
    }));
}, [currentPage]
)

useEffect (() =>{
    dispatch(callBoardNoticeListAPI({
        currentPage : currentPage
    }));
}, [currentPage]
)


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
                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                        <tr>
                            <td/>
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                    </tbody>
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
                    {
                        <button style={{color: '#E52E2E', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &lt;&lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button style={currentPage === num ? {backgroundColor : 'gray'} : null}>
                                    {num}
                                </button>
                            </li>
                        ))
                    }
                    {
                        <button style={{color: '#E52E2E', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &gt;&gt;
                        </button>
                        
                    }
                    
                   
                </div>
      
        </div>
        </>
    )
} export default Board;
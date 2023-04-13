import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Line from "../../components/approvals/Line";
import {
    callLineListAPI
} from "../../apis/ApprovalAPICalls";
import ApprovalCSS from "./ApprovalIn.module.css";
import boardcss from "../../pages/board/Board.module.css";


function ApprovalLineList() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const lines = useSelector(state => state.approvalReducer.lineList); 
    const lineList = lines.data;
    const pageInfo = lines.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    console.log('이거 되긴하니', lineList);
    console.log(pageInfo);
    
    // const lineLength = line.length;
    console.log(lines);
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo?.endPage ; i++){
            pageNumber.push(i);
        }
    }
    // useEffect(
    //     () => {
    //         dispatch(callLineListAPI({
    //             currentPage: currentPage
    //         }));   
    //         // dispatch(callLinesAPI())         
    //     } // eslint-disable-next-line
    //     ,[currentPage]
    // );
        // console.log(lineList.size());

    useEffect (() =>{
        console.log("api call=============");
        dispatch(callLineListAPI({
            currentPage : currentPage
        })).then(
            console.log("이게되는거야?????????")
        )
    }, [currentPage]
    )    
    return (
        <>
        <div className={ApprovalCSS.title}>결재라인</div>
        <br/>
        <div>
            <button className={ApprovalCSS.registbtn} onClick={()=>{navigate(`/semof/add-line`)}}>결재라인추가</button>
        </div>
        <br/>
        <div>
        {/* line?.length > 0 */}
            { 
            Array.isArray(lineList) && 
            // lineLength>0
            // line?.length > 0 
                // &&
                lineList.map((line) => (
                <Line key={ line.lineNo } line={ line } />
               ))
            }
        </div>
     
        <br/>
        <div className={boardcss.approvalpagingbtn}>
        <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    // className={ MainCSS.pagingBtn }
                >
                    &lt;
                </button>&nbsp;
                
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                        // className={ MainCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))} &nbsp;
                
                <button 
                    // className={ MainCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo?.endPage  || pageInfo?.total === 0}
                >
                    &gt;
                </button>
                </div>
       
        </>
    );
}

export default ApprovalLineList;
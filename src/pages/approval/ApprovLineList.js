import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Line from "../../components/approvals/Line";
import {
    callLineListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalLineList() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lineList = useSelector(state => state.approvalReducer.line); 
  
    const pageInfo = lineList.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    console.log('이거 되긴하니',lineList);
    console.log(pageInfo);
    const line = lineList.data;
    // const lineLength = line.length;
    console.log(line);
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            dispatch(callLineListAPI({
                currentPage: currentPage
            }));            
        } // eslint-disable-next-line
        ,[]
    );
        // console.log(lineList.size());
    return (
        <>
        <div 
        // className={ MainCSS.productDiv }
        
        >결재라인</div>
        <div>
        {/* line?.length > 0 */}
            { 
            // Array.isArray(lineLength) && 
            // lineLength>0
            line?.length > 0 
                &&
               line.map((line) => (
                <Line key={ line.lineNo } line={ line } />
               ))
            }
            {/*  */}
        </div>
        <div>
            <button onClick={()=>{navigate(`/semof/add-line`)}}>결재라인추가</button>
        </div>
        </>
    );
}

export default ApprovalLineList;
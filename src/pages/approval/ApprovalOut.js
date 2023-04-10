import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Approve from "../../components/approvals/Approve";
import { useNavigate } from 'react-router-dom';
import {
    callApprovOutListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalOut() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalReducer.approvals); 
    const approvals = approvalList.data;
    console.log(approvalList);
    console.log(approvals);

    const nav = useNavigate();

    const pageInfo = approvalList.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const pageEnd = approvalList.pageInfo.pageEnd;
    // console.log(pageInfo);
    // const [pageEnd, setPageEnd] = useState(1);
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo?.endPage ; i++){
            pageNumber.push(i);
        }
    }

    // const onClickHandler = (approvNo) => {
    //     nav(`/semof/inbox/${approvNo}`);
    // }


    useEffect(
        () => {
            dispatch(callApprovOutListAPI({
                currentPage : currentPage
            }));            
        } // eslint-disable-next-line
        ,[currentPage]
    );
console.log("이거 트루입니까", Array.isArray(approvals));
    return (
        <>
        {/* if문을 돌릴지 아니면,,, 그냥 페이지를 다 분리할지 */}
        <div 
        // className={ApprovalCSS.title}
        >
            결재 수신함
        </div>
        <div 
        // className={ MainCSS.productDiv } lineList.map((line) => (
                // <Line key={ line.lineNo } line={ line } />
                // ))
        >
            { 
               Array.isArray(approvals) && 
               approvals?.map((approve) => 
               (<div 
                
                >
                    <h4>{approve.empName}</h4>
                    <h3 onClick={()=>{nav(`/semof/inbox/${parseInt(approve.approvNo)}`)
                        }}>{approve.approvTitle}</h3>
                    <h4>{approve.category}</h4>
                    <h4>{approve.approvDate}</h4> 
                    
                </div>  ))
            }
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { 
            Array.isArray(approvals) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                // className={ ProductManagementCSS.pagingBtn }
            >
                &lt;
            </button>
            }
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    // className={ ProductManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}
            { 
            Array.isArray(approvalList) &&
            <button 
                // className={ ProductManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo?.endPage || pageInfo?.total === 0}
            >
                &gt;
            </button>
            }
        </div>
        <div>
          

        </div>
        </>
    );
}
// 돌아가기 버튼 만들기
export default ApprovalOut;
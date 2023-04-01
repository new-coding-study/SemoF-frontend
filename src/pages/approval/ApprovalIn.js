import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Approve from "../../components/approvals/Approve";
import { useNavigate } from 'react-router-dom';
import {
    callApprovalListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalIn() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalReducer.approval); 
    console.log(approvalList);

    const nav = useNavigate();

    const pageInfo = approvalList.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);
    // const pageEnd = approvalList.pageInfo.pageEnd;
    console.log(pageInfo);
    // const [pageEnd, setPageEnd] = useState(1);
    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage ; i++){
            pageNumber.push(i);
        }
    }

    const onClickHandler = () => {
        nav(`/semof/regist-approval`);
    }
    useEffect(
        () => {
            dispatch(callApprovalListAPI({
                currentPage : currentPage
            }));            
        } // eslint-disable-next-line
        ,[currentPage]
    );

    return (
        <>
        {/* if문을 돌릴지 아니면,,, 그냥 페이지를 다 분리할지 */}
        <div 
        // className={ApprovalCSS.title}
        >
            결재 상신함
        </div>
        <div 
        // className={ MainCSS.productDiv }
        >
            { 
               approvalList.length > 0 && approvalList.map((approve) => (<Approve key={ approve.approvNo } approve={ approve } />))
            }
        </div>
        <div style={{ listStyleType: "none", display: "flex", justifyContent: "center" }}>
            { 
            // Array.isArray(approvalList) &&
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
            // Array.isArray(approvalList) &&
            // <button 
            //     // className={ ProductManagementCSS.pagingBtn }
            //     onClick={() => setCurrentPage(currentPage + 1)} 
            //     disabled={currentPage === pageInfo.endPage || pageInfo.total === 0}
            // >
            //     &gt;
            // </button>
            }
        </div>
        <div>
            <button type="button" onClick={onClickHandler}>
                결재상신
            </button>
        </div>
        </>
    );
}
// 돌아가기 버튼 만들기
export default ApprovalIn;
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import Approve from "../../components/approvals/Approve";
import { useNavigate } from 'react-router-dom';
import {
    callApprovalListAPI
} from '../../apis/ApprovalAPICalls'
import ApprovalCSS from "./ApprovalIn.module.css";
import boardcss from "../../pages/board/Board.module.css";

function ApprovalIn() {

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
            
            dispatch(callApprovalListAPI({
                currentPage : currentPage
            }));            
        } // eslint-disable-next-line
        ,[currentPage]
    );
console.log("이거 트루입니까", Array.isArray(approvals));
    return (
        <>
        {/* if문을 돌릴지 아니면,,, 그냥 페이지를 다 분리할지 */}
        <div className={ApprovalCSS.title}>
            결재 상신함
        </div>
        <br/>
        <br/>
        <div className={boardcss.NoticelistDisply}>
        <div style={{'float':'right', paddingRight:'10%', paddingBottom:'1%'}}>
            <button  className={boardcss.btnstyle2} onClick={() => {
                nav(`/semof/regist-approval`)
            }}>
                결재상신
            </button>
        </div>
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
                    <th style={{borderRight:'1px solid lightGray'}}>상태</th>
                    <th style={{borderRight:'1px solid lightGray'}}>제목</th>
                    <th style={{borderRight:'1px solid lightGray'}}>유형</th>
                    <th>날 짜</th>
                </tr>
            </thead>
            <tbody>
                { Array.isArray(approvals) && 
               approvals?.map((approve) => (
                    <tr
                    onClick = {()=>{nav(`/semof/inbox/${parseInt(approve.approvNo)}`)}}>
                        <td>{approve.status}</td>
                        <td>{approve.approvTitle}</td>
                        <td>{approve.category}</td>
                        <td>{approve.approvDate}</td>
                    </tr> 
               ))}

            </tbody>
        </table>
        <br/>
        <div  className={boardcss.approvalpagingbtn}>
            { 
            Array.isArray(approvals) &&
            <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                // className={ ProductManagementCSS.pagingBtn }
            >
                &lt;
            </button> 
            }&nbsp;
            {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
                <button
                    style={ currentPage === num ? {backgroundColor : 'rgba(237, 237, 240, 1)' } : null}
                    // className={ ProductManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}&nbsp;
            { 
            Array.isArray(approvals) &&
            <button 
                // className={ ProductManagementCSS.pagingBtn }
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === pageInfo?.endPage || pageInfo?.total === 0}
            >
                &gt;
            </button>
            }
        </div>
        </div>
        </>
    );
}
// 돌아가기 버튼 만들기
export default ApprovalIn;
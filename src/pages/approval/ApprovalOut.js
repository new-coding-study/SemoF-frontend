import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    callApprovOutListAPI
} from '../../apis/ApprovalAPICalls'
import ApprovalCSS from "./ApprovalIn.module.css";
import boardcss from "../../pages/board/Board.module.css";
import { decodeJwt } from '../../utils/tokenUtils';


function ApprovalOut() {
    const isLogin = window.localStorage.getItem('accessToken');
    console.log('로그인? ',isLogin);
    let decoded = null;
    let tokenEmpNo = null;
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        tokenEmpNo = temp.empNo;
        console.log('??', temp.empNo)
    }
console.log(tokenEmpNo);
    console.log('decoded', decoded);
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalReducer.approvalsOut); 
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
                currentPage : currentPage,
                empNo : tokenEmpNo
            }));            
        } // eslint-disable-next-line
        ,[currentPage]
    );
console.log("이거 트루입니까", Array.isArray(approvals));
    return (
        <>
        {/* if문을 돌릴지 아니면,,, 그냥 페이지를 다 분리할지 */}
        <div className={ApprovalCSS.title}>
            결재 수신함
        </div>
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
                    <th style={{borderRight:'1px solid lightGray'}}>유형</th>
                    <th style={{borderRight:'1px solid lightGray'}}>제목</th>
                    <th style={{borderRight:'1px solid lightGray'}}>작성자</th>
                    <th>날 짜</th>
                </tr>
            </thead>
            <tbody>
            { 
               Array.isArray(approvals) && 
               approvals?.map((approve) => 
               (  <tr
                onClick = {()=>{nav(`/semof/inbox/${parseInt(approve.approvNo)}`)}}>
                                        <td>{approve.category}</td>

                                        <td>{approve.approvTitle}</td>
                                        <td>{approve.empName}</td>

                                        <td>{approve.approvDate}</td> 
                    
                </tr>  ))
            }
            </tbody>
            </table>
        </div>
        <br/>
        <div className={boardcss.approvalpagingbtn}>
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
                    style={ currentPage === num ? {backgroundColor : 'orange' } : null}
                    // className={ ProductManagementCSS.pagingBtn }
                >
                    {num}
                </button>
            </li>
            ))}&nbsp;
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
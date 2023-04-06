import {useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import Approve from "../../components/approvals/Approve";
import {
    callApprovalListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalOut() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalReducer); 
    const pageInfo = approvalList.pageInfo;
    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if(pageInfo){
        for(let i = 1; i <= pageInfo.pageEnd ; i++){
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            dispatch(callApprovalListAPI({
                currentPage: currentPage
            }));            
        } // eslint-disable-next-line
        ,[]
    );

    return (
        <>
        {/* if문을 돌릴지 아니면,,, 그냥 페이지를 다 분리할지 */}
        <div 
        // className={ApprovalCSS.title}
        >
            결재 수신함
        </div>
        <div 
        // className={ MainCSS.productDiv }
        >
            { 
               approvalList.length > 0 && approvalList.map((approve) => (<Approve key={ approve.approvNo } approve={ approve } />))
            }
        </div>
        </>
    );
}
// 페이징 처리하고 돌아가기 버튼 만들기
// 값 똑바로 불러오는지 확인,,, 그러려면 우선 insert가 되야함
export default ApprovalOut;




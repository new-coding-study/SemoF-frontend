import {useSelector, useDispatch} from 'react-redux';
import Approve from "../../components/approvals.Approve";
import {
    callApprovalListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalList() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const approvalList = useSelector(state => state.approvalReducer); 

    useEffect(
        () => {
            dispatch(callApprovalListAPI());            
        } // eslint-disable-next-line
        ,[]
    );

    return (
        <div 
        // className={ MainCSS.productDiv }
        >
            { 
               approvalList.length > 0 && approvalList.map((approve) => (<Approve key={ approve.approvNo } approve={ approve } />))
            }
        </div>
    );
}

export default ApprovalList;
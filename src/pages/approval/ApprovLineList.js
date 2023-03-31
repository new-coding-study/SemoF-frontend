import {useSelector, useDispatch} from 'react-redux';
import Line from "../../components/approvals/Line";
import {
    callLineListAPI
} from '../../apis/ApprovalAPICalls'


function ApprovalLineList() {

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const lineList = useSelector(state => state.approvalReducer.line); 

    useEffect(
        () => {
            dispatch(callLineListAPI());            
        } // eslint-disable-next-line
        ,[]
    );

    return (
        <div 
        // className={ MainCSS.productDiv }
        >
            { 
               lineList.length > 0 && lineList.map((line) => (
                <Line key={ line.lineNo } line={ line } />
               ))
            }
            {/*  */}
        </div>
    );
}

export default ApprovalLineList;
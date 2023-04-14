import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLineDetailAPI, callStatusesAPI } from '../../apis/ApprovalAPICalls';

import { useEffect } from 'react';

function LineDetail({approvInfo}){

    const dispatch = useDispatch();
    const lineInfo = useSelector(state => state.approvalReducer.lineInfo);
    const statuses = useSelector(state => state.approvalReducer.status);
    console.log(approvInfo);
    console.log(statuses);
    console.log(lineInfo);
    useEffect(
        () => {
            
            dispatch(callLineDetailAPI(
                 parseInt(approvInfo?.lineNo)
            )); 
            dispatch(callStatusesAPI(parseInt(approvInfo?.approvNo)))
            
        } // eslint-disable-next-line
        ,[]
    );

    return(
        <>
        <div>
            <table>
                <tr>
                    <td>{
                    (lineInfo?.approvOrderDTOList)?.map(dto => (
                    <div key={dto.orderNo}>
                    <label>{dto?.jobName}</label>:
                    <span>{dto.empName}</span>
                    </div>
                    ))}
                    </td>
                    <td>
                    {
                        statuses?.map((dto,idx) => (
                            <div key={idx}>
                                <span>{dto.status}</span>
                            </div>
                        ))
                        }
                    </td>
                </tr>
            </table>
        </div>
    </>
    )
}export default LineDetail;
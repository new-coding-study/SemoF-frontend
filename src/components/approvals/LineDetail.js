import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLineDetailAPI, callStatusesAPI, callHandleStatusAPI } from '../../apis/ApprovalAPICalls';
import {decodeJwt} from '../../utils/tokenUtils';

import { useEffect } from 'react';

function LineDetail({approvInfo}){
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
    const dispatch = useDispatch();
    const lineInfo = useSelector(state => state.approvalReducer.lineInfo);
    const statuses = useSelector(state => state.approvalReducer.status);
    console.log(approvInfo);
    console.log(statuses);
    console.log('empNo확인', lineInfo);
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
            {(lineInfo?.approvOrderDTOList)?.filter(dto => dto.empNo) === tokenEmpNo &&
          <div>
          <button onClick={()=>{
            dispatch(callHandleStatusAPI(approvInfo.lineNo, parseInt(approvInfo?.approvNo), tokenEmpNo, encodeURIComponent('승인')))
          }}>결재 승인</button>
          &nbsp;&nbsp;
          
          <button onClick={() =>{dispatch(callHandleStatusAPI(approvInfo.lineNo, parseInt(approvInfo?.approvNo), tokenEmpNo, encodeURIComponent('반려')))}}>결재 반려</button>
          </div>
        }
        </div>
    </>
    )
}export default LineDetail;
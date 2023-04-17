import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callLineDetailAPI, callStatusesAPI, callHandleStatusAPI, callDeleteApprovAPI } from '../../apis/ApprovalAPICalls';
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
    const nav =  useNavigate();
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

     const empNo=(lineInfo?.approvOrderDTOList)?.map(dto => dto.empNo).includes(tokenEmpNo);

    
    return(
        <>
        <div>
            <div style={{whiteSpace:'nowrap'}}>
            <table style={{display:'inline-block', verticalAlign:'top'}}>
                <tbody>
                <tr style={{border: '2px solid black'}}>
                    <td>{
                    (lineInfo?.approvOrderDTOList || [])?.map(dto => (
                    <div key={dto.orderNo}>
                    <label>{dto?.jobName}</label>:
                    <span>{dto.empName}</span>
                    </div>
                    ))}
                    </td>
                </tr>
                </tbody>
            </table>
            <table style={{display:'inline-block', verticalAlign:'top'}}>
                  <tbody>  
                    <tr>
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
                </tbody>
            </table>
            </div>
            { (lineInfo?.approvOrderDTOList)?.map(dto => dto.empNo).includes(tokenEmpNo) &&
          <div>
          <button onClick={()=>{
            dispatch(callHandleStatusAPI(approvInfo.lineNo, parseInt(approvInfo?.approvNo), tokenEmpNo, encodeURIComponent('승인')))
          }}>결재 승인</button>
          &nbsp;&nbsp;
          
          <button onClick={() =>{dispatch(callHandleStatusAPI(approvInfo.lineNo, parseInt(approvInfo?.approvNo), tokenEmpNo, encodeURIComponent('반려')))}}>결재 반려</button>
          </div>
        }
        {/* {(statuses?.)} */}
        <div 
        // className={approvCss.btnarea}
        >
        <button
          onClick={() => {
            dispatch(callDeleteApprovAPI(approvInfo.approvNo));
            nav(`/semof/inbox`, { replace: true });
          }}
        >
          결재 삭제
        </button>
        &nbsp;&nbsp;
        <button
          onClick={() => {
            nav(`/semof/modify-approval`);
          }}
        >
          내용수정
        </button>
        </div>
        </div>
    </>
    )
}export default LineDetail;

// (lineInfo?.approvOrderDTOList)?.filter(dto => dto.empNo)
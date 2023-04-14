import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callApprovalDetailAPI, callDeleteApprovAPI, callFilesAPI, callGetFormTitleAPI, callHandleStatusAPI } from '../../apis/ApprovalAPICalls';
import Opinion from '../../components/approvals/Opinion';
import { useEffect } from 'react';
import LineDetail from '../../components/approvals/LineDetail';
import {decodeJwt} from '../../utils/tokenUtils';
import approvCss from './ApprovDetail.module.css';
import ApprovFile from '../../components/approvals/ApprovFile';


function ApprovDetail(){
// 하나의 div approvDetail
// 하나의 div 진행상황 라인하고 상태
// 하나의 div 의견 댓글처럼
// 버튼
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
    const nav = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const approvInfo = useSelector(state => state.approvalReducer.approval);

    const formInfo = useSelector(state => state.approvalReducer.form);
    console.log(approvInfo);

    console.log(Array.isArray(approvInfo));
   
    console.log(params.approvNo);
    console.log('이거뭐게', approvInfo.lineNo);

    useEffect(
        () => {
            dispatch(callApprovalDetailAPI(
                parseInt(params.approvNo)
            )  )
            dispatch(callGetFormTitleAPI()
                
             )
            dispatch(callFilesAPI(params.approvNo))
            
        } // eslint-disable-next-line
        ,[]
    );
    
    const form = formInfo?.filter((t) => t.formCode === approvInfo?.approvContentDTOList?.formCode); 
    
    return (
        <>
        <div className={approvCss.title}>
          내 결재 목록 상세조회
        </div>
        <br/>
        <div className={approvCss.contour}>
          <table className={approvCss.table1}>
            <tr className={approvCss.tr1st}>
              <th className={approvCss.approvTitle}> {approvInfo?.approvTitle}</th>
              <th className={approvCss.writerInfo}>{approvInfo?.status}&nbsp;&nbsp;작성자 : {approvInfo?.empName}&nbsp;&nbsp;날짜 : {approvInfo?.approvDate}</th>
            </tr>
            <tr>
                <td className={approvCss.formTitle}>
                {form?.map((t, index) => (
                    <div key={t.formCode}>
                    <span>
                      {t.formTitle} : 
                    </span>
                    </div>
                ))} 
                </td>
                <td className={approvCss.content}>
                  {
                //   approvInfo.length>0 && 
                  (approvInfo?.approvContentDTOList)?.map(dto => (
                    <div key={dto.contentNo}>
                      <span>{dto.content}</span>
                    </div>
                  ))
                }
              </td>
            </tr>
            <tr>
            {
              <ApprovFile approvInfo={approvInfo}/>
            }

            </tr>
        </table>
          <table className={approvCss.title2}>
            <tr>
              <td><h2>진행상황</h2></td>
            </tr>
            <tr>
            <td><LineDetail approvInfo={approvInfo} /></td>
            </tr>
          </table>
          <br/><br/><br/><br/><br/>
            <table className={approvCss.title3}>
              <tr  className={approvCss.title3tr1st}>
                <td><h3>반려사유</h3></td>
                <td></td>
              </tr>
              <br/>
              <tr>
              <th>의견 : </th>
              <td>      
                 { 
                  <Opinion approvInfo={approvInfo} />
                 }
             </td>
            </tr>
            <br/>
            </table>
        </div>
        <br />
        <div className={approvCss.btnarea}>
         
          {/* 수정, 재상신 서로 disable 걸던지 해야할 듯 */}
          {/* <button onClick={()=>{nav(-1)}}>결재 재상신</button> */}
          
          <button onClick={()=>{
            dispatch(callDeleteApprovAPI(params.approvNo))
            nav(`/semof/inbox`, {replace: true})
            }}>결재 삭제</button>
          &nbsp;&nbsp;
          {decoded == 'ROLE_ADMIN' &&
          <div>
          <button onClick={()=>{
            dispatch(callHandleStatusAPI(approvInfo.lineNo, params.approvNo, tokenEmpNo, encodeURIComponent('승인')))
          }}>결재 승인</button>
          &nbsp;&nbsp;
          
          <button onClick={() =>{dispatch(callHandleStatusAPI(approvInfo.lineNo, parseInt(params.approvNo), tokenEmpNo, encodeURIComponent('반려')))}}>결재 반려</button>
          </div>
        }
          <br></br><br></br>
          <button onClick={()=>{nav(-1)}}>돌아가기</button>
          &nbsp;&nbsp;
          <button onClick={()=>{nav(`/semof/modify-approval`)}}>내용수정</button>
        </div>
        </>
      );
} export default ApprovDetail;
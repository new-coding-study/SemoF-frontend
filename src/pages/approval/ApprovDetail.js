import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  callApprovalDetailAPI,
  callDeleteApprovAPI,
  callFilesAPI,
  callGetFormTitleAPI,
  callHandleStatusAPI,
} from "../../apis/ApprovalAPICalls";
import Opinion from "../../components/approvals/Opinion";
import { useEffect } from "react";
import LineDetail from "../../components/approvals/LineDetail";
import { decodeJwt } from "../../utils/tokenUtils";
import approvCss from "./ApprovDetail.module.css";
import ApprovFile from "../../components/approvals/ApprovFile";

function ApprovDetail() {

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;
  let tokenEmpNo = null;
  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
    tokenEmpNo = temp.empNo;
    console.log("??", temp.empNo);
  }
  console.log(tokenEmpNo);
  console.log("decoded", decoded);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const approvInfo = useSelector((state) => state.approvalReducer.approval);

  console.log("[ApproveDetail] approveInfo : " + JSON.stringify(approvInfo));

  const formInfo = useSelector((state) => state.approvalReducer.form);


  useEffect(
    () => {
      dispatch(callApprovalDetailAPI(parseInt(params.approvNo)));
      dispatch(callGetFormTitleAPI());
      dispatch(callFilesAPI(params.approvNo));
    }, // eslint-disable-next-line
    []
  );


  // const form = formInfo?.filter(
    // (t) => t.formCode === approvInfo?.approvContentDTOList[1].formCode
  // );
  const form = formInfo?.filter(
    (t) =>
      t.formCode ===
      approvInfo?.approvContentDTOList.find((c) => c.formCode)?.formCode
  );

  console.log("[ApprovDetail] form : " + JSON.stringify(form));

  console.log(
    // "[ApprovDetail] approvInfo?.approvContentDTOList[0] : " +
    //   JSON.stringify(approvInfo.approvContentDTOList[0].formCode)
  );

  return (
    <>
      <div className={approvCss.title}>내 결재 목록 상세조회</div>
      <br />
      <div className={approvCss.contour}>
        <table className={approvCss.table1}>
          <tr className={approvCss.tr1st}>
            <th className={approvCss.approvTitle}>
              {" "}
              {approvInfo?.approvTitle}
            </th>
            <th className={approvCss.writerInfo}>
              {approvInfo?.status}&nbsp;&nbsp;작성자 : {approvInfo?.empName}
              &nbsp;&nbsp;날짜 : {approvInfo?.approvDate}
            </th>
          </tr>
          <tr>
            <td className={approvCss.formTitle}>
              {form?.map((t, index) => (
                <div key={index}>
                  <span>{t.formTitle} :</span>
                </div>
              ))}
            </td>
            <td className={approvCss.content}>
              {
                approvInfo?.approvContentDTOList?.map((dto) => (
                  <div key={dto.contentNo}>
                    <span>{dto.content}</span>
                  </div>
                ))
              }
            </td>
          </tr>
          <tr>{<ApprovFile approvInfo={approvInfo} />}</tr>
        </table>
        <table className={approvCss.title2}>
          <tbody>
          <tr>
            <td>
              <h2>진행상황</h2>
            </td>
          </tr>
          <tr>
            <td style={{border:'2px solid black'}}>
              <LineDetail approvInfo={approvInfo} />
            </td>
          </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <table className={approvCss.title3}>
          <tr className={approvCss.title3tr1st}>
            <td>
              <h3>반려사유</h3>
            </td>
            <td></td>
          </tr>
          <br />
          <tr>
            <th>의견 : </th>
            <td>{<Opinion approvInfo={approvInfo} />}</td>
          </tr>
          <br />
        </table>
      </div>
      <br />
      <div className={approvCss.btnarea}>
        <button
          onClick={() => {
            dispatch(callDeleteApprovAPI(params.approvNo));
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
        &nbsp;&nbsp;
        <button
          onClick={() => {
            nav(-1);
          }}
        >
          돌아가기
        </button>
      </div>
    </>
  );
}
export default ApprovDetail;
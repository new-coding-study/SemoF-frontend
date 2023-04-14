import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {callWorksDetailForAdmin,
    callDeleteWorksForEmp} from "../../apis/WorksReportAPICalls";
import modalcss from "./DetailModal.module.css";
// import noticedetailcss from "./NoticeDetail.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import Swal from "sweetalert2";

function ReportDetail({setIsUpdateEmp, setIsWorksDetail, worksReportCode, setIsWorksUpdate}){
    const dispatch = useDispatch();
    const worksDetail = useSelector(state => state.worksReportReducer.detailForAdmin);

    console.log(worksReportCode)

    useEffect(()=>{
        dispatch(callWorksDetailForAdmin({
            worksReportCode:worksReportCode
        }))
    }, [])


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }

    const activeUpdateModal = () =>{
        setIsWorksUpdate(true)
    }

    const activeDelete = (worksReportCode) =>{
        Swal.fire({
            title:'등록된 보고서를 삭제하시겠습니까?',
            showCancelButton:true,
            cancelButtonText:'취소',
            confirmButtonText:'확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callDeleteWorksForEmp({
                    worksReportCode:worksReportCode
                })).then(
                    Swal.fire("삭제완료", "게시판으로 돌아갑니다.", "success"),
                    setIsWorksDetail(false)
                )
            }
        })
        
    };

    return(
        <>
        <div className={modalcss.detailModal}>
            <div className={modalcss.modalContainer}>
            <div className={modalcss.modalTitle}>업무보고서 상세조회</div>
            <br/>
            <div className={modalcss.displayBox}>
            <table className={modalcss.worktable1}>
                <tr>
                    <td>{worksDetail.worksReportTitle}</td>
                    <td style={{textAlign:'right'}}>작성자 : {worksDetail.empName} &nbsp; 작성일 : {worksDetail.reportWriteDate}</td>
                </tr>
            </table>

            <table className={modalcss.worktable2}>
                <tr>
                    <td>Period &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.startDate} ~ {worksDetail.endDate}</td>
                </tr>
                <br/>
                <tr>
                    <td>Content &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.worksReportContent}</td>
                </tr>
                <br/>
                <tr>
                    <td style={{width:'44%'}}>Issues & Improvement  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.issuesImprovement}</td>
                </tr>
                <br/>
                <tr>
                    <td>Next Plan  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.nextPlan}</td>
                </tr>
                <br/>
                <tr>
                    <td>etc  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.etc}</td>
                </tr>
                   <br/>
                <tr>
                    <td>Conclusion  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.conclusion}</td>
                </tr>
                <br/>
                <tr>
                    <td>Comment  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{worksDetail.reportComment}</td>
                </tr>
            </table>
            </div>
            <br/>
            <div className={modalcss.modalbtn}>
                {decoded === "ROLE_USER"? <button onClick={() => setIsUpdateEmp(true)}>수정</button>:
                <button onClick={activeUpdateModal}>수정</button>}&nbsp;&nbsp;&nbsp;
                <button onClick={()=>activeDelete(worksReportCode)}>삭제</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => setIsWorksDetail(false)}>닫기</button>
            </div>
            </div>
        </div>
        </>
    )   

}export default ReportDetail;
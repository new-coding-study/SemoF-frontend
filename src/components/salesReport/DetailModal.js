import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {callSalesDetailForAdmin,
    callDeleteSalesForEmp} from "../../apis/SalesReportAPICalls";
import modalcss from "./DetailModal.module.css";
// import noticedetailcss from "./NoticeDetail.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ReportDetail({setIsUpdateEmp, setIsSalesDetail, salesReportCode, setIsSalesUpdate}){
    const dispatch = useDispatch();
    const salesDetail = useSelector(state => state.salesReportReducer.detailForAdmin);
    const navigate = useNavigate();
    console.log(salesReportCode)

    useEffect(()=>{
        dispatch(callSalesDetailForAdmin({
            salesReportCode:salesReportCode
        }))
    }, [])


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }

    const activeUpdateModal = () =>{
        setIsSalesUpdate(true)
    }

    const activeDelete = (salesReportCode) =>{
        Swal.fire({
            title:'등록된 보고서를 삭제하시겠습니까?',
            showCancelButton:true,
            cancelButtonText:'취소',
            confirmButtonText:'확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callDeleteSalesForEmp({
                    salesReportCode:salesReportCode
                })).then(
                    Swal.fire("삭제완료", "게시판으로 돌아갑니다.", "success"),
                    setIsSalesDetail(false)
                )
            }
        })
    };

    return(
        <>
        <div className={modalcss.detailModal}>
            <div className={modalcss.modalContainer}>
            <div className={modalcss.modalTitle}>영업보고서 상세조회</div>
            <br/>
            <div className={modalcss.displayBox}>
            <table className={modalcss.worktable1}>
                <tr>
                    <td>{salesDetail.salesReportTitle}</td>
                    <td style={{textAlign:'right'}}>작성자 : {salesDetail.empName} &nbsp; 작성일 : {salesDetail.reportWriteDate}</td>
                </tr>
            </table>
            <table className={modalcss.worktable2}>
                <tr>
                    <td>Period &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.startDate} ~ {salesDetail.endDate}</td>
                </tr>
                <tr>
                    <td>Content &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.salesReportContent}</td>
                </tr>
                <tr>
                    <td>Customer Comment  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.customerComment}</td>
                </tr>
                <tr>
                    <td>Competition Analysis  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.competitionAnalysis}</td>
                </tr>
                <tr>
                    <td>Issues & Improvement  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.issuesImprovement}</td>
                </tr>
                <tr>
                    <td>Next Plan  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.nextPlan}</td>
                </tr>
                <tr>
                    <td>Conclusion  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.conclusion}</td>
                </tr>
                <tr>
                    <td>Comment  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.reportComment}</td>
                </tr>
            </table>
            </div>
            <br/>
            <br/>
            <div className={modalcss.modalbtn}>
                {decoded === "ROLE_USER"? <button onClick={() => setIsUpdateEmp(true)}>수정</button>:
                <button onClick={activeUpdateModal}>의견 작성</button>}&nbsp;&nbsp;&nbsp;
                <button onClick={()=>activeDelete(salesReportCode)}>삭제</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => setIsSalesDetail(false)}>닫기</button>
            </div>
            </div>
        </div>
        </>
    )   

}export default ReportDetail;
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {callTripDetailForAdmin,
    callDeleteTrip} from "../../apis/TripReportAPICalls";
import modalcss from "./DetailModal.module.css";
// import noticedetailcss from "./NoticeDetail.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ReportDetail({setIsUpdateEmp, setIsTripDetail, tripReportCode, setIsTripUpdate}){
    const dispatch = useDispatch();
    const salesDetail = useSelector(state => state.tripReportReducer.detailForAdmin);
    const navigate = useNavigate();
    console.log(tripReportCode)

    useEffect(()=>{
        dispatch(callTripDetailForAdmin({
            tripReportCode:tripReportCode
        }))
    }, [])


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }

    const activeUpdateModal = () =>{
        setIsTripUpdate(true)
    }

    const activeDelete = (tripReportCode) =>{
        Swal.fire({
            title:'등록된 보고서를 삭제하시겠습니까?',
            showCancelButton:true,
            cancelButtonText:'취소',
            confirmButtonText:'확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callDeleteTrip({
                    tripReportCode:tripReportCode
                })).then(
                    Swal.fire("삭제완료", "게시판으로 돌아갑니다.", "success"),
                    setIsTripDetail(false)
                )
            }
        })
    };

    return(
        <>
        <div className={modalcss.detailModal}>
            <div className={modalcss.modalContainer}>
            <div className={modalcss.modalTitle}>출장보고서 상세조회</div>
            <br/>
            <div className={modalcss.displayBox}>
            <table className={modalcss.worktable1}>
                <tr>
                    <td>{salesDetail.tripReportTitle}</td>
                    <td style={{textAlign:'right'}}>작성자 : {salesDetail.empName} &nbsp; 작성일 : {salesDetail.reportWriteDate}</td>
                </tr>
            </table>
            <table className={modalcss.worktable2}>
                <tr>
                    <td>Period &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.startDate} ~ {salesDetail.endDate}</td>
                </tr>
                <br/>
                <tr>
                    <td>Location  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.destination}</td>
                </tr>
                <br/>
                <tr>
                    <td>Content &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.tripReportContent}</td>
                </tr>
                <br/>
                <tr>
                    <td>Issues & Improvement  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.issuesImprovement}</td>
                </tr>
                <br/>
                <tr>
                    <td>Conclusion  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.conclusion}</td>
                </tr>
                <br/>
                <tr>
                    <td>Comment  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{salesDetail.reportComment}</td>
                </tr>
            </table>
            </div>
            <br/>
            <div className={modalcss.modalbtn}>
                {decoded === "ROLE_USER"? <button onClick={() => setIsUpdateEmp(true)}>수정</button>:
                <button onClick={activeUpdateModal}>의견 작성</button>}&nbsp;&nbsp;&nbsp;
                <button onClick={()=>activeDelete(tripReportCode)}>삭제</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => setIsTripDetail(false)}>닫기</button>
            </div>
            </div>
        </div>
        </>
    )   

}export default ReportDetail;
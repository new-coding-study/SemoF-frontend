import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {callMeetingDetailForAdmin,
    callDeleteMeeting} from "../../apis/MeetingAPICalls";
import modalcss from "./DetailModal.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import Swal from "sweetalert2";

function ReportDetail({setIsUpdateEmp, setIsMeetingDetail, meetingReportCode, setIsMeetingUpdate}){
    const dispatch = useDispatch();
    const meetingDetail = useSelector(state => state.meetingReportReducer.detailForAdmin);
    console.log(meetingReportCode)

    useEffect(()=>{
        dispatch(callMeetingDetailForAdmin({
            meetingReportCode:meetingReportCode
        }))
    }, [])


    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
       
    }

    const activeUpdateModal = () =>{
        setIsMeetingUpdate(true)
    }

    const activeDelete = (meetingReportCode) =>{
        Swal.fire({
            title:'등록된 보고서를 삭제하시겠습니까?',
            showCancelButton:true,
            cancelButtonText:'취소',
            confirmButtonText:'확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callDeleteMeeting({
                    meetingReportCode:meetingReportCode
                })).then(
                    Swal.fire("삭제완료", "게시판으로 돌아갑니다.", "success"),
                    setIsMeetingDetail(false)
                )
            }
        })
    };

    return(
        <>
        <div className={modalcss.detailModal}>
            <div className={modalcss.modalContainer}>
            <div className={modalcss.modalTitle}>회의보고서 상세조회</div>
            <br/>
            <div className={modalcss.displayBox}>
            <table className={modalcss.worktable1}>
                <tr>
                    <td>{meetingDetail.meetingReportTitle}</td>
                    <td style={{textAlign:'right'}}>작성자 : {meetingDetail.empName} &nbsp; 작성일 : {meetingDetail.reportWriteDate}</td>
                </tr>
            </table>
            <table className={modalcss.worktable2}>
                <tr>
                    <td>Meeting Date &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.meetingDate}</td>
                </tr>
                <br/>
                <tr>
                    <td>Location  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.location}</td>
                </tr>
                <br/>
                <tr>
                    <td>Participants &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.participants}</td>
                </tr>
                <br/>
                <tr>
                    <td>Content  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.meetingReportContent}</td>
                </tr>
                <br/>
                <tr>
                    <td>Next Meeting  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.nextMeetingPlan}</td>
                </tr>
                <br/>
                <tr>
                    <td>Conclusion  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.conclusion}</td>
                </tr>
                <br/>
                <tr>
                    <td>Comment  &nbsp;:</td>
                    <td className={modalcss.worktable1stc}>{meetingDetail.reportComment}</td>
                </tr>
            </table>
            </div>
            <br/>
            <div className={modalcss.modalbtn}>
                {decoded === "ROLE_USER"? <button onClick={() => setIsUpdateEmp(true)}>수정</button>:
                <button onClick={activeUpdateModal}>의견 작성</button>}&nbsp;&nbsp;&nbsp;
                <button onClick={()=>activeDelete(meetingReportCode)}>삭제</button>&nbsp;&nbsp;&nbsp;
                <button onClick={() => setIsMeetingDetail(false)}>닫기</button>
            </div>
            </div>
        </div>
        </>
    )   

}export default ReportDetail;
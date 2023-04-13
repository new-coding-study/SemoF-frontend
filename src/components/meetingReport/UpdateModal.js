import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callMeetingDetailForAdmin, callUpdateMeetingForAdmin} from "../../apis/MeetingAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";

function UpdateModal ({setIsMeetingDetail, meetingReportCode, setIsMeetingUpdate}){
    
    const dispatch = useDispatch();
    const meetingDetail = useSelector(state => state.meetingReportReducer.detailForAdmin);
    const registComment = useSelector(state => state.meetingReportReducer.putForAdmin);

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callMeetingDetailForAdmin({
            meetingReportCode:meetingReportCode
        }))
    },[]);

    const [form, setForm] = useState({
        reportComment:"",
        empNo:decoded
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistComment = () => {
        dispatch(callUpdateMeetingForAdmin({
            form:form,
            meetingReportCode:meetingReportCode
        }))
        if(registComment.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsMeetingUpdate(false),
            setIsMeetingDetail(false)
        )
        } else if (registComment.status !== 200){
            Swal.fire('작성실패', '다시 입력 부탁드립니다.', 'error')
        }
    }

    
    useEffect (()=>{
        if(registComment.status === 200){
            Swal.fire({
                icon : 'success',
                title :'의견이 등록 되었습니다.', 
                text :'리스트 조회 페이지로 돌아갑니다.'
            }).then((result)=>{
                if(result.isConfirmed)
                setIsMeetingUpdate(false);
                window.location.reload();
            })
        } else if(registComment.status === 400) {
            Swal.fire('의견 등록 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[registComment])

    const close = () => {
        setIsMeetingUpdate(false);
        setIsMeetingDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>회의보고서 수정</div>
                    <br/>
                   {meetingDetail &&
                   <form>
                   <div className={updateModalcss.displayBox}>
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
                            <td className={modalcss.worktable1stc}>{meetingDetail.Participants}</td>
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
                        <tr>
                            <td>Comment  &nbsp;:</td>
                            <td className={updateModalcss.updatetd}>
                            <textarea name="reportComment"
                                   placeholder={meetingDetail.reportComment}
                                   value={form.reportComment}
                                   onChange={onChangeHandler} 
                            ></textarea></td>
                        </tr>
                    </table>
                    </div>
                    </form>
                    }
                    <br/>
                    <div className={modalcss.modalbtn}>
                    <button onClick={onClickRegistComment}>완 료</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={close}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default UpdateModal;
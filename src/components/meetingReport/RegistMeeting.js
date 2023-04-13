import registMeeting from "./RegistMeeting.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {callRegistMeeting} from "../../apis/MeetingAPICalls";
import modalcss from "./DetailModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function RegistMeeting ({setIsMeetingRegist}){

    const dispatch = useDispatch();
    const postReport = useSelector(state => state.meetingReportReducer.postReport);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }

    const [form, setForm] = useState({
        meetingDate:"",
        location:"",
        empNo:decoded,
        participants:"",
        meetingReportTitle:"",
        meetingReportContent:"",
        conclusion:"",
        nextMeetingPlan:""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistMeeting = () =>{
            Swal.fire({
                title:'새로운 보고서를 등록하시겠습니까?',
                showCancelButton:true,
                cancelButtonText:'취소',
                confirmButtonText:'등록'
            }).then(dispatch(callRegistMeeting({
                form:form
            })))
            if(postReport.status === 201){
                Swal.fire('새로운 보고서가 등록되었습니다.', '리스트 조회 페이지로 돌아갑니다.', 'success')
                .then(
                    setIsMeetingRegist(false)
                )
            } else if(postReport.status === 400) {
                Swal.fire('보고서 등록에 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
            }
        
    }


    useEffect (()=>{
        if(postReport.status === 201){
            Swal.fire({
                icon : 'success',
                title :'새로운 보고서가 등록되었습니다.', 
                text :'리스트 조회 페이지로 돌아갑니다.'
            }).then((result)=>{
                if(result.isConfirmed)
                setIsMeetingRegist(false);
                window.location.reload()
            })
        } else if(postReport.status === 400) {
            Swal.fire('보고서 등록에 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[postReport])

    return(
        <>
            <div className={registMeeting.modal}>
                <div className={registMeeting.modalContainer}>
                <div className={registMeeting.modalTitle}>회의보고서 등록</div>
                    <br/>
                    <form>
                   <div className={registMeeting.displayBox}>
                    <table className={registMeeting.table2}>
                        <br/>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Meeting Date  &nbsp;:</td>
                            <td><input name="meetingDate" className={registMeeting.date2} value={form.meetingDate} onChange={onChangeHandler} type="date"/></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Location &nbsp;:</td>
                            <td><input className={registMeeting.title} name="location" value={form.location} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Participants  &nbsp;:</td>
                            <td><textarea className={registMeeting.etc} name="participants" value={form.participants} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><input className={registMeeting.title} name="meetingReportTitle" value={form.meetingReportTitle} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Content &nbsp;:</td>
                            <td><textarea className={registMeeting.content} name="meetingReportContent" value={form.meetingReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Next Meeting &nbsp;:</td>
                            <td><textarea className={registMeeting.content} name="nextMeetingPlan" value={form.nextMeetingPlan} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Conclusion  &nbsp;:</td>
                            <td><textarea className={registMeeting.con} name="conclusion" value={form.conclusion} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </form>
                    <br/>
                    <div className={modalcss.modalbtn}>
                    <button onClick={onClickRegistMeeting}>제 출</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={()=> setIsMeetingRegist(false)}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default RegistMeeting;
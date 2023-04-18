import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callUpdateMeetingForEmp, callMeetingDetailForEmp} from "../../apis/MeetingAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModalForEmp.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";
import registMeeting from "./RegistMeeting.module.css";


function UpdateModalForEmp ({setIsMeetingDetail, meetingReportCode, setIsUpdateEmp}){
    
    const dispatch = useDispatch();
    const meetingDetail = useSelector(state => state.meetingReportReducer.detailForEmp);
    const updateReport = useSelector(state => state.meetingReportReducer.putForEmp);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callMeetingDetailForEmp({
            meetingReportCode:meetingReportCode
        }))
    },[]);

    const [form, setForm] = useState({
        meetingDate:"",
        location:"",
        meetingReportTitle:"",
        meetingReportContent:"",
        conclusion:"",
        nextMeetingPlan:""
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickUpdate = () => {
        dispatch(callUpdateMeetingForEmp({
            form:form,
            meetingReportCode:meetingReportCode
        }))
        if(updateReport.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsUpdateEmp(false),
            setIsMeetingDetail(false)
        )
        } else if (updateReport.status !== 200){
            Swal.fire('작성실패', '다시 입력 부탁드립니다.', 'error')
        }
    }

    useEffect (()=>{
        if(updateReport.status === 200){
            Swal.fire({
                icon : 'success',
                title :'수정이 완료 되었습니다.', 
                text :'리스트 조회 페이지로 돌아갑니다.'
            }).then((result)=>{
                if(result.isConfirmed)
                setIsUpdateEmp(false);
                window.location.reload();
            })
        } else if(updateReport.status === 400) {
            Swal.fire('수정이 실패 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[updateReport])


    const close = () => {
        setIsUpdateEmp(false);
        setIsMeetingDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>출장보고서 수정</div>
                    <br/>
                   <form>
                   <div className={updateModalcss.displayBox}>
                   <table className={updateModalcss.table}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Meeting Date &nbsp;:</td>&nbsp;&nbsp;&nbsp;
                            <td style={{paddingRight:'3%'}}><input name="meetingDate" className={registMeeting.date2} value={form.meetingDate} onChange={onChangeHandler} type="date"/></td>
                        </tr>
                        </tbody>
                    </table>
                   <table className={updateModalcss.table2}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Location &nbsp;:</td>
                            <td><input className={registMeeting.title} name="location" value={form.location} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><textarea className={registMeeting.content} name="meetingReportTitle" value={form.meetingReportTitle} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Content  &nbsp;:</td>
                            <td><textarea className={registMeeting.issimp} name="meetingReportContent" value={form.meetingReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Next Meeting  &nbsp;:</td>
                            <td><textarea className={registMeeting.next} name="nextMeetingPlan" value={form.nextMeetingPlan} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
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
                    <button onClick={onClickUpdate}>완 료</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={close}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default UpdateModalForEmp;
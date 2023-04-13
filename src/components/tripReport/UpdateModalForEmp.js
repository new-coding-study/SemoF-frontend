import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callUpdateTripForEmp, callTripDetailForEmp} from "../../apis/TripReportAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModalForEmp.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";
import registTrip from "./RegistTrip.module.css";


function UpdateModalForEmp ({setIsTripDetail, tripReportCode, setIsUpdateEmp}){
    
    const dispatch = useDispatch();
    const tripDetail = useSelector(state => state.tripReportReducer.detailForEmp);
    const updateReport = useSelector(state => state.tripReportReducer.putForEmp);

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callTripDetailForEmp({
            tripReportCode:tripReportCode
        }))
    },[]);

    const [form, setForm] = useState({
        startDate:"",
        endDate:"",
        destination:"",
        tripReportTitle:"",
        tripReportContent:"",
        issuesImprovement:"",
        conclusion:""
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickUpdate = () => {
        dispatch(callUpdateTripForEmp({
            form:form,
            tripReportCode:tripReportCode
        }))
        if(updateReport.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsUpdateEmp(false),
            setIsTripDetail(false)
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
        setIsTripDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>출장보고서 수정</div>
                    <br/>
                   {tripDetail &&
                   <form>
                   <div className={updateModalcss.displayBox}>
                   <table className={updateModalcss.table}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Period &nbsp;:</td>
                            <td className={registTrip.tablechild2}><input className={registTrip.date1} name="startDate" value={form.startDate} onChange={onChangeHandler} type="date"/></td>
                            <td style={{width:'5px', float:'right',marginRight:'-15px'}}>&nbsp;~</td>
                            <td><input name="endDate" className={registTrip.date2} value={form.endDate} onChange={onChangeHandler} type="date"/></td>
                        </tr>
                        </tbody>
                    </table>
                   <table className={registTrip.table2}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Location &nbsp;:</td>
                            <td><input className={registTrip.title} name="destination" value={form.destination} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><textarea className={registTrip.content} name="tripReportTitle" value={form.tripReportTitle} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Content  &nbsp;:</td>
                            <td><textarea className={registTrip.issimp} name="tripReportContent" value={form.tripReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Issues & Improvement  &nbsp;:</td>
                            <td><textarea className={registTrip.next} name="issuesImprovement" value={form.issuesImprovement} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Conclusion  &nbsp;:</td>
                            <td><textarea className={registTrip.con} name="conclusion" value={form.conclusion} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </form>
                    }
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
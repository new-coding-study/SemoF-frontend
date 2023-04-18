import registTrip from "./RegistTrip.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {callRegistTrip} from "../../apis/TripReportAPICalls";
import modalcss from "./DetailModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function RegistTrip ({setIsTripRegist}){

    const dispatch = useDispatch();
    const postReport = useSelector(state => state.tripReportReducer.postReport);
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }

    const [form, setForm] = useState({
        startDate:"",
        endDate:"",
        empNo:decoded,
        destination:"",
        tripReportTitle:"",
        tripReportContent:"",
        issuesImprovement:"",
        conclusion:""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistTrip = () =>{
            Swal.fire({
                title:'새로운 보고서를 등록하시겠습니까?',
                showCancelButton:true,
                cancelButtonText:'취소',
                confirmButtonText:'등록'
            }).then(dispatch(callRegistTrip({
                form:form
            })))
            if(postReport.status === 201){
                Swal.fire('새로운 보고서가 등록되었습니다.', '리스트 조회 페이지로 돌아갑니다.', 'success')
                .then(
                    setIsTripRegist(false)
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
                setIsTripRegist(false);
                window.location.reload()
            })
        } else if(postReport.status === 400) {
            Swal.fire('보고서 등록에 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[postReport])

    return(
        <>
            <div className={registTrip.modal}>
                <div className={registTrip.modalContainer}>
                <div className={registTrip.modalTitle}>출장보고서 등록</div>
                    <br/>
                    <form>
                   <div className={registTrip.displayBox}>
                    <br/>
                    <table className={registTrip.table}>
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
                            <td><input className={registTrip.title} name="tripReportTitle" value={form.tripReportTitle} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Content &nbsp;:</td>
                            <td><textarea className={registTrip.content} name="tripReportContent" value={form.tripReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Issues & Improvement  &nbsp;:</td>
                            <td><textarea className={registTrip.etc} name="issuesImprovement" value={form.issuesImprovement} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Conclusion  &nbsp;:</td>
                            <td><textarea className={registTrip.con} name="conclusion" value={form.conclusion} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </form>
                    <br/>
                    <div className={modalcss.modalbtn}>
                    <button onClick={onClickRegistTrip}>제 출</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={()=> setIsTripRegist(false)}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default RegistTrip;
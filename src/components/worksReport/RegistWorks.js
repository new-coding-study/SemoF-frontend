import registWorks from "./RegistWorks.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {callRegistWorks} from "../../apis/WorksReportAPICalls";
import modalcss from "./DetailModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function RegistWorks ({setIsWorksRegist}){

    const dispatch = useDispatch();
    const postReport = useSelector(state => state.worksReportReducer.postReport);
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
        worksReportTitle:"",
        worksReportContent:"",
        issuesImprovement:"",
        nextPlan:"",
        etc:"",
        conclusion:""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistWorks = () =>{
            Swal.fire({
                title:'새로운 보고서를 등록하시겠습니까?',
                showCancelButton:true,
                cancelButtonText:'취소',
                confirmButtonText:'등록'
            }).then(dispatch(callRegistWorks({
                form:form
            })))
            if(postReport.status === 201){
                Swal.fire('새로운 보고서가 등록되었습니다.', '리스트 조회 페이지로 돌아갑니다.', 'success')
                .then(
                    setIsWorksRegist(false)
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
                setIsWorksRegist(false);
                window.location.reload();
            })
        } else if(postReport.status === 400) {
            Swal.fire('보고서 등록에 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[postReport])

    return(
        <>
            <div className={registWorks.modal}>
                <div className={registWorks.modalContainer}>
                <div className={registWorks.modalTitle}>업무보고서 등록</div>
                    <br/>
                    <form>
                   <div className={registWorks.displayBox}>
                    <br/>
                    <table className={registWorks.table}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Period &nbsp;:</td>
                            <td className={registWorks.tablechild2}><input className={registWorks.date1} name="startDate" value={form.startDate} onChange={onChangeHandler} type="date"/></td>
                            <td style={{width:'5px', float:'right',marginRight:'-15px'}}>&nbsp;~</td>
                            <td><input name="endDate" className={registWorks.date2} value={form.endDate} onChange={onChangeHandler} type="date"/></td>
                        </tr>
                        </tbody>
                    </table>
                    <table className={registWorks.table2}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><input className={registWorks.title} name="worksReportTitle" value={form.worksReportTitle} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Content &nbsp;:</td>
                            <td><textarea className={registWorks.content} name="worksReportContent" value={form.worksReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Issues & Improvement  &nbsp;:</td>
                            <td><textarea className={registWorks.issimp} name="issuesImprovement" value={form.issuesImprovement} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Next Plan  &nbsp;:</td>
                            <td><textarea className={registWorks.next} name="nextPlan" value={form.nextPlan} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>etc  &nbsp;:</td>
                            <td><textarea className={registWorks.etc} name="etc" value={form.etc} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <br/>
                        <tr>
                            <td className={modalcss.workstd1}>Conclusion  &nbsp;:</td>
                            <td><textarea className={registWorks.con} name="conclusion" value={form.conclusion} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </form>
                    <br/>
                    <div className={modalcss.modalbtn}>
                    <button onClick={onClickRegistWorks}>제 출</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={()=> setIsWorksRegist(false)}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default RegistWorks;
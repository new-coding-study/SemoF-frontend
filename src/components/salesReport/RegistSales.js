import registWorks from "./RegistSale.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {callRegistSales} from "../../apis/SalesReportAPICalls";
import modalcss from "./DetailModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function RegistSales ({setIsSalesRegist}){

    const dispatch = useDispatch();
    const postReport = useSelector(state => state.salesReportReducer.postReport);
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
        salesReportTitle:"",
        salesReportContent:"",
        customerComment:"",
        competitionAnalysis:"",
        issuesImprovement:"",
        nextPlan:"",
        conclusion:""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistSales = () =>{
            Swal.fire({
                title:'새로운 보고서를 등록하시겠습니까?',
                showCancelButton:true,
                cancelButtonText:'취소',
                confirmButtonText:'등록'
            }).then(dispatch(callRegistSales({
                form:form
            })))
            if(postReport.status === 201){
                Swal.fire('새로운 보고서가 등록되었습니다.', '리스트 조회 페이지로 돌아갑니다.', 'success')
                .then(
                    setIsSalesRegist(false)
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
                setIsSalesRegist(false);
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
                <div className={registWorks.modalTitle}>영업보고서 등록</div>
                    <br/>
                    <form>
                   <div className={registWorks.displayBox}>
                    <table className={registWorks.table}>
                        <tbody>
                        <tr className={registWorks.tr1st}>
                            <td className={modalcss.workstd1}>Period &nbsp;:</td>
                            <td className={registWorks.tablechild2}><input className={registWorks.date1} name="startDate" value={form.startDate} onChange={onChangeHandler} type="date"/></td>
                            <td style={{width:'5px', float:'right',marginRight:'-20px'}}>&nbsp;~</td>
                            <td><input name="endDate" className={registWorks.date2} value={form.endDate} onChange={onChangeHandler} type="date"/></td>
                        </tr>
                        </tbody>
                    </table>
                    <table className={registWorks.table2}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><input className={registWorks.title} name="salesReportTitle" value={form.salesReportTitle} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Content &nbsp;:</td>
                            <td><textarea className={registWorks.content} name="salesReportContent" value={form.salesReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Customer Comment  &nbsp;:</td>
                            <td><textarea className={registWorks.issimp} name="customerComment" value={form.customerComment} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Competition Analysis  &nbsp;:</td>
                            <td><textarea className={registWorks.next} name="competitionAnalysis" value={form.competitionAnalysis} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Issues & Improvement  &nbsp;:</td>
                            <td><textarea className={registWorks.etc} name="issuesImprovement" value={form.issuesImprovement} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Next Plan  &nbsp;:</td>
                            <td><textarea className={registWorks.etc} name="nextPlan" value={form.nextPlan} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Conclusion  &nbsp;:</td>
                            <td><textarea className={registWorks.con} name="conclusion" value={form.conclusion} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    </form>

                    <div className={modalcss.modalbtn} style={{marginTop:'1.3%'}}>
                    <button onClick={onClickRegistSales}>제 출</button>&nbsp;&nbsp;&nbsp;
                    <button onClick={()=> setIsSalesRegist(false)}>닫 기</button>
                    </div>
                </div>
            </div>
        </>
    )

}export default RegistSales;
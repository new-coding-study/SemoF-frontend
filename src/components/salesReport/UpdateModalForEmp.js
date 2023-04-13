import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callUpdateSalesForEmp, callSalesDetailForEmp} from "../../apis/SalesReportAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModalForEmp.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";
import registWorks from "./RegistSale.module.css";


function UpdateModal ({setIsSalesDetail, salesReportCode, setIsUpdateEmp}){
    
    const dispatch = useDispatch();
    const worksDetail = useSelector(state => state.salesReportReducer.detailForEmp);
    const updateReport = useSelector(state => state.salesReportReducer.putForEmp);

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callSalesDetailForEmp({
            salesReportCode:salesReportCode
        }))
    },[]);

    const [form, setForm] = useState({
        salesReportTitle:"",
        salesReportContent:"",
        customerComment:"",
        competitionAnalysis:"",
        issuesImprovement:"",
        nextPlan:"",
        conclusion:""
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickUpdate = () => {
        dispatch(callUpdateSalesForEmp({
            form:form,
            salesReportCode:salesReportCode
        }))
        if(updateReport.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsUpdateEmp(false),
            setIsSalesDetail(false)
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
        setIsSalesDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>영업보고서 수정</div>
                    <br/>
                   {worksDetail &&
                   <form>
                   <div className={updateModalcss.displayBox}>
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

}export default UpdateModal;
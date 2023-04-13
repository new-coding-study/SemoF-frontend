import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callUpdateWorksForEmp, callWorksDetailForEmp} from "../../apis/WorksReportAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModalForEmp.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";
import registWorks from "./RegistWorks.module.css";


function UpdateModal ({setIsWorksDetail, worksReportCode, setIsUpdateEmp}){
    
    const dispatch = useDispatch();
    const worksDetail = useSelector(state => state.worksReportReducer.detailForEmp);
    const updateReport = useSelector(state => state.worksReportReducer.putForEmp);

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callWorksDetailForEmp({
            worksReportCode:worksReportCode
        }))
    },[]);

    const [form, setForm] = useState({
        worksReportTitle:"",
        worksReportContent:"",
        issuesImprovement:"",
        nextPlan:"",
        etc:"",
        conclusion:""
    })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickUpdate = () => {
        dispatch(callUpdateWorksForEmp({
            form:form,
            worksReportCode:worksReportCode
        }))
        if(updateReport.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsUpdateEmp(false),
            setIsWorksDetail(false)
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
        setIsWorksDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>업무보고서 수정</div>
                    <br/>
                   {worksDetail &&
                   <form>
                   <div className={updateModalcss.displayBox}>
                   <table className={registWorks.table2}>
                        <tbody>
                        <tr>
                            <td className={modalcss.workstd1}>Title &nbsp;:</td>
                            <td><input className={registWorks.title} name="worksReportTitle" value={form.worksReportTitle} onChange={onChangeHandler} type="text"/></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Content &nbsp;:</td>
                            <td><textarea className={registWorks.content} name="worksReportContent" value={form.worksReportContent} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Issues & Improvement:</td>
                            <td><textarea className={registWorks.issimp} name="issuesImprovement" value={form.issuesImprovement} onChange={onChangeHandler}></textarea></td>
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>Next Plan  &nbsp;:</td>
                            <td><textarea className={registWorks.next} name="nextPlan" value={form.nextPlan} onChange={onChangeHandler}></textarea></td>                        
                        </tr>
                        <tr>
                            <td className={modalcss.workstd1}>etc  &nbsp;:</td>
                            <td><textarea className={registWorks.etc} name="etc" value={form.etc} onChange={onChangeHandler}></textarea></td>                        
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {callUpdateWorksForAdmin, callWorksDetailForAdmin} from "../../apis/WorksReportAPICalls";
import { useEffect, useState } from "react";
import updateModalcss from "./UpdateModal.module.css";
import {decodeJwt} from '../../utils/tokenUtils';
import modalcss from "./DetailModal.module.css";
import Swal from "sweetalert2";

function UpdateModal ({setIsWorksDetail, worksReportCode, setIsWorksUpdate}){
    
    const dispatch = useDispatch();
    const worksDetail = useSelector(state => state.worksReportReducer.detailForAdmin);
    const registComment = useSelector(state => state.worksReportReducer.putForAdmin);

    const navigate = useNavigate();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    useEffect(()=>{
        dispatch(callWorksDetailForAdmin({
            worksReportCode:worksReportCode
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
        dispatch(callUpdateWorksForAdmin({
            form:form,
            worksReportCode:worksReportCode
        }))
        if(registComment.status === 200){
        Swal.fire('작성완료', '게시판으로 돌아갑니다.', 'success')
        .then(
            setIsWorksUpdate(false),
            setIsWorksDetail(false)
        )
        } else{
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
                setIsWorksUpdate(false);
                window.location.reload();
            })
        } else if(registComment.status === 400) {
            Swal.fire('의견 등록 실패하였습니다.', '다시 입력부탁드립니다.', 'error')
        }
       
    },[registComment])

    const close = () => {
        setIsWorksUpdate(false);
        setIsWorksDetail(false);
    }

    return(
        <>
            <div className={updateModalcss.modal}>
                <div className={updateModalcss.modalContainer}>
                    <div className={updateModalcss.title}>업무보고서 수정</div>
                    <br/><br/>
                   {worksDetail &&
                   <form>
                   <div className={updateModalcss.displayBox}>
                    <table className={modalcss.worktable1}>
                        <tr>
                            <td>{worksDetail.worksReportTitle}</td>
                            <td style={{textAlign:'right'}}>작성자 : {worksDetail.empName} &nbsp; 작성일 : {worksDetail.reportWriteDate}</td>
                        </tr>
                    </table>

                    <table className={modalcss.worktable2}>
                        <tr>
                            <td>Period &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.startDate} ~ {worksDetail.endDate}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Content &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.worksReportContent}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Issues & Improvement  &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.issuesImprovement}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Next Plan  &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.nextPlan}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>etc  &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.etc}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Conclusion  &nbsp;:</td>
                            <td className={modalcss.worktable1stc}>{worksDetail.conclusion}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Comment  &nbsp;:</td>
                            <td className={updateModalcss.updatetd}>
                            <textarea name="reportComment"
                                   placeholder={worksDetail.reportComment}
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
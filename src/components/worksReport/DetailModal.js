import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {callWorksDetailForAdmin} from "../../apis/WorksReportAPICalls";
import modalcss from "./DetailModal.module.css";


function ReportDetail({setIsWorksDetail, worksReportCode}){
    const dispatch = useDispatch();
    const worksDetail = useSelector(state => state.worksReportReducer.detailForAdmin);

    useEffect(()=>{
        dispatch(callWorksDetailForAdmin({
            worksReportCode:worksReportCode
        }))
    }, [])

    return(
        <>
        <div className={modalcss.detailModal}>
            <div className={modalcss.modalContainer}>
            <div className={modalcss.modalTitle}>업무보고서 상세조회</div>
            <br/>
            <label>{worksDetail.worksReportTitle}</label>
            <br/>
            <label>작성자 : </label>
            <label>{worksDetail.empName}</label>
            <div>작성일 : {worksDetail.reportWriteDate}</div>
            <p>기간 : {worksDetail.startDate} ~ {worksDetail.endDate}</p>
            <label>내용 : </label>
            <div>{worksDetail.worksReportContent}</div>
            <label>문제와 해결방안 : </label>
            <div>{worksDetail.issuesImprovement}</div>
            <label>다음 계획: </label>
            <div>{worksDetail.nextPlan}</div>
            <label>기타 : </label>
            <div>{worksDetail.etc}</div>
            <label>결과 : </label>
            <div>{worksDetail.conclusion}</div>
            <label>의견 : </label>
            <div>{worksDetail.reportComment}</div>
            </div>
        </div>
        </>
    )   

}export default ReportDetail;
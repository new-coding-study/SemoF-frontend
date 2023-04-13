import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callWorksAllListEmpAPI} from "../../apis/WorksReportAPICalls";
import ReportDetail from "./DetailModal";
import worksCss from "./WorksReport.module.css";
import UpdateModal from "../worksReport/UpdateModal";
import RegistWorks from "./RegistWorks"
import { decodeJwt } from "../../utils/tokenUtils";
import UpdateModalForEmp from "./UpdateModalForEmp";

function WorksAllForEmp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const worksAll = useSelector(state => state.worksReportReducer.allForEmp);
    const postReport = useSelector(state => state.worksReportReducer.postReport);
    const updateReport = useSelector(state => state.worksReportReducer.putForEmp);
    const deleteReport = useSelector(state => state.worksReportReducer.deleteForEmp);
    const worksList = worksAll.data;

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = worksAll.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }


    const [isWorksDetail, setIsWorksDetail] = useState(false);
    const [isWorksUpdate, setIsWorksUpdate] = useState(false);
    const [isWorksRegist, setIsWorksRegist] = useState(false);
    const [isUpdateEmp, setIsUpdateEmp] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailWorks = (worksReportCode) =>{
        setIsWorksDetail(true);
        setIsReportNo(worksReportCode);
    }

    useEffect (() =>{
        dispatch(callWorksAllListEmpAPI({
            currentPage : currentPage,
            empNo:decoded
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callWorksAllListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[postReport])

    
    useEffect(()=>{
        if(updateReport.status === 201 || updateReport.status === 200){
            dispatch(callWorksAllListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[updateReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callWorksAllListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[deleteReport])


return(  
  <>
    {isUpdateEmp? <UpdateModalForEmp setIsUpdateEmp={setIsUpdateEmp} setIsWorksDetail={setIsWorksDetail} worksReportCode={isReportNo}/>:null}
    {isWorksRegist? <RegistWorks setIsWorksRegist={setIsWorksRegist}/>:null}
    {isWorksUpdate? <UpdateModal setIsWorksDetail={setIsWorksDetail} setIsWorksUpdate={setIsWorksUpdate} worksReportCode={isReportNo}/>:null}
    {isWorksDetail? <ReportDetail setIsUpdateEmp={setIsUpdateEmp} setIsWorksUpdate={setIsWorksUpdate} setIsWorksDetail={setIsWorksDetail} worksReportCode={isReportNo}/>:null}
        <div className={worksCss.outline}>
        <div style={{marginRight: '10%'}}>
        <button className={worksCss.back} onClick={() => navigate(-1)}>뒤로가기</button>
        <button className={worksCss.registWorks} onClick={()=>setIsWorksRegist(true)}>등록</button>
        </div>
            <br/><br/><br/>
            <table>
                <colgroup>
                    <col width="10%"/>
                    <col width="40%"/>
                    <col width="20%"/>
                    <col width="20%"/>
                    <col width="10%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <br/>
                <tbody>
                    {Array.isArray(worksList) && worksList.map((w) => (
                        <tr
                            key={w.worksReportCode}
                            onClick={()=>
                            onClickDetailWorks(w.worksReportCode)
                            }>
                            <td>{w.rowNum}</td>
                            <td>{w.worksReportTitle}</td>
                            <td>{w.empName}</td>
                            <td>{w.reportWriteDate}</td>
                            <td>{w.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={worksCss.pagingbtn}>
                    { Array.isArray(worksList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        >
                            &lt;&lt;&nbsp;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button>
                                    {num}&nbsp;
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(worksList) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.endPage || pageInfo.total === 0}
                        >
                            &gt;&gt;
                        </button>
                        
                    }
                </div>
                <br/>
        </div>
        </div>
    </>
    )
} export default WorksAllForEmp;
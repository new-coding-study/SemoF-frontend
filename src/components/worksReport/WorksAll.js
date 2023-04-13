import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callWorksAllListAdminAPI} from "../../apis/WorksReportAPICalls";
import ReportDetail from "./DetailModal";
import worksCss from "./WorksReport.module.css";
import UpdateModal from "../worksReport/UpdateModal";
import RegistWorks from "./RegistWorks"

function WorksAll () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const worksAll = useSelector(state => state.worksReportReducer.allForAdmin);
    const postReport = useSelector(state => state.worksReportReducer.postReport);
    const deleteReport = useSelector(state => state.worksReportReducer.deleteForEmp);
    const worksList = worksAll.data;

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

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailWorks = (worksReportCode) =>{
        setIsWorksDetail(true);
        setIsReportNo(worksReportCode);
    }

    useEffect (() =>{
        dispatch(callWorksAllListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callWorksAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callWorksAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[deleteReport])

return(  
  <>
    {isWorksRegist? <RegistWorks setIsWorksRegist={setIsWorksRegist}/>:null}
    {isWorksUpdate? <UpdateModal setIsWorksDetail={setIsWorksDetail} setIsWorksUpdate={setIsWorksUpdate} worksReportCode={isReportNo}/>:null}
    {isWorksDetail? <ReportDetail setIsWorksUpdate={setIsWorksUpdate} setIsWorksDetail={setIsWorksDetail} worksReportCode={isReportNo}/>:null}
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
} export default WorksAll;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callWorksAllListAdminAPI} from "../../apis/WorksReportAPICalls";
import ReportDetail from "./DetailModal";


function WorksAll () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const worksAll = useSelector(state => state.worksReportReducer.allForAdmin);
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

return(  
  <>
    {isWorksDetail? <ReportDetail setIsWorksDetail={setIsWorksDetail} worksReportCode={isReportNo}/>:null}
        <div>
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
        </div>
    </>
    )
} export default WorksAll
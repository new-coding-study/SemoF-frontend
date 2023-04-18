import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callTripAllListAdminAPI} from "../../apis/TripReportAPICalls";
import ReportDetail from "./DetailModal";
import tripCss from "./TripReport.module.css";
import UpdateModal from "../tripReport/UpdateModal";
import RegistTrip from "./RegistTrip";

function TripAll () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tripAll = useSelector(state => state.tripReportReducer.allForAdmin);
    const postReport = useSelector(state => state.tripReportReducer.postReport);
    const deleteReport = useSelector(state => state.tripReportReducer.deleteForEmp);
    const tripList = tripAll.data;

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = tripAll.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }


    const [isTripDetail, setIsTripDetail] = useState(false);
    const [isTripUpdate, setIsTripUpdate] = useState(false);
    const [isTripRegist, setIsTripRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailSales = (tripReportCode) =>{
        setIsTripDetail(true);
        setIsReportNo(tripReportCode);
    }

    useEffect (() =>{
        dispatch(callTripAllListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callTripAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callTripAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[deleteReport])

return(  
  <>
    {isTripRegist? <RegistTrip setIsTripRegist={setIsTripRegist}/>:null}
    {isTripUpdate? <UpdateModal setIsTripDetail={setIsTripDetail} setIsTripUpdate={setIsTripUpdate} tripReportCode={isReportNo}/>:null}
    {isTripDetail? <ReportDetail setIsTripUpdate={setIsTripUpdate} setIsTripDetail={setIsTripDetail} tripReportCode={isReportNo}/>:null}
        <div className={tripCss.outline}>
        <div style={{marginRight: '10%'}}>
        <button className={tripCss.back} onClick={() => navigate(-1)}>뒤로가기</button>
        <button className={tripCss.registWorks} onClick={()=>setIsTripRegist(true)}>등록</button>
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
                    {Array.isArray(tripList) && tripList.map((t) => (
                        <tr
                            key={t.tripReportCode}
                            onClick={()=>
                            onClickDetailSales(t.tripReportCode)
                            }>
                            <td>{t.rowNum}</td>
                            <td>{t.tripReportTitle}</td>
                            <td>{t.empName}</td>
                            <td>{t.reportWriteDate}</td>
                            <td>{t.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={tripCss.pagingbtn}>
                    { Array.isArray(tripList) &&
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
                    { Array.isArray(tripList) &&
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
} export default TripAll;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callTripNListEmpAPI} from "../../apis/TripReportAPICalls";
import tripCss from "./TripReport.module.css";
import ReportDetail from "./DetailModal";
import UpdateModal from "./UpdateModal";
import RegistTrip from "./RegistTrip";
import { decodeJwt } from "../../utils/tokenUtils";
import UpdateModalForEmp from "./UpdateModalForEmp";


function NStatusForEmp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllNStatus = useSelector(state => state.tripReportReducer.nForEmp);
    const postReport = useSelector(state => state.tripReportReducer.postReport);
    const deleteReport = useSelector(state => state.tripReportReducer.deleteForEmp);
    const updateReport = useSelector(state => state.tripReportReducer.putForEmp);

    const NStatusLists = AllNStatus.data;

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = AllNStatus.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    const [isTripDetail, setIsTripDetail] = useState(false);
    const [isTripUpdate, setIsTripUpdate] = useState(false);
    const [isTripRegist, setIsTripRegist] = useState(false);
    const [isUpdateEmp, setIsUpdateEmp] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')

    const onClickDetailWorks = (tripReportCode) =>{
        setIsTripDetail(true);
        setIsReportNo(tripReportCode);
    }

    useEffect (() =>{
        dispatch(callTripNListEmpAPI({
            currentPage : currentPage,
            empNo:decoded
        }));
    }, [currentPage]
    )


    useEffect(()=>{
        if(updateReport.status === 200){
            dispatch(callTripNListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[updateReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callTripNListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[deleteReport])

return(  
  <>
    {isUpdateEmp? <UpdateModalForEmp setIsUpdateEmp={setIsUpdateEmp} setIsTripDetail={setIsTripDetail} tripReportCode={isReportNo}/>:null}
    {isTripRegist? <RegistTrip setIsTripRegist={setIsTripRegist}/>:null}
    {isTripUpdate? <UpdateModal setIsTripDetail={setIsTripDetail} setIsTripUpdate={setIsTripUpdate} tripReportCode={isReportNo}/>:null}
    {isTripDetail? <ReportDetail setIsUpdateEmp={setIsUpdateEmp} setIsTripUpdate={setIsTripUpdate} setIsTripDetail={setIsTripDetail} tripReportCode={isReportNo}/>:null}
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
                    {Array.isArray(NStatusLists) && NStatusLists.map((n) => (
                        <tr
                            key={n.tripReportCode}
                            onClick={()=>
                            onClickDetailWorks(n.tripReportCode)
                            }>
                            <td>{n.rowNum}</td>
                            <td>{n.tripReportTitle}</td>
                            <td>{n.empName}</td>
                            <td>{n.reportWriteDate}</td>
                            <td>{n.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={tripCss.pagingbtn}>
                    { Array.isArray(NStatusLists) &&
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
                    { Array.isArray(NStatusLists) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.endPage || pageInfo.total === 0}
                        >
                            &gt;&gt;
                        </button>
                        
                    }
                </div>
                </div>
        </div>
    </>
    )
} export default NStatusForEmp;
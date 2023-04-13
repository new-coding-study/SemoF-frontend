import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callTripYListEmpAPI} from "../../apis/TripReportAPICalls";
import tripCss from "./TripReport.module.css";
import UpdateModal from "./UpdateModal";
import ReportDetail from "./DetailModal";
import RegistTrip from "./RegistTrip";
import { decodeJwt } from "../../utils/tokenUtils";
import UpdateModalForEmp from "./UpdateModalForEmp";

function YStatusForEmp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllYStatus = useSelector(state => state.tripReportReducer.yForEmp);
    const postReport = useSelector(state => state.tripReportReducer.postReport);
    const deleteReport = useSelector(state => state.tripReportReducer.deleteForEmp);
    const YStatusLists = AllYStatus.data;
    const updateReport = useSelector(state => state.tripReportReducer.putForEmp);


    useEffect(()=>{
        if(updateReport.status === 201 || updateReport.status === 200){
            dispatch(callTripYListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[updateReport])

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }


    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = AllYStatus.pageInfo;
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
    const onClickDetailSales = (tripReportCode) =>{
        setIsTripDetail(true);
        setIsReportNo(tripReportCode);
    }

    useEffect (() =>{
        dispatch(callTripYListEmpAPI({
            currentPage : currentPage,
            empNo:decoded
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callTripYListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callTripYListEmpAPI({
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
                    {Array.isArray(YStatusLists) && YStatusLists.map((y) => (
                        <tr
                            key={y.tripReportCode}
                            onClick={()=>
                            onClickDetailSales(y.tripReportCode)
                            }>
                            <td>{y.rowNum}</td>
                            <td>{y.tripReportTitle}</td>
                            <td>{y.empName}</td>
                            <td>{y.reportWriteDate}</td>
                            <td>{y.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={tripCss.pagingbtn}>
                    { Array.isArray(YStatusLists) &&
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
                    { Array.isArray(YStatusLists) &&
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
} export default YStatusForEmp;
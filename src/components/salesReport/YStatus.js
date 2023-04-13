import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callSalesYListAdminAPI} from "../../apis/SalesReportAPICalls";
import SalesCss from "./SalesReport.module.css";
import UpdateModal from "../salesReport/UpdateModal";
import ReportDetail from "./DetailModal";
import RegistSales from "./RegistSales"

function YStatus () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllYStatus = useSelector(state => state.salesReportReducer.yForAdmin);
    const postReport = useSelector(state => state.salesReportReducer.postReport);
    const deleteReport = useSelector(state => state.salesReportReducer.deleteForEmp);
    const YStatusLists = AllYStatus.data;

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = AllYStatus.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    const [isSalesDetail, setIsSalesDetail] = useState(false);
    const [isSalesUpdate, setIsSalesUpdate] = useState(false);
    const [isSalesRegist, setIsSalesRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailWorks = (salesReportCode) =>{
        setIsSalesDetail(true);
        setIsReportNo(salesReportCode);
    }

    useEffect (() =>{
        dispatch(callSalesYListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callSalesYListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callSalesYListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[deleteReport])
   
return(  
  <>
    {isSalesRegist? <RegistSales setIsSalesRegist={setIsSalesRegist}/>:null}
    {isSalesUpdate? <UpdateModal setIsSalesDetail={setIsSalesDetail} setIsSalesUpdate={setIsSalesUpdate} salesReportCode={isReportNo}/>:null}
    {isSalesDetail? <ReportDetail setIsSalesUpdate={setIsSalesUpdate} setIsSalesDetail={setIsSalesDetail} salesReportCode={isReportNo}/>:null}
        <div className={SalesCss.outline}>
        <div style={{marginRight: '10%'}}>
        <button className={SalesCss.back} onClick={() => navigate(-1)}>뒤로가기</button>
        <button className={SalesCss.registWorks} onClick={()=>setIsSalesRegist(true)}>등록</button>
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
                            key={y.salesReportCode}
                            onClick={()=>
                            onClickDetailWorks(y.salesReportCode)
                            }>
                            <td>{y.rowNum}</td>
                            <td>{y.salesReportTitle}</td>
                            <td>{y.empName}</td>
                            <td>{y.reportWriteDate}</td>
                            <td>{y.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={SalesCss.pagingbtn}>
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
} export default YStatus;
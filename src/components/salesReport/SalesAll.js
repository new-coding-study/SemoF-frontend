import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callSalesAllListAdminAPI} from "../../apis/SalesReportAPICalls";
import ReportDetail from "./DetailModal";
import SalesCss from "./SalesReport.module.css";
import UpdateModal from "../salesReport/UpdateModal";
import RegistSales from "./RegistSales"

function SalesAll () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const salesAll = useSelector(state => state.salesReportReducer.allForAdmin);
    const postReport = useSelector(state => state.salesReportReducer.postReport);
    const deleteReport = useSelector(state => state.salesReportReducer.deleteForEmp);
    const salesList = salesAll.data;

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = salesAll.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }


    const [isSalesDetail, setIsSalesDetail] = useState(false);
    const [isSalesUpdate, setIsSalesUpdate] = useState(false);
    const [isSalesRegist, setIsSalesRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailSales = (salesReportCode) =>{
        setIsSalesDetail(true);
        setIsReportNo(salesReportCode);
    }

    useEffect (() =>{
        dispatch(callSalesAllListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callSalesAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callSalesAllListAdminAPI({
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
                    {Array.isArray(salesList) && salesList.map((s) => (
                        <tr
                            key={s.salesReportCode}
                            onClick={()=>
                            onClickDetailSales(s.salesReportCode)
                            }>
                            <td>{s.rowNum}</td>
                            <td>{s.salesReportTitle}</td>
                            <td>{s.empName}</td>
                            <td>{s.reportWriteDate}</td>
                            <td>{s.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={SalesCss.pagingbtn}>
                    { Array.isArray(salesList) &&
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
                    { Array.isArray(salesList) &&
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
} export default SalesAll;
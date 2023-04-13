import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callSalesYListEmpAPI} from "../../apis/SalesReportAPICalls";
import SalesCss from "./SalesReport.module.css";
import UpdateModal from "./UpdateModal";
import ReportDetail from "./DetailModal";
import RegistSales from "./RegistSales"
import { decodeJwt } from "../../utils/tokenUtils";
import UpdateModalForEmp from "./UpdateModalForEmp";

function YStatusForEmp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllYStatus = useSelector(state => state.salesReportReducer.yForEmp);
    const postReport = useSelector(state => state.salesReportReducer.postReport);
    const deleteReport = useSelector(state => state.salesReportReducer.deleteForEmp);
    const YStatusLists = AllYStatus.data;
    const updateReport = useSelector(state => state.salesReportReducer.putForEmp);


    useEffect(()=>{
        if(updateReport.status === 201 || updateReport.status === 200){
            dispatch(callSalesYListEmpAPI({
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

    const [isSalesDetail, setIsSalesDetail] = useState(false);
    const [isSalesUpdate, setIsSalesUpdate] = useState(false);
    const [isSalesRegist, setIsSalesRegist] = useState(false);
    const [isUpdateEmp, setIsUpdateEmp] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailSales = (salesReportCode) =>{
        setIsSalesDetail(true);
        setIsReportNo(salesReportCode);
    }

    useEffect (() =>{
        dispatch(callSalesYListEmpAPI({
            currentPage : currentPage,
            empNo:decoded
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callSalesYListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callSalesYListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[deleteReport])
   
return(  
  <>
    {isUpdateEmp? <UpdateModalForEmp setIsUpdateEmp={setIsUpdateEmp} setIsSalesDetail={setIsSalesDetail} salesReportCode={isReportNo}/>:null}
    {isSalesRegist? <RegistSales setIsSalesRegist={setIsSalesRegist}/>:null}
    {isSalesUpdate? <UpdateModal setIsSalesDetail={setIsSalesDetail} setIsSalesUpdate={setIsSalesUpdate} salesReportCode={isReportNo}/>:null}
    {isSalesDetail? <ReportDetail setIsUpdateEmp={setIsUpdateEmp} setIsSalesUpdate={setIsSalesUpdate} setIsSalesDetail={setIsSalesDetail} salesReportCode={isReportNo}/>:null}
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
                            onClickDetailSales(y.salesReportCode)
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
} export default YStatusForEmp;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callSalesNListEmpAPI} from "../../apis/SalesReportAPICalls";
import SalesCss from "./SalesReport.module.css";
import ReportDetail from "./DetailModal.js";
import UpdateModal from "./UpdateModal";
import RegistSales from "./RegistSales"
import { decodeJwt } from "../../utils/tokenUtils";
import UpdateModalForEmp from "./UpdateModalForEmp";


function NStatusForEmp () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllNStatus = useSelector(state => state.salesReportReducer.nForEmp);
    const postReport = useSelector(state => state.salesReportReducer.postReport);
    const deleteReport = useSelector(state => state.salesReportReducer.deleteForEmp);
    const updateReport = useSelector(state => state.salesReportReducer.putForEmp);

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

    const [isSalesDetail, setIsSalesDetail] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isSalesRegist, setIsSalesRegist] = useState(false);
    const [isUpdateEmp, setIsUpdateEmp] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')

    const onClickDetailSales = (salesReportCode) =>{
        setIsSalesDetail(true);
        setIsReportNo(salesReportCode);
    }

    useEffect (() =>{
        dispatch(callSalesNListEmpAPI({
            currentPage : currentPage,
            empNo:decoded
        }));
    }, [currentPage]
    )


    useEffect(()=>{
        if(updateReport.status === 200){
            dispatch(callSalesNListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[updateReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callSalesNListEmpAPI({
                currentPage : currentPage,
                empNo:decoded
            }))
        }
    },[deleteReport])

return(  
  <>
    {isUpdateEmp? <UpdateModalForEmp setIsUpdateEmp={setIsUpdateEmp} setIsSalesDetail={setIsSalesDetail} salesReportCode={isReportNo}/>:null}
    {isSalesRegist? <RegistSales setIsSalesRegist={setIsSalesRegist}/>:null}
    {isUpdate? <UpdateModal setIsSalesDetail={setIsSalesDetail} setIsUpdate={setIsUpdate} salesReportCode={isReportNo}/>:null}
    {isSalesDetail? <ReportDetail setIsUpdateEmp={setIsUpdateEmp} setIsUpdate={setIsUpdate} setIsSalesDetail={setIsSalesDetail} salesReportCode={isReportNo}/>:null}
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
                    {Array.isArray(NStatusLists) && NStatusLists.map((n) => (
                        <tr
                            key={n.salesReportCode}
                            onClick={()=>
                                onClickDetailSales(n.salesReportCode)
                            }>
                            <td>{n.rowNum}</td>
                            <td>{n.salesReportTitle}</td>
                            <td>{n.empName}</td>
                            <td>{n.reportWriteDate}</td>
                            <td>{n.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={SalesCss.pagingbtn}>
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
                <br/>
                </div>
        </div>
    </>
    )
} export default NStatusForEmp;
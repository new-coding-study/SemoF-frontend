import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callWorksYListAdminAPI} from "../../apis/WorksReportAPICalls";

function YStatus () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllYStatus = useSelector(state => state.worksReportReducer.yForAdmin);
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

    useEffect (() =>{
        dispatch(callWorksYListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )
    const onClickWorksReport =() =>{
        
    }
return(  
  <>
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
                    {Array.isArray(YStatusLists) && YStatusLists.map((y) => (
                        <tr
                            key={y.worksReportCode}
                            onClick={()=>
                            onClickWorksReport(y.worksReportCode)
                            }>
                            <td>{y.rowNum}</td>
                            <td>{y.worksReportTitle}</td>
                            <td>{y.empName}</td>
                            <td>{y.reportWriteDate}</td>
                            <td>{y.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
} export default YStatus;
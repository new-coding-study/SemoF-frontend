import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callWorksNListAdminAPI} from "../../apis/WorksReportAPICalls";

function NStatus () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllNStatus = useSelector(state => state.worksReportReducer.nForAdmin);
    const NStatusLists = AllNStatus.data;

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = AllNStatus.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    useEffect (() =>{
        dispatch(callWorksNListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )
    const onClickWorksReport= (c) =>{

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
                    {Array.isArray(NStatusLists) && NStatusLists.map((n) => (
                        <tr
                            key={n.worksReportCode}
                            onClick={()=>
                            onClickWorksReport(n.worksReportCode)
                            }>
                            <td>{n.rowNum}</td>
                            <td>{n.worksReportTitle}</td>
                            <td>{n.empName}</td>
                            <td>{n.reportWriteDate}</td>
                            <td>{n.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
    )
} export default NStatus;
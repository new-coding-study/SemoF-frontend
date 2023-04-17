import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callMeetingNListAdminAPI} from "../../apis/MeetingAPICalls";
import meetingCss from "./MeetingReport.module.css";
import ReportDetail from "./DetailModal";
import UpdateModal from "../meetingReport/UpdateModal";
import RegistMeeting from "./RegistMeeting"

function NStatus () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllNStatus = useSelector(state => state.meetingReportReducer.nForAdmin);
    const postReport = useSelector(state => state.meetingReportReducer.postReport);
    const deleteReport = useSelector(state => state.meetingReportReducer.deleteForEmp);
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

    const [isMeetingDetail, setIsMeetingDetail] = useState(false);
    const [isMeetingUpdate, setIsMeetingUpdate] = useState(false);
    const [isMeetingRegist, setIsMeetingRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')

    const onClickDetailWorks = (meetingReportCode) =>{
        setIsMeetingDetail(true);
        setIsReportNo(meetingReportCode);
    }

    useEffect (() =>{
        dispatch(callMeetingNListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callMeetingNListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callMeetingNListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[deleteReport])

return(  
  <>
    {isMeetingRegist? <RegistMeeting setIsMeetingRegist={setIsMeetingRegist}/>:null}
    {isMeetingUpdate? <UpdateModal setIsMeetingDetail={setIsMeetingDetail} setIsMeetingUpdate={setIsMeetingUpdate} meetingReportCode={isReportNo}/>:null}
    {isMeetingDetail? <ReportDetail setIsMeetingUpdate={setIsMeetingUpdate} setIsMeetingDetail={setIsMeetingDetail} meetingReportCode={isReportNo}/>:null}
        <div className={meetingCss.outline}>
        <div style={{marginRight: '10%'}}>
        <button className={meetingCss.back} onClick={() => navigate(-1)}>뒤로가기</button>
        <button className={meetingCss.registWorks} onClick={()=>setIsMeetingRegist(true)}>등록</button>
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
                            key={n.meetingReportCode}
                            onClick={()=>
                            onClickDetailWorks(n.meetingReportCode)
                            }>
                            <td>{n.rowNum}</td>
                            <td>{n.meetingReportTitle}</td>
                            <td>{n.empName}</td>
                            <td>{n.reportWriteDate}</td>
                            <td>{n.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={meetingCss.pagingbtn}>
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
} export default NStatus;
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callMeetingAllListAdminAPI} from "../../apis/MeetingAPICalls";
import ReportDetail from "./DetailModal";
import meetingCss from "./MeetingReport.module.css";
import UpdateModal from "../meetingReport/UpdateModal";
import RegistMeeting from "./RegistMeeting";

function MeetingAll () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const meetingAll = useSelector(state => state.meetingReportReducer.allForAdmin);
    const postReport = useSelector(state => state.meetingReportReducer.postReport);
    const deleteReport = useSelector(state => state.meetingReportReducer.deleteForEmp);
    const meetingList = meetingAll.data;

    const [currentPage, setCurrentPage] = useState(1);
    console.log(currentPage+'====================')
    const pageNumber = [];
    const pageInfo = meetingAll.pageInfo;
    if(pageInfo){
        for(let i = 1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }


    const [isMeetingDetail, setIsMeetingDetail] = useState(false);
    const [isMeetingUpdate, setIsMeetingUpdate] = useState(false);
    const [isMeetingRegist, setIsMeetingRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailMeeting = (meetingReportCode) =>{
        setIsMeetingDetail(true);
        setIsReportNo(meetingReportCode);
    }

    useEffect (() =>{
        dispatch(callMeetingAllListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callMeetingAllListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callMeetingAllListAdminAPI({
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
                    {Array.isArray(meetingList) && meetingList.map((m) => (
                        <tr
                            key={m.meetingReportCode}
                            onClick={()=>
                            onClickDetailMeeting(m.meetingReportCode)
                            }>
                            <td>{m.rowNum}</td>
                            <td>{m.meetingReportTitle}</td>
                            <td>{m.empName}</td>
                            <td>{m.reportWriteDate}</td>
                            <td>{m.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={meetingCss.pagingbtn}>
                    { Array.isArray(meetingList) &&
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
                    { Array.isArray(meetingList) &&
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
} export default MeetingAll;
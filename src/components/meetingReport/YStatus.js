import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {callMeetingYListAdminAPI} from "../../apis/MeetingAPICalls";
import meetingCss from "./MeetingReport.module.css";
import UpdateModal from "../meetingReport/UpdateModal";
import ReportDetail from "./DetailModal";
import RegistMeeting from "./RegistMeeting";

function YStatus () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const AllYStatus = useSelector(state => state.meetingReportReducer.yForAdmin);
    const postReport = useSelector(state => state.meetingReportReducer.postReport);
    const deleteReport = useSelector(state => state.meetingReportReducer.deleteForEmp);
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

    const [isMeetingDetail, setIsMeetingDetail] = useState(false);
    const [isMeetingUpdate, setIsMeetingUpdate] = useState(false);
    const [isMeetingRegist, setIsMeetingRegist] = useState(false);

    const [isReportNo, setIsReportNo] = useState('')
    const onClickDetailWorks = (meetingReportCode) =>{
        setIsMeetingDetail(true);
        setIsReportNo(meetingReportCode);
    }

    useEffect (() =>{
        dispatch(callMeetingYListAdminAPI({
            currentPage : currentPage
        }));
    }, [currentPage]
    )

    useEffect(()=>{
        if(postReport.status === 201){
            dispatch(callMeetingYListAdminAPI({
                currentPage : currentPage
            }))
        }
    },[postReport])

    useEffect(()=>{
        if(deleteReport.status === 200){
            dispatch(callMeetingYListAdminAPI({
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
                    {Array.isArray(YStatusLists) && YStatusLists.map((y) => (
                        <tr
                            key={y.meetingReportCode}
                            onClick={()=>
                            onClickDetailWorks(y.meetingReportCode)
                            }>
                            <td>{y.rowNum}</td>
                            <td>{y.meetingReportTitle}</td>
                            <td>{y.empName}</td>
                            <td>{y.reportWriteDate}</td>
                            <td>{y.reportStatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <div>
                <div className={meetingCss.pagingbtn}>
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
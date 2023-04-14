import { useEffect } from "react";
import {callBoardNoticeTop3Lists} from "../../apis/BoardAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function BoardNoticeTop3 (){
    const notices = useSelector(state => state?.boardReducer.noticeTopList);   
    const noticeList = notices.data;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(noticeList);


    useEffect(()=>{
        dispatch(
            callBoardNoticeTop3Lists()
        );
    },[])
    
    const navigateBoard = () => {
        Swal.fire("게시판으로 이동합니다.", "", "info")
        .then(
            navigate("/semof/board")
        )
    }


    return(
        <>
        <table style={{textAlign:'center', margin:'auto', marginTop:'2%'}}>
        <tbody>
        { Array.isArray(noticeList) && noticeList.map((p) => (
            <tr
                key={p.boardCateCode}
                onClick={navigateBoard}
            >
                <td style={{borderBottom:'1px solid lightGray'}}><img
                src={"/images/noticeAlarm.png"}
                alt="공지사항 이미지"
                style={{width:'20px'}}
                /></td>
                <td style={{textAlign:'center', borderBottom:'1px solid lightGray', fontSize:'15px'}}>{p.boardTitle}</td>
                <td style={{fontSize:'12px', borderBottom:'1px solid lightGray'}}>{p.empName}</td>
                <td style={{fontSize:'12px', borderBottom:'1px solid lightGray'}}>{p.writeDate}</td>
            </tr>
            ))
        }
        </tbody>
        </table>
        </>    
    )
} export default BoardNoticeTop3;
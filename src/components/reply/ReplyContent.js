import { useDispatch } from "react-redux";
import contentcss from "./ContentCss.module.css";
import { useEffect, useState } from "react";
import { deleteReplyAdmin, deleteReplyEmp } from "../../apis/ReplyAPICalls";
import { useParams } from "react-router";


function ReplyContent({replyContent: {replyContent, empName, replyWriteDate, replyCode}}){

    const params =useParams();
    const dispatch = useDispatch();
    // const useState = useState();
    // const useEffect = useEffect();

    const deleteReplyForEmp = () => {
        dispatch(deleteReplyEmp({
            replyCode:replyCode,
            empNo:2
        })).then(
            console.log("deleteForEmp버튼 작동")
        )
    }

    const deleteReplyForAdmin = () => {
        dispatch(deleteReplyAdmin({
            boardNo:params.boardNo,
            replyCode: replyCode
        })).then(
            console.log("deleteForAdmin버튼 작동")
        )
    }

    return(
        <>
        <div style={{width:'100%'}}>
        <div className={contentcss.contour}>
        <button onClick= {deleteReplyForAdmin} className={contentcss.deleBtn}>x</button>
        {/* <button onClick= {deleteReplyForEmp} className={contentcss.deleBtn}>x</button> */}
        {/* 로그인시 empNo를 토큰에서 가져와서 삼항연산자로 버튼 처리하기 */}
        <p className={contentcss.content}>{replyContent}</p>
        <label className={contentcss.writer}>{empName}</label>&nbsp;
        <label className={contentcss.date}>{replyWriteDate}</label>
        
        </div>
        </div>
        </>
    )

}export default ReplyContent;
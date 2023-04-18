import { useDispatch } from "react-redux";
import contentcss from "./ContentCss.module.css";
import { useEffect, useState } from "react";
import { deleteReplyAdmin, deleteReplyEmp } from "../../apis/ReplyAPICalls";
import { useParams } from "react-router";
import {decodeJwt} from '../../utils/tokenUtils';


function ReplyContent({replyContent: {replyContent, empName, replyWriteDate, replyCode, empNo}}){

    const params =useParams();
    const dispatch = useDispatch();
    // const useState = useState();
    // const useEffect = useEffect();
    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let decodedAuth = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
        console.log('토큰의 empNo', decoded)
        decodedAuth = temp.auth[0];
    }

    console.log('댓글의 empNo', empNo);
    const deleteReplyForEmp = () => {
        dispatch(deleteReplyEmp({
            replyCode:replyCode,
            empNo:decoded
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
        {decodedAuth === "ROLE_ADMIN"?
        <button onClick= {deleteReplyForAdmin} className={contentcss.deleBtn}>x</button>
        :null}
        {decoded === empNo? 
        <button onClick= {deleteReplyForEmp} className={contentcss.deleBtn}>x</button>
        :null}
        <p className={contentcss.content}>{replyContent}</p>
        <label className={contentcss.writer}>{empName}</label>&nbsp;
        <label className={contentcss.date}>{replyWriteDate}</label>
        
        </div>
        </div>
        </>
    )

}export default ReplyContent;
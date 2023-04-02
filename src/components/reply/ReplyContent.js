import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react";
import { useParams } from "react-router-dom";
import {callAllRepliesAPI} from "../../apis/ReplyAPICalls";


function ReplyContent(){

    const dispatch = useDispatch();
    const replies = useSelector(state => state.replyReducer.getReplies)
    const replyLists = replies.data;
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = replies.pageInfo;
    const pageNumber = [];
    if(pageInfo){
        for(let i =1; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    useEffect(()=>{
        dispatch(callAllRepliesAPI({
            currentPage:currentPage,
            boardNo:params.boardNo
        }))
    },[currentPage])

}export default ReplyContent;
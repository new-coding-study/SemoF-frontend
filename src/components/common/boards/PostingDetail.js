import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callBoardPostingDetail } from "../../../apis/BoardAPICalls";
import postingdetailcss from "./PostingDetail.module.css";
import { useEffect } from "react";

function PostingDetail(){
    const dispatch = useDispatch();
    const params = useParams();
    const postingDetail = useSelector(state => state.boardReducer.postingDetail);
    const navigate = useNavigate();
    


    useEffect(()=>{
        dispatch(callBoardPostingDetail({
            boardNo:params.boardNo
        }));
    }, []);

    return(
        <>
        <div className={postingdetailcss.modal}>
            <div className={postingdetailcss.title}>게시글</div>
            <br/>
                <div className={postingdetailcss.displayBox}>
                    <div>
                             
                    <div style={{width:'100%'}}>
                    <div className={postingdetailcss.boardTitle}>
                    {postingDetail.boardTitle}
                    </div>
                    <div style={{float:'right'}}>
                    <div className={postingdetailcss.writer}>작성자: {postingDetail.empName}</div>
                    <div className={postingdetailcss.date}>일지: {postingDetail.writeDate}</div>
                    </div>
                    </div>
                    
                    </div>
                    <br/>
                    <br/>
                    <hr/>
                    <br/>
                    <div className={postingdetailcss.content}>{postingDetail.boardContent}</div>
                </div>
            </div>
        </>
    )
} export default PostingDetail;
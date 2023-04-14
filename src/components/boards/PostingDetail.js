import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { callBoardPostingDetail,
        callDeletePostingAPIForAdmin } from "../../apis/BoardAPICalls";
import postingdetailcss from "./PostingDetail.module.css";
import { useEffect, useState } from "react";
import PostingUpdate from "./PostingUpdate";
import PostingUpdateForAdmin from "./PostingUpdateForAdmin"
import Swal from "sweetalert2";
import Reply from "../reply/Reply";
import {decodeJwt} from '../../utils/tokenUtils';

function PostingDetail(){
    const dispatch = useDispatch();
    const params = useParams();
    const postingDetail = useSelector(state => state.boardReducer.postingDetail);
    const navigate = useNavigate();
    const [isUpdateModal, setIsUpdateModal] = useState(false);
    const [selectNo, setSelectNo] = useState('')
    const [isUpdateForAdmin, setIsUpdateForAdmin] = useState(false);
    useEffect(()=>{
        dispatch(callBoardPostingDetail({
            boardNo:params.boardNo
        }));
    }, []);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;
    let decodedEmpNo = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        decodedEmpNo = temp.empNo;
       
    }

    console.log(decodedEmpNo);

    const onClickUpdateForAdmin = () =>{
        setSelectNo(params.boardNo)
        setIsUpdateForAdmin(true)
    }

    const onClickUpdate = () =>{
        setSelectNo(params.boardNo)
        setIsUpdateModal(true)
    }
    const deletePosting = () =>{
        Swal.fire({
          title:'공지사항을 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '취소',
          confirmButtonText:'삭제'
        }).then((result)=>{
          if(result.isConfirmed){
              dispatch(callDeletePostingAPIForAdmin({
                  boardNo:params.boardNo
              }))
              Swal.fire('공지사항이 삭제되었습니다.','게시판으로 돌아갑니다','success')
              .then(
                  navigate(`/semof/board`, {replace: true})              
              )
          }
        })
      }

    return(
        <>
        {isUpdateForAdmin? <PostingUpdateForAdmin boardNo={selectNo} setIsUpdateForAdmin={setIsUpdateForAdmin}/>:null}
        {isUpdateModal? <PostingUpdate boardNo={selectNo} setIsUpdateModal={setIsUpdateModal}/>:null}
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
                    <div className={postingdetailcss.replyArea}><Reply/></div>
                    <br/>
                    <div className={postingdetailcss.content}>{postingDetail.boardContent}</div>
                </div>
                <br/>
                <br/>
                <div className={postingdetailcss.postingbtn}>
                {decoded === "ROLE_ADMIN"?
                <button onClick={onClickUpdateForAdmin}>관리자 수정</button>:null}&nbsp;&nbsp;

                {decoded === "ROLE_ADMIN"?
                <button onClick={deletePosting}>관리자 삭제</button>:null}&nbsp;&nbsp;

                {decodedEmpNo === postingDetail.empNo?
                <button onClick={onClickUpdate}>수정하기</button>:null}&nbsp;&nbsp;

                {decodedEmpNo === postingDetail.empNo?
                <button onClick={deletePosting}>게시글 삭제</button>:null}&nbsp;&nbsp;
                <button onClick={()=>navigate(-1)}>돌아가기</button>
                </div>
            </div>
        </>
    )
} export default PostingDetail;
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import modalcss from "./PostingUpdateModal.module.css";
import {callBoardPostingDetail,
        callUpdatePostingAPIForEmp
        } from "../../apis/BoardAPICalls";
import Swal from "sweetalert2";
import {decodeJwt} from '../../utils/tokenUtils';

function PostingUpdate({boardNo, setIsUpdateModal}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postingDetail = useSelector(state => state.boardReducer.postingDetail);
    const [form, setForm] = useState({});
    console.log(postingDetail);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo
    }

    console.log(decoded)

    useEffect(()=>{
        dispatch(callBoardPostingDetail({
            boardNo:boardNo
        }));
    },[]);

    useEffect(()=>{
        setForm({
            boardTitle:postingDetail.boardTitle,
            boardContent:postingDetail.boardContent,
            boardCateCode:postingDetail.boardCateCode,
            empNo:decoded
        });
    },[postingDetail]);

    // const [form, setForm] = useState({
    //     boardTitle:'',
    //     boardContent:'',
    //     boardCateCode:'',
    //     empNo:decoded
    // })

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };
 
    const onClickUpdatePostingHandler = () =>{
        
        const formData = new FormData();
        formData.append("boardTitle", form.boardTitle);
        formData.append("boardContent", form.boardContent);
        formData.append("boardCateCode", form.boardCateCode);
        formData.append("empNo", form.empNo);

        console.log(form.boardTitle+'=================11213'); 
        console.log(form.boardContent+'=================1231233'); 
        console.log(form.boardCateCode+'=================12312321'); 


        Swal.fire({
            title:'변경된 내용을 저장하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '저장하기',
            cancelButtonText: '취소'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callUpdatePostingAPIForEmp({
                    form:formData,
                    boardNo:boardNo
                }))
                Swal.fire('저장하기', '게시판으로 돌아갑니다.', 'success')
                .then(
                    navigate(`/semof/board`, {replace:true})
                )
                
                
            }

        } );    
    }

    return(
        <>
        <div className={modalcss.modal}>
            <div className={modalcss.modalContainer}>
                <div className={modalcss.title}>게시글 수정</div>
            <br/>
            <div className={modalcss.displayBox}>
            {postingDetail &&
            <form>
                <br/>
                <label for="boardTitle">제목 : </label>
                <input
                    name="boardTitle"
                    placeholder={postingDetail.boardTitle}
                    value={form?.boardTitle}
                    onChange={onChangeHandler}
                    required
                />
                <br/>
                <br/>
                <br/>
                <label for="category"> 게시글 유형 : </label>
                    <select name="boardCateCode" onChange={onChangeHandler} value={ form.boardCateCode} required>
                        <option disabled>게시글 유형을 선택하세요</option>
                        <option value="2" selected>게시글</option>
                    </select>
                <br/>
                <br/>
                <br/>  
                <label for = "boardContent">내용 : </label>
                <br/>
                <textarea
                    name="boardContent"
                    placeholder={postingDetail.boardContent}
                    value={form.boardContent}
                    onChange={onChangeHandler}
                    required
                ></textarea>
            </form>
            }
        </div>
        <br/>
        <div className={modalcss.modalbtn}>
        <button onClick={onClickUpdatePostingHandler}>완료</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={()=> setIsUpdateModal(false)}>닫기</button>
        </div>
        </div>
        </div>
        </>
    )
} export default PostingUpdate;
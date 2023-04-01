import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callBoardNoticeDetail, callUpdateNoticeAPI } from "../../../apis/BoardAPICalls";
import Swal from "sweetalert2";
import modalcss from "./UpdateModal.module.css";

function NoticeUpdate({boardNo, setIsUpdateNotice}){

    const dispatch = useDispatch();
    const noticeDetail = useSelector(state => state.boardReducer.noticeDetail);
    // const params = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    console.log(noticeDetail)



    useEffect(()=>{
        dispatch(callBoardNoticeDetail({
            boardNo:boardNo
        }));
    }, []);

    useEffect(()=>{
        setForm({
            boardTitle: noticeDetail.boardTitle,
            boardContent: noticeDetail.boardContent,
            boardCateCode : noticeDetail.boardCateCode
        })}
    , [noticeDetail])

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    


    const onClickUpdateNoticeHandler = () =>{
        
        const formData = new FormData();
        formData.append("boardTitle", form.boardTitle);
        formData.append("boardContent", form.boardContent);
        formData.append("boardCateCode", form.boardCateCode);

        Swal.fire({
            title:'변경된 내용을 저장하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '저장하기'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callUpdateNoticeAPI({
                    form:formData,
                    boardNo:boardNo
                }))
                Swal.fire('저장하기', '게시판으로 돌아갑니다.', 'success')
                .then(
                    navigate(`/semof/board`, {replace: true}),
                    window.location.reload()
                )
            }

        } );    
    }

    return(
        <>
        <div className={modalcss.modal}>
            <div className={modalcss.modalContainer}>
                <div className={modalcss.title}>공지사항 수정</div>
            {noticeDetail &&
            <form>
                <input
                    name="boardTitle"
                    placeholder={noticeDetail.boardTitle}
                    value={form?.boardTitle}
                    onChange={onChangeHandler}
                    required
                />
                    <label for="category">카테고리선택</label>
                            <select name="boardCateCode" onChange={onChangeHandler} value={ form.boardCateCode} required>
                                <option value="1">공지사항</option>
                                <option value="2">게시글</option>
                            </select>  
                <textarea
                    name="boardContent"
                    placeholder={noticeDetail.boardContent}
                    value={form.boardContent}
                    onChange={onChangeHandler}
                    required
                ></textarea>
            </form>
            }
            <button onClick={onClickUpdateNoticeHandler}>완료</button>
            <button onClick={()=> setIsUpdateNotice(false)}>닫기</button>
        </div>
        </div>
        </>
    )

}export default NoticeUpdate;
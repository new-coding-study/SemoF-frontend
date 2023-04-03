import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResgistForAdmin from "./RegistForAdmin.module.css";
import { useEffect, useState } from "react";
import {callBoardNoticeDetail, callRegistAPIForAdmin} from "../../apis/BoardAPICalls";
import Swal from "sweetalert2";

function BoardRegistForAdmin({setIsRegistModalForAdmin}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [boardInfo, setBoardInfo] = useState({
        boardTitle:'',
        // empNo:'',
        boardCateCode:0,
        boardContent:''
    });

    const onChangeHandler = (e) => {
        setBoardInfo({
            ...boardInfo,
            [e.target.name]: e.target.value
        });
    };


    const onClickRegistBoard = () =>{

        const formData = new FormData();

        formData.append("boardTitle", boardInfo.boardTitle);
        formData.append("boardCateCode", boardInfo.boardCateCode);
        formData.append("boardContent", boardInfo.boardContent);



        console.log(boardInfo.boardTitle + "121ladsf==========")
        console.log(boardInfo.boardCateCode + "121ladsf==========")
        console.log(boardInfo.boardContent + "121ladsf==========")

        Swal.fire({
            title:'새로운 게시물을 등록 하시겠습니까?',
            showCancelButton: true,
            cancelButtonText: '취소',
            confirmButtonText: '확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callRegistAPIForAdmin({
                    boardInfo:formData
                }))
                Swal.fire('새로운 게시물이 등록되었습니다.', '게시판으로 돌아갑니다.', 'success')
                .then(
                    window.location.reload(),
                    navigate(`/semof/board`, {replace: true}),
                    setIsRegistModalForAdmin(false)
                )
            }

        } );    
        
    }

  
  

    return(
        <>
        <div className={ResgistForAdmin.modal}>
            <div className={ResgistForAdmin.modalContainer}>
                <div className={ResgistForAdmin.title}>공지사항 & 게시글 등록</div>
            <br/>
            <div className={ResgistForAdmin.displayBox}>
            <form>
                <br/>
                <label for="boardTitle">제목 : </label>
                <input
                    name="boardTitle"
                    placeholder='제목을 입력해주세요'
                    value={boardInfo.boardTitle}
                    onChange={onChangeHandler}
                    required
                />
                <br/>
                <br/>
                <br/>
                <label for="category"> 게시글 유형 : </label>
                    <select name="boardCateCode" onChange={onChangeHandler} value={ boardInfo.boardCateCode} required>
                        <option>게시글 유형을 선택하세요</option>
                        <option value="1">공지사항</option>
                        <option value="2">게시글</option>
                    </select>
                <br/>
                <br/>
                <br/>  
                <label for = "boardContent">내용 : </label>
                <br/>
                <textarea
                    name="boardContent"
                    placeholder='내용을 입력해주세요'
                    value={boardInfo.boardContent}
                    onChange={onChangeHandler}
                    required
                ></textarea>
            </form>
        </div>
        <br/>
        <div className={ResgistForAdmin.modalbtn}>
        <button className={ResgistForAdmin.registBtn} onClick={onClickRegistBoard}>완료</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button className={ResgistForAdmin.registBtn} onClick={()=> setIsRegistModalForAdmin(false)}>닫기</button>
        </div>
        </div>
        </div>
        </>
    )
}export default BoardRegistForAdmin;
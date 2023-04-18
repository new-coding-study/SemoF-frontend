import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResgistForAdmin from "./RegistForAdmin.module.css";
import { useEffect, useState } from "react";
import {callRegistPostingAPI, callBoardPostingListAPI} from "../../apis/BoardAPICalls";
import {decodeJwt} from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function BoardRegistForEmp({ setIsRegistModalForEmp }) {

  const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.empNo;
       
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const postingRegist = useSelector(state => state.boardReducer.postingRegist) 

    const [postingInfo, setPostingInfo] = useState({
        boardTitle:'',
        empNo:decoded,
        boardCateCode:0,
        boardContent:''
    })

  const onChangeHandler = (e) => {
    setPostingInfo({
      ...postingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onClickRegistBoard = () => {
    const formData = new FormData();

    formData.append("boardTitle", postingInfo.boardTitle);
    formData.append("boardCateCode", postingInfo.boardCateCode);
    formData.append("boardContent", postingInfo.boardContent);
    formData.append("empNo", postingInfo.empNo);
    console.log(postingInfo.boardTitle + "121ladsf==========");
    console.log(postingInfo.boardCateCode + "121ladsf==========");
    console.log(postingInfo.boardContent + "121ladsf==========");
    console.log(postingInfo.empNo + "121ladsf==========");


        Swal.fire({
            title:'새로운 게시물을 등록 하시겠습니까?',
            showCancelButton: true,
            cancelButtonText: '취소',
            confirmButtonText: '확인'
        }).then((result) =>{
            if(result.isConfirmed){
                dispatch(callRegistPostingAPI({
                    postingInfo:formData
                }))
                Swal.fire('새로운 게시물이 등록되었습니다.', '게시판으로 돌아갑니다.', 'success')
                .then(
                    // window.location.reload(),
                    navigate(`/semof/board`, {replace: true}),
                    setIsRegistModalForEmp(false)
                )
            }

        } );    
        
    }

    useEffect(()=>{
        if(postingRegist.status === 200){
        dispatch(callBoardPostingListAPI({
        }));
    } else if (postingRegist.status === 400){
        alert("등록실패")
    }
    },[postingRegist])
  
  
  return (
    <>
      <div className={ResgistForAdmin.modal}>
        <div className={ResgistForAdmin.modalContainer}>
          <div className={ResgistForAdmin.title}>게시글 등록</div>
          <br />
          <div className={ResgistForAdmin.displayBox}>
            <form>
              <br />
              <label for="boardTitle">제목 : </label>
              <input
                name="boardTitle"
                placeholder="제목을 입력해주세요"
                value={postingInfo.boardTitle}
                onChange={onChangeHandler}
                required
              />
              <br />
              <br />
              <br />
              <label for="category"> 게시글 유형 : </label>
              <select
                name="boardCateCode"
                onChange={onChangeHandler}
                value={postingInfo.boardCateCode}
                required
              >
                <option>게시글 유형을 선택하세요</option>
                <option value="2" selected>
                  게시글
                </option>
              </select>
              <br />
              <br />
              <br />
              <label for="boardContent">내용 : </label>
              <br />
              <textarea
                name="boardContent"
                placeholder="내용을 입력해주세요"
                value={postingInfo.boardContent}
                onChange={onChangeHandler}
                required
              ></textarea>
            </form>
          </div>
          <br />
          <div className={ResgistForAdmin.modalbtn}>
            <button onClick={onClickRegistBoard}>완료</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => setIsRegistModalForEmp(false)}>닫기</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BoardRegistForEmp;

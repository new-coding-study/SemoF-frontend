import ReplyContent from "./ReplyContent";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {callRegistReply
            ,callAllRepliesAPI} from "../../apis/ReplyAPICalls";
import { useParams } from "react-router-dom";
import replycss from "./Replycss.module.css";

function Reply(){
    const dispatch = useDispatch();
    const replies = useSelector(state => state.replyReducer.getReplies)
    const postReply = useSelector(state => state.replyReducer.postReply)
    const deleteReply = useSelector(state => state.replyReducer.deleteReply)
    const replyLists = replies.data;
    const params = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const pageInfo = replies.pageInfo;
    const pageNumber = [];
    if(pageInfo){
        for(let i =pageInfo.startPage; i <= pageInfo.endPage; i++){
            pageNumber.push(i);
        }
    }

    const initialFormState = {
        replyContent:"",
    };

    const resetForm = () => {
        return initialFormState;
    }

    console.log(pageInfo);


    useEffect(()=>{
        if(deleteReply.status === 200){
            dispatch(callAllRepliesAPI({
                currentPage:currentPage,
                boardNo:params.boardNo
            })
            )
        } else if(deleteReply.status === 400)
        {
            alert("삭제실패");
        }
    },[deleteReply])


    useEffect(()=>{
        dispatch(callAllRepliesAPI({
            currentPage:currentPage,
            boardNo:params.boardNo
        }))
    },[currentPage])
    
    useEffect(()=>{
        if(postReply.status === 201){
            dispatch(callAllRepliesAPI({
                currentPage:currentPage,
                boardNo:params.boardNo
            })
            ).then(
                form
            )
        } else if(postReply.status === 400)
        {
            alert("등록실패");
        }
    },[postReply])


    const[form, setForm] = useState({
        replyContent:''
    });
    // const [newForm, setNewForm] = useState([]);
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistReply = () =>{
        const formData = new FormData();

        
        formData.append("boardNo", params.boardNo);
        formData.append("replyContent", form.replyContent);
        formData.append("empNo",1);

        console.log('댓글내용',form.replyContent, formData.replyContent);

        dispatch(callRegistReply({
            boardNo:params.boardNo,            
            aform : form.replyContent,
            empNo:2
        }));

        setForm(resetForm());

    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();
            onClickRegistReply();
        }
    }
 
    return(
        <>
        <ul className={replycss.replyArea}>
        <li className={replycss.displayArea}>
            <div className={replycss.contentArea}>
                {Array.isArray(replyLists) && replyLists.map((reply) => (<ReplyContent key={reply.replyCode} replyContent={reply}/>))}
            </div>
            <hr style={{border:'0.5px solid orange'}}/>
            <div className={replycss.contentPagingbtn}>
            { Array.isArray(replyLists) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px', background:'none'}}>
                            &lt;&lt;&nbsp;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button className={replycss.pagingBtn}>
                                    {num}&nbsp;
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(replyLists) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.buttonAmount || pageInfo.total === 0}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px', background:'none'}}>
                            &gt;&gt;
                        </button>
                        
                    }
            </div>
        </li>
        <li className={replycss.inputArea}>
            <div className={replycss.textInputArea}>
            <form>
                <textarea
                    onKeyDown={handleKeyPress} 
                    style={{paddingTop:'10px'}}
                    className={replycss.textBox}
                    name="replyContent"
                    placeholder="내용을 입력해주세요"
                    value={form.replyContent}
                    id='textarea'
                    onChange={onChangeHandler}
                ></textarea>
            </form>
            </div>
            <div className={replycss.btnArea}>
            <button className={replycss.registbtn} onClick={onClickRegistReply}>등 록</button>
            </div>
        </li>
        </ul>
        </>
    )
} export default Reply;
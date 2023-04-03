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
    
    const[form, setForm] = useState({
        replyContent:''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const onClickRegistReply = () =>{
        const formData = new FormData();

        formData.append("replyContent", form.replyContent);

        dispatch(callRegistReply({
            form:form,
            boardNo:params.boardNo
        }));

    }
 
    return(
        <>
        <ul className={replycss.replyArea}>
        <div className={replycss.displayArea}>
            <div>
                {Array.isArray(replyLists) && replyLists.map((reply) => (<ReplyContent key={reply.replyCode} replyContent={reply}/>))}
            </div>
            <div>
            { Array.isArray(replyLists) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage -1 )}
                        disabled={currentPage ===1}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &lt;&lt;&nbsp;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <li
                            style={{listStyle: 'none', display:'inline'}} key={num} onClick={() => setCurrentPage(num)}>
                                <button>
                                    {num}&nbsp;
                                </button>
                            </li>
                        ))
                    }
                    { Array.isArray(replyLists) &&
                        <button 
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled = {currentPage === pageInfo.endPage || pageInfo.total === 0}
                        style={{color: '#ff7f00', border:'none', fontWeight:'bold', fontSize:'15px'}}>
                            &gt;&gt;
                        </button>
                        
                    }
            </div>
        </div>
            <div className={replycss.inputArea}>
            <div>
            <form>
                <textarea
                    className={replycss.textBox}
                    name="replyContent"
                    placeholder="내용을 입력해주세요"
                    value={form.replyContent}
                    onChange={onChangeHandler}
                ></textarea>
            </form>
            </div>
            <div>
            <button className={replycss.registbtn} onClick={onClickRegistReply}>등록</button>
            </div>
            </div>
        </ul>
        </>
    )
} export default Reply;
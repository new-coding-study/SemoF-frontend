import { useState } from "react";
import Posting from "../../components/common/boards/Posting";
import Notice from "../../components/common/boards/Notice";
import boardcss from "./Board.module.css"
function Board(){

    const [showNoticeList, setShowNoticeList] = useState(false);

    const handleButtonClick = (event) => {
      const buttonId = event.target.id;
      if (buttonId === 'noticeButton') {
        setShowNoticeList(true);
      } else if (buttonId === 'postButton') {
        setShowNoticeList(false);
      }
    };
    
    
    return (
        <>
            <div>
            <div className={boardcss.title}>게시판</div>
            <br/>
            <div className={boardcss.btnPosition}>
            <button id="postButton" onClick={handleButtonClick}>
                공지사항 
            </button>
            <button id="noticeButton" onClick={handleButtonClick}>
                게시글
            </button>
            </div>
            <div>
            {showNoticeList ? <Posting /> : <Notice />}
            </div>
            </div>
        </>
    )
}
export default Board;
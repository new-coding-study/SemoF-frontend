import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailDetailCSS from "./EmailDetail.module.css";
import EmailCSS from "../../pages/email/Email.module.css";
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import SearchBox from "./SearchBox";
import Swal from "sweetalert2";
import { callSendEmailAPI, callMoveTrashAPI } from "../../apis/EmailAPICalls";

function SendEmailDetail() {
  const { mailNo } = useParams();
  console.log("[EmailDetail] send mailNo: " + mailNo);

  console.log("[SendEmailDetail] Rendering SendEmailDetail");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.emailReducer.emailDetail);

  // console.log("[SendEmailDetail] email : " + JSON.stringify(email));

  useEffect(() => {
    console.log("[EmailDetail] useEffect, mailNo: " + mailNo);
    dispatch(callSendEmailAPI({ mailNo }));
  }, [dispatch, mailNo]);

  // 드랍다운 모달을 열기 위한 state 변수와 함수
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // 이메일 삭제 핸들러
  const handleDeleteEmail = () => {
    dispatch(
      callMoveTrashAPI({
        mailNo: mailNo,
        category: "send",
      })
    ).then(() => setDeleteModalOpen(false));

    Swal.fire({
      icon: "success",
      text: "이메일이 삭제되었습니다.",
    });

    navigate(-1);
    dispatch(callSendEmailAPI({ mailNo }));
  };

  return email ? (
    <div className={EmailCSS.contentWrapper}>
      <div className={EmailCSS.mailBody}>
        <div className={EmailCSS.navBar}>
          <SideNavbar />
        </div>
        <div className={EmailCSS.content}>
          <SearchBox />
          <Header />
          <div className={EmailDetailCSS.emailDetail}>
            <div className={EmailDetailCSS.emailDetailHeader}>
              <h1 className={EmailDetailCSS.emailDetailSubject}>
                {email.title}
              </h1>
              <div className={EmailDetailCSS.emailDetailHeaderInfo}>
                <div>
                  <span>To: </span>
                  <span>{email.senderName}</span>
                </div>
                <div>
                  <span>{email.sendDate}</span>
                </div>
                <button
                  className={EmailDetailCSS.deleteBtn}
                  onClick={openDeleteModal}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 24C16.5523 24 17 23.5523 17 23C17 22.4477 16.5523 22 16 22C15.4477 22 15 22.4477 15 23C15 23.5523 15.4477 24 16 24Z"
                      stroke="#2E4454"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
                      stroke="#2E4454"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 10C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8C15.4477 8 15 8.44772 15 9C15 9.55228 15.4477 10 16 10Z"
                      stroke="#2E4454"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className={EmailDetailCSS.emailDetailBody}>
              <p>{email.content}</p>
            </div>
          </div>
        </div>
      </div>
      {deleteModalOpen && (
        <div className={EmailDetailCSS.deleteModalWrapper}>
          <div className={EmailDetailCSS.deleteModal}>
            <h2 className={EmailDetailCSS.deleteModalTitle}>삭제하기</h2>
            <p className={EmailDetailCSS.deleteModalDescription}>
              이메일을 삭제하시겠습니까?
            </p>
            <div className={EmailDetailCSS.deleteModalButtons}>
              <button
                className={EmailDetailCSS.deleteModalButton}
                onClick={handleDeleteEmail}
              >
                삭제
              </button>
              <button
                className={EmailDetailCSS.deleteModalButton}
                onClick={() => setDeleteModalOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
          <div
            className={EmailDetailCSS.modalBackground}
            onClick={() => setDeleteModalOpen(false)}
          ></div>
        </div>
      )}
    </div>
  ) : (
    <div>Loading email...</div>
  );
}

export default SendEmailDetail;

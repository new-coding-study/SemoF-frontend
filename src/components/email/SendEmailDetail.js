import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailDetailCSS from "./EmailDetail.module.css";
import EmailCSS from "../../pages/email/Email.module.css";
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import SearchBox from "./SearchBox";
import { callSendEmailAPI } from "../../apis/EmailAPICalls";

function SendEmailDetail() {
  const { mailNo } = useParams();
  console.log("[EmailDetail] send mailNo: " + mailNo);

  console.log("[SendEmailDetail] Rendering SendEmailDetail");

  const dispatch = useDispatch();

  const email = useSelector((state) => state.emailReducer.emailDetail);

  // console.log("[SendEmailDetail] email : " + JSON.stringify(email));

  useEffect(() => {
    console.log("[EmailDetail] useEffect, mailNo: " + mailNo);
    dispatch(callSendEmailAPI({ mailNo }));
  }, [dispatch, mailNo]);

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
                  <span>From: </span>
                  <span>{email.senderName}</span>
                  <button className={EmailDetailCSS.emailDeleteBtn}>
                    <svg
                      width="4"
                      height="15"
                      viewBox="0 0 4 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.00065 3.66659C2.91732 3.66659 3.66732 2.91659 3.66732 1.99992C3.66732 1.08325 2.91732 0.333252 2.00065 0.333252C1.08398 0.333252 0.333984 1.08325 0.333984 1.99992C0.333984 2.91659 1.08398 3.66659 2.00065 3.66659ZM2.00065 5.33325C1.08398 5.33325 0.333984 6.08325 0.333984 6.99992C0.333984 7.91659 1.08398 8.66659 2.00065 8.66659C2.91732 8.66659 3.66732 7.91659 3.66732 6.99992C3.66732 6.08325 2.91732 5.33325 2.00065 5.33325ZM2.00065 10.3333C1.08398 10.3333 0.333984 11.0833 0.333984 11.9999C0.333984 12.9166 1.08398 13.6666 2.00065 13.6666C2.91732 13.6666 3.66732 12.9166 3.66732 11.9999C3.66732 11.0833 2.91732 10.3333 2.00065 10.3333Z"
                        fill="#767676"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <span>{email.sendDate}</span>
                </div>
              </div>
            </div>
            <div className={EmailDetailCSS.emailDetailBody}>
              <p>{email.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading email...</div>
  );
}

export default SendEmailDetail;

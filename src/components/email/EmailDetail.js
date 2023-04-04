import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmailDetailCSS from "./EmailDetail.module.css";
import EmailCSS from "../../pages/email/Email.module.css";
import SideNavbar from "./SideNavbar";
import Header from "./Header";
import SearchBox from "./SearchBox";
import { callSendEmailAPI } from "../../apis/EmailAPICalls";

function EmailDetail() {
  const { mailNo } = useParams();
  console.log("[EmailDetail] received mailNo: " + mailNo);

  const dispatch = useDispatch();

  const email = useSelector((state) => state.emailReducer);

  useEffect(() => {
    console.log("[EmailDetail] useEffect, mailNo: " + mailNo);
    dispatch(callSendEmailAPI({ mailNo }));
  }, [dispatch, mailNo]);

  return (
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
  );
}

export default EmailDetail;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import SideNavbar from "../../components/email/SideNavbar";
import MailList from "../../components/email/MailList";

function SendMail() {
  const location = useLocation();
  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    if (location.state && location.state.category === "send") {
      axios
        .get("mail/send")
        .then((response) => {
          setMailList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location.state]);

  return (
    <div className={EmailCSS.contentWrapper}>
      <div className={EmailCSS.mailBody}>
        <div className={EmailCSS.navBar}>
          <SideNavbar />
        </div>
        <div className={EmailCSS.content}>
          <SearchBox />
          <MailList category="send" emailList={mailList} />
        </div>
      </div>
    </div>
  );
}

export default SendMail;

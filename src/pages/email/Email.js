import React from "react";

import EmailCSS from "./Email.module.css";
import SearchBox from "../../components/email/SearchBox";
import MailList from "../../components/email/MailList";
import SideNavbar from "../../components/email/SideNavbar";

function Email() {
  return (
    <>
      <div className={EmailCSS.contentWrapper}>
        <div className={EmailCSS.mailBody}>
          <div className={EmailCSS.navBar}>
            <SideNavbar />
          </div>
          <div className={EmailCSS.content}>
            <SearchBox />
            <MailList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Email;

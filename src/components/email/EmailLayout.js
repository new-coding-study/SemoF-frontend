// EmailLayout.js
import React from "react";
import Header from "./Header";
import SideNavbar from "./SideNavbar";
import SearchBox from "./SearchBox";
import ActionMenu from "./ActionMenu";
import EmailCSS from "../../pages/email/Email.module.css";

const EmailLayout = ({ children }) => {
  return (
    <div className={EmailCSS.contentWrapper}>
      <div className={EmailCSS.mailBody}>
        <div className={EmailCSS.navBar}>
          <SideNavbar />
        </div>
        <div className={EmailCSS.content}>
          <SearchBox />
          <ActionMenu />
          <Header />
        </div>
      </div>
    </div>
  );
};

export default EmailLayout;

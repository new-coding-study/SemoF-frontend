import React from "react";
import SideNavbarCSS from "./SideNavbar.module.css";

function SideNavbar() {
  return (
    <div className={SideNavbarCSS.sideNavbar}>
      <div className={SideNavbarCSS.title}>
        <img
          src={"/images/mailLogo.png"}
          alt="이미지확인!"
          className={SideNavbarCSS.logo}
        />
        <span>Mail</span>
      </div>
      <button className={SideNavbarCSS.composeButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 96 960 960"
          width="24"
          fill="white"
        >
          <path d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z" />
        </svg>
        <span> 편지쓰기</span>
      </button>
      <ul className={SideNavbarCSS.navList}>
        <li className={SideNavbarCSS.navItem}>
          <i className="fas fa-inbox"></i>
          <span className={SideNavbarCSS.navText}>받은메일함</span>
          <span className={SideNavbarCSS.navCount}>16</span>
        </li>
        <li className={SideNavbarCSS.navItem}>
          <i className="fas fa-star"></i>
          <span className={SideNavbarCSS.navText}>보낸편지함</span>
          <span className={SideNavbarCSS.navCount}>3</span>
        </li>
        <li className={SideNavbarCSS.navItem}>
          <i className="fas fa-trash"></i>
          <span className={SideNavbarCSS.navText}>휴지통</span>
        </li>
      </ul>
    </div>
  );
}

export default SideNavbar;

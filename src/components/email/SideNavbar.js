import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SideNavbarCSS from "./SideNavbar.module.css";
import ComposeModal from "./ComposeModal"; // 모달 컴포넌트 import

function SideNavbar() {
  // 모달 열림 여부를 state로 관리
  const [showModal, setShowModal] = useState(false);

  // 모달을 여는 함수
  const openModal = () => {
    setShowModal(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setShowModal(false);
  };

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
      <button className={SideNavbarCSS.composeButton} onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 96 960 960"
          height="19"
          width="19"
          fill="white"
        >
          <path
            d="M180 876h44l443-443-44-44-443 443v44Zm614-486L666 262l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248 936H120V808l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span> 편지쓰기</span>
      </button>
      <ul className={SideNavbarCSS.navList}>
        <NavLink
          to={{ pathname: "/semof/email", state: { category: "receive" } }}
        >
          <li className={SideNavbarCSS.navItem}>
            <i className="fas fa-inbox"></i>
            <span className={SideNavbarCSS.navText}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 15.6667 1 18.5 1 20C1 21.5 2.5 23 4 23C5.5 23 18.5 23 20 23C21.5 23 23 21.5 23 20C23 18.5 23 12 23 12M1 12H6.5C6.5 12 8 15.5 12 15.5C16 15.5 17.5 12 17.5 12H23M1 12L5 1H19L23 12M1 12V15.5M23 12V15.5"
                  stroke="#2E4454"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>받은메일함</span>
            </span>
            {/* <span className={SideNavbarCSS.navCount}>16</span> */}
          </li>
        </NavLink>
        <NavLink
          to={{ pathname: "/semof/email/send", state: { category: "send" } }}
        >
          <li className={SideNavbarCSS.navItem}>
            <i className="fas fa-star"></i>
            <span className={SideNavbarCSS.navText}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 1L1 13L13 15.5M27 1L17 27L13 15.5M27 1L13 15.5"
                  stroke="#2E4454"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>보낸편지함</span>
            </span>
            {/* <span className={SideNavbarCSS.navCount}>3</span> */}
          </li>
        </NavLink>
        <NavLink to="/semof/email/deleted">
          <li className={SideNavbarCSS.navItem}>
            <i className="fas fa-trash"></i>
            <span className={SideNavbarCSS.navText}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 8C27 9.65685 22.0751 11 16 11C9.92487 11 5 9.65685 5 8M27 8C27 6.34315 22.0751 5 16 5C9.92487 5 5 6.34315 5 8M27 8L24 26C24 26 23 28 16 28C9 28 8 26 8 26L5 8M18.5 16.5L13.5 21.5M13.5 16.5L18.5 21.5"
                  stroke="#2E4454"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>휴지통</span>
            </span>
          </li>
        </NavLink>
      </ul>
      <ComposeModal isOpen={showModal} onClose={closeModal} />
    </div>
  );
}

export default SideNavbar;

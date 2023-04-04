import React, { useState } from "react";
import ActionMenuCSS from "./ActionMenu.module.css";

function ActionMenu(props) {
  const { email, isOpen } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDeleteClick = () => {
    // 이메일 삭제 처리
  };

  const handleSpamClick = () => {
    // 스팸 처리
  };

  return (
    <>
      <div className={ActionMenuCSS.actionMenu}>
        <input
          type="checkbox"
          // checked={isChecked}
          // onChange={handleChange}
          className={ActionMenuCSS.checkBox}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          viewBox="0 96 960 960"
          width="16"
          className={ActionMenuCSS.spin}
        >
          <path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z" />
        </svg>
        <button className={ActionMenuCSS.menuButton} onClick={handleMenuClick}>
          <svg
            className={ActionMenuCSS.menuIcon}
            width="20"
            height="30"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 24C16.5523 24 17 23.5523 17 23C17 22.4477 16.5523 22 16 22C15.4477 22 15 22.4477 15 23C15 23.5523 15.4477 24 16 24Z"
              stroke="#2E4454"
              stroke-width="2"
            />
            <path
              d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
              stroke="#2E4454"
              stroke-width="2"
            />
            <path
              d="M16 10C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8C15.4477 8 15 8.44772 15 9C15 9.55228 15.4477 10 16 10Z"
              stroke="#2E4454"
              stroke-width="2"
            />
          </svg>
        </button>
        {isMenuOpen && (
          <ul className={ActionMenuCSS.menuList}>
            <li className={ActionMenuCSS.menuItem} onClick={handleDeleteClick}>
              Delete
            </li>
            <li className={ActionMenuCSS.menuItem} onClick={handleSpamClick}>
              Report Spam
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ActionMenu;

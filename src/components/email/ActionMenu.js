import React, { useState } from "react";
import ActionMenuCSS from "./ActionMenu.module.css";

function ActionMenu(props) {
  return (
    <>
      <div className={ActionMenuCSS.actionMenu}>
        {/* <input
          type="checkbox"
          // checked={isChecked}
          // onChange={handleChange}
          className={ActionMenuCSS.checkBox}
        /> */}
        <button className={ActionMenuCSS.spinner}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 96 960 960"
            width="16"
            className={ActionMenuCSS.spin}
          >
            <path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z" />
          </svg>
        </button>
        {/* <button className={ActionMenuCSS.menuButton} onClick={handleMenuClick}>
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
        </button> */}
        {/* {isMenuOpen && (
          <ul className={ActionMenuCSS.menuList}>
            <li className={ActionMenuCSS.menuItem} onClick={handleDeleteClick}>
              Delete
            </li>
            <li className={ActionMenuCSS.menuItem} onClick={handleSpamClick}>
              Report Spam
            </li>
          </ul>
        )} */}
      </div>
    </>
  );
}

export default ActionMenu;

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
    <div className={ActionMenuCSS.actionMenu}>
      <button className={ActionMenuCSS.menuButton} onClick={handleMenuClick}>
        •••
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
  );
}

export default ActionMenu;

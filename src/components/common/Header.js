import HeaderCSS from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const onClickLogoHandler = () => {
    // 로고 클릭시 메인 페이지로 이동
    navigate("/semof", { replace: true });
  };

  return (
    <>
      <div className={HeaderCSS.headerWrapper}>
        <div className={HeaderCSS.headerContent}>
          <img
            src={"/images/logo.png"}
            alt="이미지확인!"
            className={HeaderCSS.logo}
            onClick={onClickLogoHandler}
          ></img>
          <div> Emp Name </div>
        </div>
        {/* <div className={HeaderCSS.headerBar}> </div> */}
      </div>
    </>
  );
}

export default Header;

import HeaderCSS from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(location.pathname === "/semo" ? "일치" : "불일치");

  const onClickLogoHandler = () => {
    // 로고 클릭시 메인 페이지로 이동
    navigate("/semof", { replace: true });
  };

  function SearchEmp() {
    return (
      <>
        <div className={HeaderCSS.searchWrapper}>
          <div className={HeaderCSS.searchBox}>
            <input
              // className={HeaderCSS.InputStyle}
              type="text"
              placeholder="검색할 사원의 이름을 입력해주세요"
              // value={search}
              // onKeyUp={onEnterkeyHandler}
              // onChange={onSearchChangeHandler}
            />
          </div>

          <div className={HeaderCSS.searchImg}>
            <img src={"/images/search.png"} alt="이미지확인!"></img>
          </div>
        </div>
      </>
    );
  }

  function InfoEmp() {
    return (
      <>
        <div> myInfo </div>
      </>
    );
  }

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
          <div>
            {location.pathname === "/semof" ? <SearchEmp /> : <InfoEmp />}
          </div>
        </div>
        {/* <div className={HeaderCSS.headerBar}> </div> */}
      </div>
    </>
  );
}

export default Header;

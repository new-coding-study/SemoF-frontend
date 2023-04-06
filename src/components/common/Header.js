import HeaderCSS from "./Header.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const location = useLocation();

  const onClickLogoHandler = () => {
    // 로고 클릭시 메인 페이지로 이동
    navigate("/semof", { replace: true });
  };

  function SearchEmp() {
    return (
      <>
        <div className={HeaderCSS.searchWrapper}>
          <input
            className={HeaderCSS.searchBox}
            type="text"
            placeholder="검색할 사원의 이름을 입력해주세요"
            // value={search}
            // onKeyUp={onEnterkeyHandler}
            // onChange={onSearchChangeHandler}
          />

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
        <div className={HeaderCSS.infoWrapper}>
          <img
            src={"/images/bell.png"}
            alt="이미지확인!"
            // className={HeaderCSS.logo}
            // onClick={onClickLogoHandler}
          ></img>
          <div> 박지희님 </div>
          <button
          // onClick={onClickLoginHandler}
          >
            로그아웃
          </button>
          <div> </div>
        </div>
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

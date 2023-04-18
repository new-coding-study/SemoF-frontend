import HeaderCSS from "./Header.module.css";

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
          <img src={"/images/search_gray.png"} alt="이미지확인!"></img>
        </div>
      </div>
    </>
  );
}

export default SearchEmp;

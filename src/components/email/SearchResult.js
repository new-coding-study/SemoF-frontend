import React, { useState, useEffect } from "react";
import SearchResultCSS from "./SearchResult.module.css";
import MailList from "./MailList";
import SearchBox from "./SearchBox";

function SearchResult() {
  const [selectedMailNo, setSelectedMailNo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  // 검색어 변경 시 렌더링을 위한 useEffect 훅
  useEffect(
    () => {
      setSelectedMailNo(null); // 검색어가 변경될 때마다 선택된 메일 번호를 초기화
    }, // eslint-disable-next-line
    [searchKeyword]
  );

  const handleSearchKeyword = (searchKeyword) => {
    setSearchKeyword(searchKeyword);
  };

  return (
    <div className={SearchResultCSS.searchResult}>
      <div className={SearchResultCSS.title}>
        검색어 <strong>"{searchKeyword}"</strong> 에 대한 검색 결과입니다.
      </div>
      <SearchBox onSearchKeyword={handleSearchKeyword} />
      <MailList
        category={[]}
        setSelectedMailNo={setSelectedMailNo}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedMailNo={selectedMailNo}
        status={null}
        searchKeyword={searchKeyword}
      />
    </div>
  );
}

export default SearchResult;

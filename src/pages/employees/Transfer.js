import TransferCSS from "./Transfer.module.css";

import queryString from "query-string";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Employee from "../../components/employees/Employee";

import {
  callGetEmployeesAPI,
  callSearchEmployeesAPI,
} from "../../apis/EmployeeAPICalls";

function Transfer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.empReducer) || {
    data: [],
    pageInfo: {},
  };
  const employeeList = employees.data;
  const pageInfo = employees.pageInfo;

  // console.log("[Transfer] searchResult", searchResult);
  // console.log("[Transfer] employees", employees);
  // console.log("[Transfer] employee list", employeeList);
  // console.log("[Transfer] page info", pageInfo);

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  // let [searchResult, setSearchResult] = useState({
  //   data: [],
  //   pageInfo: {},
  // });

  let searchResult = employees;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    if (searchCategory && search) {
      dispatch(
        callSearchEmployeesAPI({
          currentPage: currentPage,
          searchCategory: searchCategory,
          search: search,
        })
      );
    } else {
      dispatch(
        callGetEmployeesAPI({
          currentPage: currentPage,
        })
      );
    }
  }, [currentPage, search, searchCategory, dispatch]);

  const onClickTableRow = (empNo) => {
    navigate(`employees/${empNo}`, { replace: false });
  };

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSelectChangeHandler = (e) => {
    setSearchCategory(e.target.value);
  };

  const onSearchButtonClick = () => {
    setCurrentPage(1);
    dispatch(
      callSearchEmployeesAPI({
        currentPage: 1,
        searchCategory: searchCategory,
        search: search,
      })
    );
  };

  const renderEmployees = () => {
    if (
      searchResult &&
      Array.isArray(searchResult) &&
      searchResult.length > 0
    ) {
      return searchResult.map((employee) => (
        <tr
          key={employee.empNo}
          className={TransferCSS.tableBody}
          onClick={() => onClickTableRow(employee.empNo)}
        >
          <td>{employee.empName}</td>
          <td>{employee.branchName}</td>
          <td>{employee.deptName}</td>
          <td>{employee.jobName}</td>
        </tr>
      ));
    } else {
      return employeeList && employeeList.length > 0 ? (
        employeeList.map((employee) => (
          <tr
            key={employee.empNo}
            className={TransferCSS.tableBody}
            onClick={() => onClickTableRow(employee.empNo)}
          >
            <td>{employee.empName}</td>
            <td>{employee.branchName}</td>
            <td>{employee.deptName}</td>
            <td>{employee.jobName}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">데이터가 없습니다.</td>
        </tr>
      );
    }
  };

  return (
    <>
      <div className={TransferCSS.header}>
        <div className={TransferCSS.title}> 사원 이동 </div>
      </div>
      <div className={TransferCSS.searchWrapper}>
        <div>
          <select
            className={TransferCSS.select}
            value={searchCategory}
            onChange={onSelectChangeHandler}
          >
            <option value="">전체</option>
            <option value="empName">이름</option>
            <option value="deptName">부서</option>
            <option value="branchName">지점</option>
          </select>
        </div>
        <input
          className={TransferCSS.searchBox}
          type="text"
          placeholder="검색할 단어를 입력해주세요"
          value={search}
          onChange={onSearchChangeHandler}
        />
        <button
          className={TransferCSS.searchButton}
          onClick={() => setCurrentPage(1)}
        >
          검색하기
        </button>
      </div>
      <div className={TransferCSS.cardBody}>
        <table className="table table-hover table-striped">
          <colgroup>
            <col width="10%" />
            <col width="30%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead className={TransferCSS.tableHead}>
            <tr>
              <th>이름</th>
              <th>지점</th>
              <th>부서</th>
              <th>직급</th>
            </tr>
          </thead>
          <tbody>{renderEmployees()}</tbody>
        </table>
        <div
          className={TransferCSS.pageBox}
          style={{ listStyleType: "none", display: "flex" }}
        >
          {Array.isArray(employeeList) && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={TransferCSS.pagingBtnSide}
            >
              &lt;
            </button>
          )}
          {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                style={
                  currentPage === num
                    ? {
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "2px solid #0d6efd",
                      }
                    : null
                }
                className={TransferCSS.pagingBtn}
              >
                {num}
              </button>
            </li>
          ))}
          {Array.isArray(employeeList) && (
            <button
              className={TransferCSS.pagingBtnSide}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === pageInfo.endPage || pageInfo.total === 0
              }
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Transfer;

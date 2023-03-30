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

  const employees = useSelector((state) => state.empReducer);
  const employeeList = employees?.data;
  const pageInfo = employees?.pageInfo || { endPage: 1 };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const searchResults = useSelector((state) => state.searchEmpReducer);
  const searchList = searchResults?.data;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  const onClickTableRow = (empNo) => {
    navigate(`/employees/${empNo}`, { replace: false });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    // 검색어가 있는 경우에만 API 요청을 보냅니다.
    if (searchTerm !== "" && searchCategory !== "") {
      dispatch(
        callSearchEmployeesAPI({
          search: searchTerm,
          searchCategory: searchCategory,
          currentPage: 1,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      callGetEmployeesAPI({
        currentPage: currentPage,
      })
    );
  }, [currentPage]);

  useEffect(() => {
    // 검색어가 있는 경우에만 API 요청을 보냅니다.
    if (searchTerm !== "" && searchCategory !== "") {
      dispatch(
        callSearchEmployeesAPI({
          search: searchTerm,
          searchCategory: searchCategory,
          currentPage: currentPage,
        })
      );
    }
  }, [searchTerm, searchCategory, currentPage]);

  return (
    <>
      <div className={TransferCSS.header}>
        <div className={TransferCSS.title}> SMART 인사관리 </div>
      </div>
      <div className={TransferCSS.searchWrapper}>
        <div>
          <select
            className={TransferCSS.select}
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={TransferCSS.searchButton} onClick={handleSearch}>
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
          <tbody>
            {Array.isArray(searchList) &&
            searchList.length > 0 &&
            searchCategory !== "" ? (
              searchList.map((employee) => (
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
            ) : // 검색 결과가 없거나 검색어가 없는 경우 employeeList를 출력합니다.
            Array.isArray(employeeList) && employeeList.length > 0 ? (
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
                <td colSpan="5" className={TransferCSS.noData}>
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
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

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

  console.log("[Transfer] employees", employees);

  const employeeList = employees.data;

  console.log("[Transfer] employee list", employeeList);

  const pageInfo = employees.pageInfo;

  console.log("[Transfer] page info", pageInfo);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(
    () => {
      // setStart((currentPage - 1) * 5);
      dispatch(
        callGetEmployeesAPI({
          currentPage: currentPage,
          searchTerm: searchTerm,
          searchCategory: searchCategory,
        })
      );
    }, // eslint-disable-next-line
    [currentPage, searchTerm, searchCategory, dispatch]
  );

  const onClickTableRow = (empNo) => {
    navigate(`employees/${empNo}`, { replace: false });
  };

  return (
    <>
      <div className={TransferCSS.header}>
        <div className={TransferCSS.title}> 발령관리 </div>
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
        <button className={TransferCSS.searchButton}>검색하기</button>
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
            {Array.isArray(employeeList) &&
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
              ))}
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

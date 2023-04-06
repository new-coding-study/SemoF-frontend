import ManagementCSS from "./Management.module.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  callGetEmployeesAPI,
  callSearchEmployeesAPI,
  callUpdateEmpAPI,
  callRetireEmpAPI,
} from "../../apis/EmployeeAPICalls";

function Management() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employees = useSelector((state) => state.empReducer) || {
    data: [],
    pageInfo: {},
  };

  // console.log("[Management] employees : " + JSON.stringify(employees));

  const employeeList = employees.data;

  const searchResult = employees;

  // console.log("[Management] employeeList : " + JSON.stringify(employeeList));

  const pageInfo = employees.pageInfo;

  console.log("[Management] pageInfo : " + JSON.stringify(pageInfo));

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmpNo, setSelectedEmpNo] = useState(null);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [form, setForm] = useState({
    empNo: "",
  });

  const [employeeData, setEmployeeData] = useState({
    employees: [],
    selectedEmp: null,
    selectedBranch: null,
    selectedDept: null,
  });

  const pageNumber = [];
  if (pageInfo) {
    for (let i = 1; i <= pageInfo.endPage; i++) {
      pageNumber.push(i);
    }
  }

  useEffect(() => {
    dispatch(
      callGetEmployeesAPI({
        currentPage: currentPage,
      })
    );
    //eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    if (
      searchResult &&
      Array.isArray(searchResult) &&
      searchResult.length > 0
    ) {
      setDisplayedEmployees(searchResult);
    } else {
      setDisplayedEmployees(employeeList);
    }
  }, [searchResult, employeeList]);

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onSelectChangeHandler = (e) => {
    setSearchCategory(e.target.value);
  };

  const onSearchButtonClick = () => {
    setCurrentPage(1);
    if (searchCategory && search) {
      dispatch(
        callSearchEmployeesAPI({
          currentPage: 1,
          searchCategory: searchCategory,
          search: search,
        })
      );
    } else {
      dispatch(
        callGetEmployeesAPI({
          currentPage: 1,
        })
      );
    }
  };
  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      onSearchButtonClick();
    }
  };

  const onClickTableTr = (empNo) => {
    setShowModal(true);
    setForm((prevState) => ({
      ...prevState,
      empNo: empNo,
    }));

    console.log("[Management] empNo at TableTr : " + empNo);
  };

  console.log("[Management] form : " + JSON.stringify(form));

  const onClickHandler = (empNo) => {
    dispatch(callRetireEmpAPI({ empNo })).then(() => {
      // 퇴사 처리 후, 해당 사원 정보를 다시 불러와서 삭제
      Swal.fire({
        icon: "success",
        text: "퇴사처리가 완료되었습니다.",
      });

      dispatch(callGetEmployeesAPI({ currentPage: currentPage })).then(() => {
        setShowModal(false);
      });
    });
  };

  const onModifyClickHandler = () => {
    console.log("[Management] form : " + JSON.stringify(form));
    // const empNo = form.empNo;
    // console.log("[Management] onModifyClickHandler empNo : " + empNo);
    navigate("/semof/employees/modify", { state: { empNo: form.empNo } });
    setShowModal(false);
  };

  const renderEmployees = () => {
    if (displayedEmployees && displayedEmployees.length > 0) {
      return displayedEmployees.map((employee) => {
        const selected = selectedEmpNo === employee.empNo;
        return (
          <tr
            key={employee.empNo}
            className={ManagementCSS.tableBody}
            onClick={() => onClickTableTr(employee.empNo)}
          >
            <td>{employee.empName}</td>
            <td>{employee.branchName}</td>
            <td>{employee.deptName}</td>
            <td>{employee.jobName}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="4">데이터가 없습니다.</td>
        </tr>
      );
    }
  };
  return (
    <>
      <div className={ManagementCSS.header}>
        <div className={ManagementCSS.title}> 사원관리 </div>
      </div>
      <div className={ManagementCSS.searchWrapper}>
        <div>
          <select
            className={ManagementCSS.select}
            value={searchCategory}
            onChange={onSelectChangeHandler}
          >
            <option value="null">전체</option>
            <option value="empName">이름</option>
            <option value="deptName">부서</option>
            <option value="branchName">지점</option>
          </select>
        </div>
        <input
          className={ManagementCSS.searchBox}
          type="text"
          placeholder="검색할 단어를 입력해주세요"
          value={search}
          onChange={onSearchChangeHandler}
          onKeyDown={onKeyPressHandler}
        />

        <button
          className={ManagementCSS.searchButton}
          onClick={onSearchButtonClick}
        >
          검색하기
        </button>
      </div>
      <div className={ManagementCSS.cardBody}>
        <table className={ManagementCSS.transferTable}>
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead className={ManagementCSS.tableHead}>
            <tr>
              <th>이름</th>
              <th>지점</th>
              <th>부서</th>
              <th>직급</th>
            </tr>
          </thead>
          <tbody>
            {/* {Array.isArray(employeeList) &&
              employeeList.map((employee) => (
                <tr
                  key={employee.noticeNo}
                  className={ManagementCSS.tableBody}
                  onClick={() => onClickTableTr(employee.empNo)}
                >
                  <td>{employee.empName}</td>
                  <td className={ManagementCSS.tableTitle}>
                    {employee.branchName}
                  </td>
                  <td> {employee.deptName} </td>
                  <td> {employee.jobName} </td>
                </tr>
              ))} */}
            {renderEmployees()}
          </tbody>
        </table>
        <div
          className={ManagementCSS.pageBox}
          style={{ listStyleType: "none", display: "flex" }}
        >
          {Array.isArray(employeeList) && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={ManagementCSS.pagingBtnSide}
            >
              &lt;
            </button>
          )}
          {pageNumber.map((num) => (
            <li key={num} onClick={() => setCurrentPage(num)}>
              <button
                className={`${ManagementCSS.pagingBtn} ${
                  currentPage === num ? "active" : ""
                }`}
              >
                {num}
              </button>
            </li>
          ))}
          {Array.isArray(employeeList) && (
            <button
              className={ManagementCSS.pagingBtnSide}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === pageInfo.endPage || pageInfo.total === 0
              }
            >
              &gt;
            </button>
          )}
        </div>
        {showModal && (
          <div className={ManagementCSS.modalContainer}>
            <ul>
              <li>
                {/* <Link
                  to={{
                    pathname: "/semof/employees/modify",
                    state: { empNo: form.empNo },
                  }}
                  onClick={onModifyClickHandler}
                > */}
                {/* <Link to="/semof/employees/modify"> */}
                <span onClick={onModifyClickHandler}>정보수정</span>
                {/* </Link> */}
              </li>
              <li>
                <span onClick={onClickHandler}>퇴사</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Management;

import TransferCSS from "./Transfer.module.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";

import {
  callGetEmployeesAPI,
  callSearchEmployeesAPI,
  callTransferBranchesAPI,
  callTransferDepartmentsAPI,
} from "../../apis/EmployeeAPICalls";

function Transfer() {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.empReducer) || {
    data: [],
    pageInfo: {},
  };
  const employeeList = employees.data;
  const pageInfo = employees.pageInfo;

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [selectedEmpNo, setSelectedEmpNo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [form, setForm] = useState({});

  const [displayedEmployees, setDisplayedEmployees] = useState([]);

  const [employeeData, setEmployeeData] = useState({
    employees: [],
    branches: [
      { code: "1", name: "SEMOF 본사" },
      { code: "2", name: "SEMOF 구로점" },
      { code: "3", name: "SEMOF 도봉점" },
      { code: "4", name: "SEMOF 여의도점" },
      { code: "5", name: "SEMOF 동대문점" },
      { code: "6", name: "SEMOF 상암점" },
    ],
    departments: [
      { code: "NO", name: "없음" },
      { code: "PL", name: "기획" },
      { code: "HR", name: "인사관리" },
      { code: "AC", name: "회계" },
      { code: "SL", name: "영업" },
      { code: "MT", name: "마케팅" },
      { code: "BS", name: "경영지원" },
    ],
    selectedEmp: null,
    selectedBranch: null,
    selectedDept: null,
    oldBranch: null,
    oldDept: null,
  });

  // console.log("employeeData : ", JSON.stringify(employeeData));

  console.log("form: ", JSON.stringify(form));

  const searchResult = employees;

  const pageNumber = [];
  if (pageInfo) {
    for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
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

  const onClickTableRow = (empNo) => {
    const selectedEmployee = displayedEmployees.find(
      (employee) => employee.empNo === empNo
    );

    setEmployeeData((prevState) => ({
      ...prevState,
      oldBranch: selectedEmployee.branchName,
      oldDept: selectedEmployee.deptName,
    }));

    setSelectedEmpNo(empNo);
    setForm({
      ...form,
      empNo: empNo,
    });
    setShowModal(true); // 모달창으로 처리
  };

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

  const renderEmployees = () => {
    if (displayedEmployees && displayedEmployees.length > 0) {
      return displayedEmployees.map((employee) => {
        const selected = selectedEmpNo === employee.empNo;
        return (
          <tr
            key={employee.empNo}
            className={TransferCSS.tableBody}
            onClick={() => onClickTableRow(employee.empNo)}
          >
            <td>{employee.empName}</td>
            <td>{selected ? employeeData.oldBranch : employee.branchName}</td>
            <td>
              {selected && selectedBranch
                ? employeeData.branches.find(
                    (branch) => branch.code === selectedBranch
                  ).name
                : ""}
            </td>
            <td>{selected ? employeeData.oldDept : employee.deptName}</td>
            <td>
              {selected && selectedDept
                ? employeeData.departments.find(
                    (dept) => dept.code === selectedDept
                  ).name
                : ""}
            </td>
            <td>{employee.jobName}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr className={TransferCSS.tableBody}>
          <td colSpan="4">데이터가 없습니다.</td>
        </tr>
      );
    }
  };

  const onModalSubmitHandler = (e) => {
    e.preventDefault();

    if (selectedBranch || selectedDept) {
      const updatedForm = {
        ...form,
        ...(selectedBranch ? { branchCode: selectedBranch } : {}),
        ...(selectedDept ? { deptCode: selectedDept } : {}),
      };

      if (selectedBranch) {
        dispatch(callTransferBranchesAPI({ form: updatedForm })).then(() => {
          dispatch(
            callGetEmployeesAPI({
              currentPage: currentPage,
            })
          );
        });
      }

      if (selectedDept) {
        dispatch(callTransferDepartmentsAPI({ form: updatedForm })).then(() => {
          dispatch(
            callGetEmployeesAPI({
              currentPage: currentPage,
            })
          );
        });
      }
    }

    setShowModal(false);
  };

  const onBranchSelectHandler = (e) => {
    setSelectedBranch(e.target.value);
    setForm({
      ...form,
      branchCode: e.target.value,
    });
  };

  const onDeptSelectHandler = (e) => {
    setSelectedDept(e.target.value);
    setForm({
      ...form,
      deptCode: e.target.value,
    });
  };

  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }
  console.log("decoded ", decoded);

  // 유저 권한 확인 함수
  const CheckRole = () => {
    if (decoded === "ROLE_ADMIN") {
      return true;
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
            <option value="null">전체</option>
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
          onKeyDown={onKeyPressHandler}
        />
        <button
          className={TransferCSS.searchButton}
          // onClick={() => setCurrentPage(1)}
          onClick={onSearchButtonClick}
        >
          검색하기
        </button>
      </div>
      <div className={TransferCSS.cardBody}>
        <table className={TransferCSS.transferTable}>
          <colgroup>
            <col width="10%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead className={TransferCSS.tableHead}>
            <tr>
              <th>이름</th>
              <th>지점</th>
              <th>발령 지점</th>
              <th>부서</th>
              <th>발령 부서</th>
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
                className={`${TransferCSS.pagingBtn} ${
                  currentPage === num ? "active" : ""
                }`}
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
      {CheckRole() === true && showModal && (
        <div className={TransferCSS.modalContainer}>
          <div className={TransferCSS.modal}>
            <div className={TransferCSS.modalHeader}>
              <h3>사원 이동 정보 수정</h3>
              <button
                className={TransferCSS.closeButton}
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <div className={TransferCSS.modalBody}>
              <form onSubmit={onModalSubmitHandler}>
                <div className={TransferCSS.modalForm}>
                  <div className={TransferCSS.modalFormGroup}>
                    <label htmlFor="branchName">지점명</label>
                    <select
                      id="branchName"
                      name="branchName"
                      value={selectedBranch}
                      onChange={onBranchSelectHandler}
                    >
                      <option value="">지점선택</option>
                      <option value="1">SEMOF 본사</option>
                      <option value="2">SEMOF 구로점</option>
                      <option value="3">SEMOF 도봉점</option>
                      <option value="4">SEMOF 여의도점</option>
                      <option value="5">SEMOF 동대문점</option>
                      <option value="6">SEMOF 상암점</option>
                    </select>
                  </div>
                  <div className={TransferCSS.modalFormGroup}>
                    <label htmlFor="deptName">부서명</label>
                    <select
                      id="deptName"
                      name="deptName"
                      value={selectedDept}
                      onChange={onDeptSelectHandler}
                    >
                      <option value="">부서선택</option>
                      <option value="NO">없음</option>
                      <option value="PL">기획</option>
                      <option value="HR">인사관리</option>
                      <option value="AC">회계</option>
                      <option value="SL">영업</option>
                      <option value="MT">마케팅</option>
                      <option value="BS">경영지원</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className={TransferCSS.submitButton}>
                  저장
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Transfer;

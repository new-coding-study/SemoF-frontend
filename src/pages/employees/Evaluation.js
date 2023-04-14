// import Contribution from "../../components/employees/Contribution";
import EvaluationCSS from "./Evaluation.module.css";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import ContributionChart from "../../components/employees/ContributionChart";

import {
  callGetEmployeesAPI,
  callSearchEmployeesAPI,
  callEmpEvaluationAPI,
  callGetEmpContAPI,
  callGetEmpContsAPI,
  callEmpContUpdateAPI,
  callDeleteEmpContAPI,
  callGetEmpChartAPI,
} from "../../apis/EmployeeAPICalls";

function Evaluation() {
  const dispatch = useDispatch();

  const employees = useSelector((state) => state.empReducer) || {
    data: [],
    pageInfo: {},
  };
  const employeeList = employees.data;
  // const pageInfo = employees.pageInfo;
  const contributionList = useSelector(
    (state) => state.empReducer?.contributionList
  );

  console.log(
    "[Evaluation] contributionList : " + JSON.stringify(contributionList)
  );

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // console.log("[Evaluation] year : " + year);

  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const [displayedEmployees, setDisplayedEmployees] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState(null); //검색 결과 중 선택된 사원 정보를 저장하기 위한 state
  const [showEvaluationForm, setShowEvaluationForm] = useState(false); //등급 입력 폼을 보여줄지 여부를 결정하는 state

  const [showSearchModal, setShowSearchModal] = useState(false); // 이전 검색 결과를 표시하는 모달의 상태
  const [prevSearchResult, setPrevSearchResult] = useState([]); // 이전 검색 결과를 저장하는 state

  const [form, setForm] = useState({
    empNo: selectedEmployee?.empNo ?? "",
    evalContNo: selectedEmployee?.evalContNo ?? "",
    categoryNo: "2",
    grade: "",
  });

  console.log("[Evaluation] form: " + JSON.stringify(form));

  const searchResult = employees;

  const [DropDown, setDropDown] = useState(false); //드롭다운의 상태를 관리하는 state
  const [selectedEmpNo, setSelectedEmpNo] = useState(""); // 드롭다운을 표시하려는 사원의 empNo를 저장
  const [changeMod, setChangeMod] = useState(false); // 수정모드의 상태를 관리하는 state

  console.log(
    "[Evaluation] selectedEmployee : " + JSON.stringify(selectedEmployee)
  );

  useEffect(() => {
    dispatch(
      callGetEmployeesAPI({
        currentPage: currentPage,
      })
    );
    //eslint-disable-next-line
  }, [currentPage]);

  useEffect(
    () => {
      dispatch(callGetEmpChartAPI());
    }, // eslint-disable-next-line
    []
  );

  useEffect(() => {
    dispatch(callGetEmpContsAPI({}));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDisplayedEmployees(employeeList);
  }, [employeeList]);

  useEffect(() => {
    setForm({
      ...form,
      empNo: selectedEmployee?.empNo ?? "",
    });
    //eslint-disable-next-line
  }, [selectedEmployee]);

  useEffect(() => {
    dispatch(
      callGetEmpContsAPI({
        empNo: selectedEmployee?.empNo,
      })
    );
    //eslint-disable-next-line
  }, [selectedEmployee]);

  useEffect(() => {
    setDisplayedEmployees(employeeList);
  }, [employeeList]);

  useEffect(() => {
    dispatch(callGetEmpContsAPI({})).then(() => {
      setDisplayedEmployees(employeeList);
    });
    //eslint-disable-next-line
  }, []);
  const openModalHandler = () => {
    setShowModal(true); // 모달창으로 처리
    setSelectedEmployee(null);
    setShowEvaluationForm(false);
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
      e.preventDefault();
      onSearchButtonClick();
    }
  };

  const onModalSubmitHandler = (e) => {
    e.preventDefault();
    setShowModal(false);
    setSelectedEmployee(null);
    setShowEvaluationForm(false);
    setForm({
      ...form,
      empNo: selectedEmployee.empNo,
    });
    setDisplayedEmployees([]);
  };

  const onModalCloseHandler = () => {
    setShowModal(false);
    setSelectedEmployee(null);
    setShowEvaluationForm(false);
    setSearch("");
    setSearchCategory("");
    setDisplayedEmployees([]);
    dispatch(callGetEmployeesAPI({ currentPage: 1 })); // 첫 페이지로 초기화
  };

  const onRadioChangeHandler = (e) => {
    setForm({
      ...form,
      grade: e.target.value,
    });
  };

  // 평가 저장
  const onEvaluationSubmitHandler = () => {
    if (changeMod) {
      // 등급 수정
      dispatch(
        callEmpContUpdateAPI({
          empNo: selectedEmployee.empNo,
          form: {
            evalContNo: selectedEmployee.evalContNo,
            categoryNo: 2,
            grade: form.grade,
          },
        })
      ).then(() => {
        // 수정 후에 contributionList를 다시 가져옴
        dispatch(callGetEmpContsAPI({})).then(() => {
          setShowModal(false);
          setSelectedEmployee(null);
          setShowEvaluationForm(false);
          setForm({
            empNo: "",
            categoryNo: "2",
            grade: "",
          });
          setChangeMod(false); // 수정 모드 해제
        });
      });
    } else {
      // 등급 등록
      dispatch(
        callEmpEvaluationAPI({
          form: {
            empNo: selectedEmployee.empNo,
            evalContNo: form.evalContNo,
            categoryNo: 2,
            grade: form.grade,
          },
        })
      ).then(() => {
        setShowModal(false);
        setSelectedEmployee(null);
        setShowEvaluationForm(false);
        setForm({
          empNo: "",
          categoryNo: "2",
          grade: "",
        });
        dispatch(callGetEmpContsAPI({})); // 등급 등록 API 호출 후에 contributionList를 다시 가져옴
      });
    }
  };

  const onEvaluationMoveHandler = (e) => {
    setShowSearchModal(true);
    setSelectedEmployee(null);
    setShowEvaluationForm(false);
  };

  //드롭다운 메뉴
  const dropDownMenu = (empNo) => {
    setSelectedEmpNo(parseInt(empNo));
    setDropDown((prevState) => !prevState);
  };

  //수정 버튼
  const onModifyHandler = (empNo) => {
    // 해당 사원의 등급 정보를 가져옴
    dispatch(callGetEmpContAPI({ empNo })).then(() => {
      // 등급 수정을 위한 모달 띄우기
      setShowModal(true);
      setShowEvaluationForm(true);
      setSelectedEmployee(contributionList.find((emp) => emp.empNo === empNo));
      setChangeMod(true);
    });
  };

  console.log(
    "[Evaluation] contributionList : " + JSON.stringify(contributionList)
  );

  const onDeleteHandler = (empNo) => {
    dispatch(callDeleteEmpContAPI({ empNo })).then(() => {
      dispatch(callGetEmpContsAPI({})).then(() => {
        // contributionList 업데이트
        setDisplayedEmployees([]);
        dispatch(callGetEmployeesAPI({ currentPage: 1 })); // 첫 페이지로 초기화
      });
    });
  };

  const empChart = (empNo) => {
    // console.log("[empChart] empChart empNo : " + empNo);
    return (
      <div className="EmpChart">
        {selectedEmployee && (
          <ContributionChart data={contributionList} empNo={empNo} />
        )}
      </div>
    );
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
      <div className={EvaluationCSS.header}>
        <div className={EvaluationCSS.title}> 인사평가 </div>
      </div>
      <div className={EvaluationCSS.buttonBox}>
        {CheckRole() === true && (
          <button
            onClick={openModalHandler}
            className={EvaluationCSS.evalButton}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 96 960 960"
              fill="white"
              width="48"
            >
              <path d="M220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h340l240 240v156h-60V456H520V236H220v680h300v60H220Zm0-60V236v680Zm536-223 28 28-164 164v51h51l164-164 28 28-176 176H580V869l176-176Zm107 107L756 693l61-61q9-9 21-9t21 9l65 65q9 9 9 21t-9 21l-61 61Z" />
            </svg>
            <span>인사평가 추가</span>
          </button>
        )}
      </div>

      <div className={EvaluationCSS.cardBody}>
        <div className={EvaluationCSS.cardTitle}>
          <span>
            {year}년 {month}월 정기 인사평가
          </span>
          <div className={EvaluationCSS.bar}></div>
          <span>실적</span>
          <div className={EvaluationCSS.evalCard}>
            {Array.isArray(contributionList) &&
              contributionList.map((contribution) => (
                <div
                  className={EvaluationCSS.cardContainer}
                  key={contribution.empNo}
                >
                  <div className={EvaluationCSS.row}>
                    <span className={EvaluationCSS.date}>
                      {year}년 {month}월
                    </span>
                    <div className={EvaluationCSS.vertical} />
                    <span className={EvaluationCSS.evalName}>
                      {contribution.empName}
                    </span>
                    <div className={EvaluationCSS.vertical} />
                    <span>실적</span>

                    <button onClick={() => dropDownMenu(contribution.empNo)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="25"
                      >
                        <path d="M479.858 896Q460 896 446 881.858q-14-14.141-14-34Q432 828 446.142 814q14.141-14 34-14Q500 800 514 814.142q14 14.141 14 34Q528 868 513.858 882q-14.141 14-34 14Zm0-272Q460 624 446 609.858q-14-14.141-14-34Q432 556 446.142 542q14.141-14 34-14Q500 528 514 542.142q14 14.141 14 34Q528 596 513.858 610q-14.141 14-34 14Zm0-272Q460 352 446 337.858q-14-14.141-14-34Q432 284 446.142 270q14.141-14 34-14Q500 256 514 270.142q14 14.141 14 34Q528 324 513.858 338q-14.141 14-34 14Z" />
                      </svg>
                    </button>
                    {DropDown && selectedEmpNo === contribution.empNo && (
                      <div className={EvaluationCSS.dropdownMenu}>
                        <ul>
                          <li
                            onClick={() => onModifyHandler(contribution.empNo)}
                          >
                            수정
                          </li>
                          <li
                            onClick={() => onDeleteHandler(contribution.empNo)}
                          >
                            삭제
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className={EvaluationCSS.row}>
                    <span className={EvaluationCSS.evalGrade}>
                      <img src={"/images/balance.png"} alt="등급!" />
                      {contribution.grade}등급
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className={EvaluationCSS.modalContainer}>
          <div className={EvaluationCSS.modal}>
            <div className={EvaluationCSS.modalHeader}>
              <h3>정기 인사 평가</h3>
              <button
                className={EvaluationCSS.closeButton}
                // onClick={() => setShowModal(false)}
                onClick={onModalCloseHandler}
              >
                X
              </button>
            </div>
            <div className={EvaluationCSS.modalBody}>
              {!selectedEmployee && !showEvaluationForm ? (
                <form onSubmit={onModalSubmitHandler}>
                  <div className={EvaluationCSS.modalForm}>
                    <div className={EvaluationCSS.searchWrapper}>
                      <div>
                        <select
                          className={EvaluationCSS.select}
                          value={searchCategory}
                          onChange={onSelectChangeHandler}
                        >
                          <option value="">선택</option>
                          <option value="empName">이름</option>
                          <option value="deptName">부서</option>
                          {/* <option value="branchName">지점</option> */}
                        </select>
                      </div>
                      <input
                        className={EvaluationCSS.searchBox}
                        type="text"
                        placeholder="검색할 단어를 입력해주세요"
                        value={search}
                        onChange={onSearchChangeHandler}
                        onKeyDown={onKeyPressHandler}
                      />
                      <button
                        type="button"
                        className={EvaluationCSS.searchButton}
                        onClick={onSearchButtonClick}
                      >
                        검색하기
                      </button>
                    </div>

                    <div className={EvaluationCSS.modalFormGroup}>
                      {!selectedEmployee ? (
                        <table className={EvaluationCSS.modalTable}>
                          <thead>
                            <tr>
                              <th>이름</th>
                              <th>지점</th>
                              <th>부서</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResult && searchResult.length > 0
                              ? searchResult.map((employee) => (
                                  <tr
                                    key={employee.empNo}
                                    onClick={() => {
                                      setSelectedEmployee(employee);
                                      setShowEvaluationForm(true);
                                    }}
                                  >
                                    <td>{employee.empName}</td>
                                    <td>{employee.branchName}</td>
                                    <td>{employee.deptName}</td>
                                  </tr>
                                ))
                              : searchResult.length === 0 && (
                                  <tr>
                                    <td colSpan={3}>검색 결과가 없습니다.</td>
                                  </tr>
                                )}
                          </tbody>
                        </table>
                      ) : null}
                    </div>
                  </div>
                </form>
              ) : null}
              <div className={EvaluationCSS.newModal}>
                {showEvaluationForm && (
                  <>
                    <div className={EvaluationCSS.newModalHeader}>
                      <span className={EvaluationCSS.category}>실적</span>
                      <span className={EvaluationCSS.branchName}>
                        {selectedEmployee
                          ? selectedEmployee.branchName
                          : "지점 이름"}
                      </span>
                      <span className={EvaluationCSS.deptName}>
                        {selectedEmployee &&
                        selectedEmployee.deptName !== "없음"
                          ? selectedEmployee.deptName
                          : ""}
                        {/* {selectedEmployee
                          ? selectedEmployee.deptName
                          : "부서 이름"} */}
                      </span>
                      <span className={EvaluationCSS.empName}>
                        {selectedEmployee
                          ? selectedEmployee.empName
                          : "사원 이름"}
                      </span>
                    </div>
                    <div className={EvaluationCSS.underLine} />
                    <form>
                      <input type="hidden" name="categoryNo" value="2" />
                    </form>
                    <div className={EvaluationCSS.newModalFormGroup}>
                      {/* 도넛 그래프 */}
                      <div className={EvaluationCSS.chartWrapper}>
                        {/* <h3>실적 비율</h3> */}
                        <div className={EvaluationCSS.chart}>
                          {empChart(selectedEmployee.empNo)}
                        </div>
                      </div>

                      {/* 등급표 이미지 */}
                      <div className={EvaluationCSS.gradeWrapper}>
                        <img
                          src={"/images/ContributionGrade.png"}
                          alt="등급표"
                        />
                      </div>

                      {/* 등급 선택 박스 */}

                      <div className={EvaluationCSS.radioWrapper}>
                        <div className={EvaluationCSS.radioBox}>
                          <input
                            type="radio"
                            id="gradeA"
                            name="grade"
                            value="A"
                            className={EvaluationCSS.newRadio}
                            onChange={onRadioChangeHandler}
                          />
                          <label htmlFor="gradeA">A 등급</label>
                        </div>
                        <div className={EvaluationCSS.radioBox}>
                          <input
                            type="radio"
                            id="gradeB"
                            name="grade"
                            value="B"
                            className={EvaluationCSS.newRadio}
                            onChange={onRadioChangeHandler}
                          />
                          <label htmlFor="gradeB">B 등급</label>
                        </div>
                        <div className={EvaluationCSS.radioBox}>
                          <input
                            type="radio"
                            id="gradeC"
                            name="grade"
                            value="C"
                            className={EvaluationCSS.newRadio}
                            onChange={onRadioChangeHandler}
                          />
                          <label htmlFor="gradeC">C 등급</label>
                        </div>
                        <div className={EvaluationCSS.radioBox}>
                          <input
                            type="radio"
                            id="gradeF"
                            name="grade"
                            value="F"
                            className={EvaluationCSS.newRadio}
                            onChange={onRadioChangeHandler}
                          />
                          <label htmlFor="gradeF">F 등급</label>
                        </div>
                      </div>
                      {/* 등급 저장 버튼 */}
                      <div className={EvaluationCSS.btnBox}>
                        <button
                          type="submit"
                          className={EvaluationCSS.submitButton}
                          onClick={onEvaluationSubmitHandler}
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          className={EvaluationCSS.submitButton}
                          onClick={onEvaluationMoveHandler}
                        >
                          이전으로
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Evaluation;

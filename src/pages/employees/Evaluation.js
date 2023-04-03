import Contribution from "../../components/employees/Contribution";
import EvaluationCSS from "./Evaluation.module.css";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  callGetEmployeesAPI,
  callSearchEmployeesAPI,
  callEmpEvaluationAPI,
  callGetEmpContAPI,
  callGetEmpContsAPI,
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
    (state) => state.empReducer.contributionList
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

  const [form, setForm] = useState({
    empNo: selectedEmployee?.empNo ?? "",
    categoryNo: "2",
    grade: "",
  });

  console.log("[Evaluation] form: " + JSON.stringify(form));

  const searchResult = employees;

  useEffect(() => {
    dispatch(
      callGetEmployeesAPI({
        currentPage: currentPage,
      })
    );
    //eslint-disable-next-line
  }, [currentPage]);

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

  const openModalHandler = () => {
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
  };

  const onRadioChangeHandler = (e) => {
    setForm({
      ...form,
      grade: e.target.value,
    });
  };

  console.log(
    "[Evaluation] selectedEmployee: " + JSON.stringify(selectedEmployee)
  );

  const onEvaluationSubmitHandler = () => {
    dispatch(
      callEmpEvaluationAPI({
        form: {
          empNo: selectedEmployee.empNo,
          categoryNo: "2",
          grade: form.grade,
        },
      })
    );
    setForm({
      ...form,
      empNo: selectedEmployee.empNo,
    });
    window.location.reload(); //화면 초기화
  };

  return (
    <>
      <div className={EvaluationCSS.header}>
        <div className={EvaluationCSS.title}> 인사평가 </div>
      </div>
      <div className={EvaluationCSS.buttonBox}>
        <button onClick={openModalHandler} className={EvaluationCSS.evalButton}>
          {/* <img
            src={"/images/evaluation.svg"}
            alt="이미지확인!"
            className={EvaluationCSS.logo}
          /> */}
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
                  <span>
                    {year}년 {month}월{" "}
                  </span>
                  <div className={EvaluationCSS.vertical} />
                  <span className={EvaluationCSS.evalName}>
                    {contribution.empName}
                  </span>
                  <div className={EvaluationCSS.vertical} />
                  <span>실적</span>
                  <span className={EvaluationCSS.evalGrade}>
                    {contribution.grade}
                  </span>
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
                onClick={() => setShowModal(false)}
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
                          <option value="branchName">지점</option>
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
                            {searchResult.length > 0 ? (
                              searchResult.map((employee) => (
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
                            ) : (
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
                        <h3>실적 비율</h3>
                        <div className={EvaluationCSS.chart}></div>
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
                          // onClick={onEvaluationSubmitHandler}
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

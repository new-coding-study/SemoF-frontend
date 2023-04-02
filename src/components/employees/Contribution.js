import React from "react";
import { useSelector } from "react-redux";
import ContributionCSS from "./Contribution.module.css";

function Contribution() {
  const contributionList = useSelector(
    (state) => state.empReducer.contributionList
  );

  const onClickEvaluationHandler = (empNo) => {
    // Evaluation을 클릭한 사원의 정보를 이용해서 사원 정보 페이지로 이동
  };

  return (
    <div className={ContributionCSS.evaluationDiv}>
      <h2>사원 기여도 평가</h2>
      <div className={ContributionCSS.employeeList}>
        {Array.isArray(contributionList) &&
          contributionList.map((contribution) => (
            <div
              key={contribution.empNo}
              className={ContributionCSS.employeeDiv}
              onClick={() => onClickEvaluationHandler(contribution.empNo)}
            >
              <h3>{contribution.empName}</h3>
              <div className={ContributionCSS.evaluationInfo}>
                <p>{contribution.grade}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Contribution;

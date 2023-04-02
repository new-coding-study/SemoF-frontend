import React, { useState } from "react";
import EvaluationCSS from "./Evaluation.module.css";

function Evaluation() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  return (
    <>
      <div className={EvaluationCSS.header}>
        <div className={EvaluationCSS.title}> 인사평가 </div>
      </div>
      <div className={EvaluationCSS.buttonBox}>
        <button>
          <img
            src={"/images/checklist.png"}
            alt="이미지확인!"
            className={EvaluationCSS.logo}
          />
          <span>인사평가 추가</span>
        </button>
      </div>

      <div className={EvaluationCSS.cardBody}>
        <div className={EvaluationCSS.cardTitle}>
          <span>2023 {month}월 정기 인사평가</span>
          <div className={EvaluationCSS.bar}></div>
          <span>실적</span>
        </div>
      </div>
    </>
  );
}

export default Evaluation;

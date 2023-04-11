import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callGetEmpChartAPI } from "../../apis/EmployeeAPICalls";
import { Chart, PieController } from "chart.js";
import ContributionCSS from "./Contribution.module.css";

Chart.register(PieController);

const ContributionChart = ({ data, empNo }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const dispatch = useDispatch();

  const empChart = useSelector((state) => state.empReducer.empChart);

  useEffect(() => {
    dispatch(callGetEmpChartAPI(empNo));
  }, [empNo, dispatch]);

  useEffect(() => {
    if (chartRef.current && empChart) {
      console.log("[ContributionChart] empChart : " + JSON.stringify(empChart));
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");

      const projAverageContribution = empChart[0]?.projAverageContribution ?? 0;
      const remainingContribution = 100 - projAverageContribution;

      const projAContribution = empChart[0]?.projAContribution ?? 0;
      const projBContribution = empChart[0]?.projBContribution ?? 0;
      const projCContribution = empChart[0]?.projCContribution ?? 0;
      const projAContributionPercentage = (projAContribution / 3).toFixed(1);
      const projBContributionPercentage = (projBContribution / 3).toFixed(1);
      const projCContributionPercentage = (projCContribution / 3).toFixed(1);

      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["전체 프로젝트 기여도"],
          datasets: [
            {
              data: [projAverageContribution, remainingContribution],
              backgroundColor: ["#e52e2e", "transparent"],
              hoverBackgroundColor: ["#e52e2e", "transparent"],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: `프로젝트 A: ${projAContributionPercentage}%,
              프로젝트 B: ${projBContributionPercentage}%, 
              프로젝트 C: ${projCContributionPercentage}%)`,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  if (label === "전체 프로젝트 기여도") {
                    return `${label}: ${value}%`;
                  } else {
                    return `${value}%`;
                  }
                },
              },
            },
          },
        },
      });
    }
  }, [empChart]);

  return (
    <div className={ContributionCSS.wrapper}>
      <div className={ContributionCSS.chart}>
        <canvas
          ref={chartRef}
          className={ContributionCSS.canvas}
          style={{
            width: "250px",
            height: "250px",
            display: "block",
            boxSizing: "border-box",
          }}
        ></canvas>
      </div>
    </div>
  );
};

export default ContributionChart;

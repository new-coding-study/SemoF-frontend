// import ProductCSS from './Product.module.css';
import { useNavigate } from "react-router-dom";

function Employee({
  product: { empNo, empName, branchName, deptName, jobName },
}) {
  const navigate = useNavigate();

  const onClickEmployeeHandler = (empNo) => {
    navigate(`/present/${empNo}`, { replace: false });
  };

  return (
    <div onClick={() => onClickEmployeeHandler(empNo)}>
      <h5>{empName}</h5>
      <h5>{branchName}</h5>
      <h5>{deptName}</h5>
      <h5>{jobName}</h5>
    </div>
  );
}

export default Employee;

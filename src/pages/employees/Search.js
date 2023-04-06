import TransferCSS from "./Transfer.module.css";

import queryString from "query-string";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Employee from "../../components/employees/Employee";

import { callSearchEmployeesAPI } from "../../apis/EmployeeAPICalls";

function Search() {
  const { search } = useLocation();
  const { value } = queryString.parse(search);

  const employees = useSelector((state) => state.empReducer);

  const employeeList = employees.data;

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(
        callSearchEmployeesAPI({
          search: value,
        })
      );
    }, // eslint-disable-next-line
    []
  );

  return (
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
            <tr key={employee.empNo} className={TransferCSS.tableBody}>
              <td>{employee.empName}</td>
              <td>{employee.branchName}</td>
              <td>{employee.deptName}</td>
              <td>{employee.jobName}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Search;

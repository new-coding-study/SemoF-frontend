import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetBranchesAPI, callGetDeptAPI, callGetJobNEmpNameAPI } from '../../apis/ApprovalAPICalls';

function RegistLine(){

    const nav=useNavigate();

    // select 태그를 추가하기 위한
    const [selects, setSelects] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2);
    
    const dispatch = useDispatch();
    const empInfo = useSelector(state => state.approvalReducer.empInfo);
    const dept = useSelector(state => state.approvalReducer.dept);
    const branch = useSelector(state => state.approvalReducer.branch);
    
    // orderDTO List를 위한 ,,
    const [orders, setOrders] = useState([]);

    // 지점코드저장 이거를 ,, formData로 어디에 넘겨줌 근데 db 수정해야할듯
    const [selectBranch, setSelectBranch] = useState('');
    const [selectDept, setSelectDept] = useState('');

    const [isShow, setIsShow] = useState(false);

    console.log('직원',empInfo);
    console.log(dept);

    useEffect(
    () => {
        dispatch(callGetBranchesAPI());  
        dispatch(callGetDeptAPI());
        dispatch(callGetJobNEmpNameAPI());
      console.log(branch);
      console.log(dept);
    } // eslint-disable-next-line
    ,[]
    );
   

    const selectBranchHandler=(e)=>{
      console.log(e.target.value[0]);
      
      setSelectBranch(e.target.value);
    }
    const selectDeptHandler=(e)=>{
      setSelectDept(e.target.value);
      console.log(e.target.value);
      setIsShow(true);
    }
    
    const handleAddSelect = () => {
    const newSelects = [...selects, { id: nextId, value: '' }];
    setSelects(newSelects);
    setNextId(nextId + 1);
  };
  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  }
  const handleSelectChange = (event, id) => {
    const newSelects = [...selects];
    const index = newSelects.findIndex((select) => select.id === id);
    newSelects[index].value = event.target.value;
    setSelects(newSelects);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 값 저장하기... useState
    console.log(selects);
  };
    return(
        <>
            <div 
            // className={ApprovalCSS.title}
            >
            결재 라인 추가
            </div>
            <div>
            <span>결재라인 : </span>
              <select name="branch" 
              onChange={selectBranchHandler}
                >
              <option value="none" disabled default>지점선택</option>
              {branch.map(b => (
                <option key={b.branchCode} value={b.branchCode} name="branchCode">{b.branchName}</option>
              ))}
              </select>
              <select name="dept" 
              onChange={selectDeptHandler}
              >
              <option value="none" disabled>부서선택</option>
              {dept.map(b => (
                <option key={b.deptCode} value={b.deptCode} name="deptCode">{b.deptName}</option>
              ))}
              </select>
            </div>
      
            
            {isShow && (
              <div>
          <div>
          {selects.map((select) => (
            <div key={select.id}>
              <label htmlFor={`select-${select.id}`}>{select.id}번:</label>
            <select
              id={`select-${select.id}`}
              value={select.value}
              onChange={(event) => handleSelectChange(event, select.id)}
              >
              <option value="">직급, 사원 선택</option>
              {empInfo.map((b) => (
                <option key={b.empNo} value={b.empNo} name="empNo">
                  {b.jobName}, {b.empName}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={handleAddSelect}>
         +
       </button>
      <button type="submit">등록하기</button>
      </div>
      </div>
      )}

            
            
        <button type="button" onClick={()=>{nav(-1)}}>취소하기</button>
        </>
    )
}
export default RegistLine;

import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetBranchesAPI, callGetDeptAPI, callGetJobNEmpNameAPI, callLineRegistAPI, callOrderRegistAPI } from '../../apis/ApprovalAPICalls';

function RegistLine(){

    const nav=useNavigate();

    // select 태그를 추가하기 위한
    const [selects, setSelects] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2);
    const [line, setLine] = useState({
      lineName:''
      ,branchCode:0
      ,approvOrderDTOList:[
        // 여기에 객체를 동적으로 할당하기만 하면 많은 문제가 해결될듯
      ]
    })
    const dispatch = useDispatch();
    const empInfo = useSelector(state => state.approvalReducer.empInfo);
    const dept = useSelector(state => state.approvalReducer.dept);
    const branch = useSelector(state => state.approvalReducer.branch);
    
    // orderDTO List를 위한 ,, 
    // const [orders, setOrders] = useState([]);

    // 지점코드저장 이거를 ,, formData로 어디에 넘겨줌 근데 db 수정해야할듯
    const [selectBranch, setSelectBranch] = useState('');
    const [selectDept, setSelectDept] = useState('');
    const [selectBName, setSelectBName] = useState('');

    // 순서 입력 할 select를 띄울
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
   
    // 지점을 입력하면 그 값을 setting 다른 데서는 이걸 바로 line
    // 에 담는지 아닌지 한번 봐야겠다.\
    // 따로 담아야할듯 list와 나머지를 ,,, 
    const selectBranchHandler=(e)=>{
      
      console.log(e.target.value[0]);
      
      setSelectBranch(e.target.value);
      const selectedOption = e.target.options[e.target.selectedIndex];
      setSelectBName= selectedOption.getAttribute('data-name');
      console.log('branchName', selectBName);
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
 
  const handleSelectChange = (event, id) => {
    const newSelects = [...selects];
    const index = newSelects.findIndex((select) => select.id === id);
    newSelects[index].value = event.target.value;
     setSelects(newSelects);
    
     console.log('이게뭘까여',selects);
  };


  useEffect(() => {
    setLine(prevState => ({
      ...prevState,
      lineName: selectBName + " " + selectDept,
      branchCode: selectBranch,
      approvOrderDTOList: selects.map(select => ({ empNo: parseInt(select.value) }))
    }));
  }, [selectBName, selectBranch, selectDept, selects]);

  const handleSubmit = (event) => {
    event.preventDefault();
    JSON.stringify(line.approvOrderDTOList);
    
    console.log("젭알", line);
    dispatch(callLineRegistAPI({	
      
      form: line
  }));   
    
    nav(`/semof/lines`);
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
            <select name="branch" onChange={selectBranchHandler} defaultValue="default">
            <option value="default" disabled>지점선택</option>
            {branch.map((b, idx) => (
              <option key={idx} value={b.branchCode} data-name={b.branchName}>
              {b.branchName}
            </option>
            ))}
            </select>
            <select name="dept" 
              onChange={selectDeptHandler}
              defaultValue="default"
              >
              <option value="default" disabled>부서선택</option>
              {dept.map(b => (
                <option key={b.deptCode} value={b.deptName} name="deptCode">{b.deptName}</option>
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
      <button type="submit" onClick={handleSubmit}>등록하기</button>
      </div>
      </div>
      )}

            
            
        <button type="button" onClick={()=>{nav(-1)}}>취소하기</button>
        </>
    )
}
export default RegistLine;

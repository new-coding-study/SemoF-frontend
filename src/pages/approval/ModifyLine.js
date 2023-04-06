import { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetBranchesAPI, callGetDeptAPI, callGetJobNEmpNameAPI, callLineModifyAPI, callLineDetailAPI } from '../../apis/ApprovalAPICalls';

function ModifyLine(){

    const nav=useNavigate();
// 상세 조회를 만들어야 정보를 가져와서 수정을 할 수 있을 듯 근데지금 정보조회에 문제가 잇으니
    // select 태그를 추가하기 위한
    const [selects, setSelects] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2);
    const [line, setLine] = useState({
      lineName:''
      , branchCode:0
      , approvOrderDTOList:[
        // 여기에 객체를 동적으로 할당하기만 하면 많은 문제가 해결될듯
      ]
    })
    const params = useParams();
    const dispatch = useDispatch();
    const empInfo = useSelector(state => state.approvalReducer.empInfo);
    const dept = useSelector(state => state.approvalReducer.dept);
    const branch = useSelector(state => state.approvalReducer.branch);
    const lineInfo = useSelector(state => state.approvalReducer.line);
    
    // orderDTO List를 위한 ,, 
    // const [orders, setOrders] = useState([]);

    //  useState hook을 사용하여 selectBranch와 selectDept 변수를 선언합니다. 이 변수들은 각각 branch와 dept select 요소의 value 값을 저장합니다.
    const [selectBranch, setSelectBranch] = useState(lineInfo.branchName);
    const [selectDept, setSelectDept] = useState(lineInfo.deptName);

    // 순서 입력 할 select를 띄울
    const [isShow, setIsShow] = useState(false);

    console.log('직원',empInfo);
    console.log(dept);

    useEffect(
    () => {
        dispatch(callGetBranchesAPI());  
        dispatch(callGetDeptAPI());
        dispatch(callGetJobNEmpNameAPI());
        dispatch(callLineDetailAPI({
          lineNo: params.lineNo
        }))
      console.log(branch);
      console.log(dept);
      console.log('저는 이게 찍히는지가 중요합니다',lineInfo);

    } // eslint-disable-next-line
    ,[]
    );
   
    // 지점을 입력하면 그 값을 setting 다른 데서는 이걸 바로 line
    // 에 담는지 아닌지 한번 봐야겠다.\
    // 따로 담아야할듯 list와 나머지를 ,,, 
    const selectBranchHandler=(e)=>{
      
      console.log(e.target.value[0]);
      
      setSelectBranch(e.target.value);
    }
    // const selectBranchHandler = (event) => {
    //   const branchCode = event.target.value;
    //   const branchName = event.target.options[event.target.selectedIndex].dataset.name;
    //   // ...
    // }
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
    setSelectBranch(branch[0]?.branchCode || null);
  }, [branch]);

  useEffect(() => {
    setLine(prevState => ({
      ...prevState,
      lineName: selectBranch + " " + selectDept,
      branchCode: selectBranch,
      approvOrderDTOList: selects.map(select => ({ empNo: parseInt(select.value) }))
    }));
  }, [selectBranch, selectDept, selects]);

  const handleSubmit = (event) => {
    event.preventDefault();

    
    console.log("젭알", line);
    dispatch(callLineModifyAPI({	
      
      form: line
  }));   
    const modifyHandler = ()=>{
      // 혹시 이걸 detail을 따로 안만들고 들고 올 방법이 있을 까?
    }
    
  };
    return(
        <>
            <div 
            // className={ApprovalCSS.title}
            >
            결재 라인 수정
            </div>
            <div>
            <span>결재라인 : </span>
            <select name="branch" 
  onChange={selectBranchHandler}
  defaultValue={lineInfo.branchName}
  value={selectBranch}>
  {/* <option value="default" disabled>지점선택</option> */}
  {branch.map((b, idx) => (
    <option key={idx} value={b.branchCode} data-name={b.branchName}>
      {b.branchName}
    </option>
  ))}
</select>

<select name="dept" 
  onChange={selectDeptHandler}
  defaultValue={lineInfo.deptName}
  value={selectDept}>
  {/* <option value="none" disabled>부서선택</option> */}
  {dept.map(b => (
    <option key={b.deptCode} value={b.deptName} name="deptCode">
      {b.deptName}
    </option>
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
       <button 
      // onClick={modifyHandler}
      >수정하기</button>
      <button type="submit" onClick={handleSubmit}>저장</button>
      <button 
      onClick={()=>{
        nav(-1)
      }}
      >취소</button>
      </div>
      </div>
      )}

            
            
        <button type="button" onClick={()=>{nav(-1)}}>취소하기</button>
        </>
    )
}
export default ModifyLine;

import RegistCSS from './RegistApproval.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI} from "../../apis/ApprovalAPICalls"
import { useNavigate } from 'react-router-dom';
import { callLinesAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import Swal from "sweetalert2";

function RegistApproval() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    const lineInfo = useSelector(state => state.approvalReducer.lines);
  
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [line, setLine] = useState(0);
    const [form, setForm] = useState([]);
    const [contents, setContents] = useState([]);
    const [isSelect, setIsSelect] = useState(false);
    const [isCategorySelect, setIsCategorySelect] = useState(false);
    const [selectForm, setSelectForm] = useState('');
    const [filePath, setFilePath] = useState();
    const fileInput = useRef();
    const formData = new FormData(); // FormData 객체 생성
    const isLogin = window.localStorage.getItem('accessToken');
    console.log('로그인? ',isLogin);
    let decoded = null;
    let tokenEmpNo = null;
    if(isLogin !== undefined && isLogin !== null) {
        const temp = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = temp.auth[0];
        tokenEmpNo = temp.empNo;
        console.log('??', temp.empNo)
    }
console.log(tokenEmpNo);
    console.log('decoded', decoded);
    const [approval, setApproval] = useState({

        approvTitle:''
        , lineNo: 0
        , empNo: ''
        , approvContentDTOList : [
            
        ]
      
    })

    useEffect(
        () => {
            dispatch(callGetFormTitleAPI());  
            dispatch(callLinesAPI());
            
            console.log(formInfo);
            console.log('이걸 받아오는지 확인', lineInfo);

        } // eslint-disable-next-line
        ,[]
    );



    const selectHandler = (e)=>{

        setIsSelect(true);
        setSelectForm(e.target.value);
        console.log(isSelect);
        console.log(e.target.value);
        setIsCategorySelect(true);

        
    }
    const onChangeFileUpload= (e) =>{

        const fileList = e.target.files; // 선택한 파일 리스트
  

  // 파일 정보 추가
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    formData.append('fileList', file, file.name); // 파일 이름 추가
    console.log(formData.get('fileList'));
  }

    }
    const selectLine = (e) =>{
        console.log('lineNo event', e.target.value)
        setLine(e.target.value);
        console.log('lineNo', line);
      };
    const onClickfilesUpload = () => {
        fileInput.current.click();
    }
    const onChangeHandler = (e) => {
        setTitle(e.target.value);
    };
    const contentChange = (e, index) => {
        console.log('여기까지 왔는지',selectForm)
        const { value } = e.target;
        setContents(prevContents => {
          const updatedContents = [...prevContents];
          updatedContents[index] = { content: value, formCode: selectForm };
          console.log('이거 뭘로 나와', updatedContents);
          return updatedContents;
          
        });
      }

      useEffect(() => {
        setApproval(prevState => ({
          ...prevState,
          approvTitle: title,
          lineNo : line,
          empNo : tokenEmpNo,
          approvContentDTOList: contents.map(({ content, formCode }) => ({ content, formCode })),

        }));
      }, [title, line, contents]);
    console.log(approval);
    const onClickApprovRegistrationHandler = () => {

        console.log('[RegistApproval] onClickApprovRegistrationHandler');


        formData.append("approval",JSON.stringify(approval));

        console.log("approval", formData.get("approval"))

        if(files){
            console.log('파일비어있니?')
        
        }
 
        console.log("fileList", formData.get("fileList"))

        dispatch(callApprovRegistAPI({	
            
            form : formData
   
          
        }));      
        Swal.fire('결재 등록.','목록으로 돌아갑니다','success')
        nav(`/semof/inbox`, {replace : true})
        window.location.reload();
    }
        
        
    return(
        <>
        <div className={RegistCSS.writeArea}>
            <div 
            className={RegistCSS.title}
            >
                결재 상신
            </div>
            <div className={RegistCSS.categorytitle}>
                <label>카테고리 : </label>
               
                <select onChange={selectHandler} defaultValue="default">
          
                    <option value="default" disabled>유형선택</option> 
                    <option value="A" name="formCode">지출결의서</option>
                    <option value="B" name="formCode">지출계획서</option>
                    <option value="C" name="formCode">경조금지급신청서</option>
                    <option value="D" name="formCode">연차</option>
                    <option value="E" name="formCode">연장근무</option>
                    <option value="F" name="formCode">출장</option>
                    <option value="G" name="formCode">반차</option>
                    <option value="H" name="formCode">구매요청서</option> 
                </select>

            </div>
            <br/>
            <div className={RegistCSS.inputTitle}>
                <label style={{marginLeft:'3.5%'}}>제목 : </label>
                <input 
                // className={nameInput} 
                onChange={onChangeHandler} placeholder="제목 입력" name='approvTitle'></input>
                
            </div>
            <br/>
            <div>
                <label style={{marginRight:'18.5%'}}>신청서 작성 : </label>
                <div>
                <br/>

            {isSelect &&  (
                    <div className={RegistCSS.formContent}>
                  
                        {formInfo
  .filter((t) => t.formCode === selectForm)
  .map((t, index) => (
    <div className={RegistCSS.formArea} key={t.formCode}>
      <span style={{fontSize:'20px', float:'left', marginLeft:'10%'}}>{t.formTitle} : </span>
      <div style={{width:'70%', float:'right', padding:'5px'}}>
        <input
          name={`content-${index}`}
          onChange={e => contentChange(e, index)}
        />
      </div>
    </div>
))}
                    </div>
                    )}
                </div>
                      
                  <br/>
                   
                   <select 
                   name="line" 
                   onChange={ selectLine }
                   defaultValue="default"
                   >
                <option value="default" disabled>결재라인선택</option>
                {Array.isArray(lineInfo) &&
                lineInfo?.map(l => (
                <option key={l.lineNo} value={l.lineNo} name="line">{l.lineName}</option>
                ))}
                </select>   
                
                <input
                            type="file"
                            name='file' 
                            accept=""
                            multiple onChange={ onChangeFileUpload }
                            className={RegistCSS.fileUpload}
                        />
                
            </div>
            <br/>
            <br/>
            <div>
            <button type="submit" className={RegistCSS.submitButton1} onClick={onClickApprovRegistrationHandler}>결재상신</button>&nbsp;&nbsp;&nbsp;
            <button className={RegistCSS.cancel} onClick={()=> nav(-1)}>취소</button> 
            </div>
            </div>
        </>
        )
    
}
export default RegistApproval;
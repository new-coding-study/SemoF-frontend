import RegistCSS from './RegistApproval.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI, callLineListAPI } from "../../apis/ApprovalAPICalls"
import { useNavigate, useParams } from 'react-router-dom';
import { callLinesAPI } from '../../apis/ApprovalAPICalls';
function RegistApproval() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    const lineInfo = useSelector(state => state.approvalReducer.lines);
    // const form = formInfo.data;
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
    // const [approval, setApproval] = useState({
    //     // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
    //     approvTitle:''
    //     , lineNo: 0
    //     // ,이게 리스트로 들어가려면??
    //     , approvContentDTOList : [
            
    //     ]
    //     // , fileList : []
    //     // 이게 content값들로 인식이 될까?
    // })
    const [approval, setApproval] = useState({
        // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
        approvTitle:''
        , lineNo: 0
        // ,이게 리스트로 들어가려면??
        , approvContentDTOList : [
            
        ]
        // , fileList : []
        // 이게 content값들로 인식이 될까?
    })
    // console.log(form.formTitle);
    useEffect(
        () => {
            dispatch(callGetFormTitleAPI());  
            dispatch(callLinesAPI());
            
            console.log(formInfo);
            console.log('이걸 받아오는지 확인', lineInfo);

        } // eslint-disable-next-line
        ,[]
    );


// selectbox에서 onchange들어오면 폼 뜨게 이거를 잘 저장

    const selectHandler = (e)=>{
// select에서 받은 값을 저장해서 일치여부를 확인하고 form을 띄워야하나?
        setIsSelect(true);
        setSelectForm(e.target.value);
        console.log(isSelect);
        console.log(e.target.value);
        setIsCategorySelect(true);

        
    }
    const onChangeFileUpload= (e) =>{
        alert('파일 작동');
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
    //   fileList.forEach((file) => {
        // formData.append('files', file);
    //   });
      useEffect(() => {
        setApproval(prevState => ({
          ...prevState,
          approvTitle: title,
          lineNo : line,
          approvContentDTOList: contents.map(({ content, formCode }) => ({ content, formCode })),
            //  fileList: files
        }));
      }, [title, line, contents
    // ,files
]);
    console.log(approval);
    const onClickApprovRegistrationHandler = () => {

        console.log('[RegistApproval] onClickApprovRegistrationHandler');

        // approval.approvTitle
        // setForm(approval);
        // const formData = new FormData();

        formData.append("approval",JSON.stringify(approval));

        // console.log(approval)
        // console.log(JSON.stringify(approval))
        // console.log(JSON.stringify(formData));{}
        // formData.append("approvTitle",approval.approvTitle); 
        // formData.append("lineNo",approval.lineNo); 

        // formData.append("approvContentDTOList",approval.approvContentDTOList);
        console.log(formData.get("approval"))

        if(files){
            console.log('파일비어있니?')
            // formData.append("fileList", files);
        }
        // console.log("formData : " + JSON.stringify(formData));
        // console.log(formData.get("fileList"))
        // console.log('파일 append',formData.append("fileList", files));
        console.log(formData.get("fileList"))
        // console.log(formData)
        // for(let i=0; i<files.length; i++) {
        //     formData.append('files[]', files[i]);
        // }
        dispatch(callApprovRegistAPI({	
            
            form : formData
            // , fileList : files
          
        }));      
        console.log(formData.getAll)
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
                <label style={{marginRight:'17%'}}>카테고리 : </label>
                {/* <select name="formType" onChange={selectHandler}>
                <option value="none" disabled>작성유형선택</option>
                {formInfo.map(form => (
                <option key={form.appCategory} value={form.formCode} name="formCode">{form.appCategory}</option>
                ))}
                </select> */}
                <select onChange={selectHandler}>
                    {/* 여기서 선택한 옵션 값이 map에서 적용되야하는데 어떻게? */}
                    <option value="none" disabled>작성유형선택</option>
                     {/* {
                         {
                            formInfo.map((b, idx) => (
                <option key={appCategory} value={b.formCode} name="formCode">{b.appCategory}</option>
              ))}
                    }  */}
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
                <label style={{marginRight:'12%'}}>제목 : </label>
                <input 
                // className={nameInput} 
                onChange={onChangeHandler} placeholder="제목 입력" name='approvTitle'></input>
                
            </div>
            <br/>
            <div>
                <label style={{marginRight:'45%'}}>신청서 작성 : </label>
                <div>
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
                   onChange={ selectLine }>
                <option value="none" disabled>결재라인선택</option>
                {lineInfo?.map(l => (
                <option key={l.lineNo} value={l.lineNo} name="line">{l.lineName}</option>
                ))}
                </select>                
                <input
                            type="file"
                            name='file' 
                            accept=""
                            multiple onChange={ onChangeFileUpload }
                            // ref={ fileInput }
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
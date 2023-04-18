// import RegistCSS from './RegistApproval.module.css';
// import {useSelector, useDispatch} from 'react-redux';
// import { useEffect, useState, useRef } from 'react';
// import { callGetFormTitleAPI, callApprovalDetailAPI, callLinesAPI, callApprovModifyAPI } from "../../apis/ApprovalAPICalls"
// import { useNavigate, useParams } from 'react-router-dom';
// import ApprovFile from '../../components/approvals/ApprovFile';

// function ModifyApproval() {

//     // 수정하고 이동은 해야지
//     const nav = useNavigate();
//     const dispatch = useDispatch();
    
//     const formInfo = useSelector(state => state.approvalReducer.form);
    
//     const params = useParams();
//     // 파일은 상세조회처럼 component로 불러오자
//     // const fileList = useSelector(state=> state.approvalReducer.files);
//     // 결재 상세조회
//     const approvInfo = useSelector(state => state.approvalReducer.approval);
    
//     const [modifyMode, setModifyMode] = useState(false);
//     const formData = new FormData();

//     const [files, setFiles] = useState([]);

//     // 결재 제목
//     const [title, setTitle] = useState('');

//     // 서류 항목별 내용 : 동적으로 
//     const [contents, setContents] = useState([]);
//     const [line, setLine] = useState(0);
//     const [form, setForm] = useState({});
//     // const [isSelect, setIsSelect] = useState(false);
//     // 이건 안쓰는 듯
//     // const [isCategorySelect, setIsCategorySelect] = useState(false);
//     const [selectForm, setSelectForm] = useState('');
//     const [filePath, setFilePath] = useState();
//     const fileInput = useRef();

// //  결재 라인 리스트 불러옴  
//     const lineInfo = useSelector(state => state.approvalReducer.lines);
// // approval 전체 관리 : 위에 title content 가 있는데 이거 각각을 따로 둔 이유가 있을 까?
//     const [approval, setApproval] = useState({
        
//         approvTitle:''
//         , lineNo : 0
//         , approvContentDTOList : []
//     })
//     console.log(formInfo);
//     console.log('이걸 받아오는지 확인', lineInfo);
//     console.log('approval: ' + approvInfo);
//     useEffect(
//         () => {
//             dispatch(callApprovalDetailAPI(parseInt(params.approvNo)))
//             dispatch(callGetFormTitleAPI());  
//             dispatch(callLinesAPI());

//         } // eslint-disable-next-line
//         ,[]
//     );

//     const onClickModifyModeHandler = () => {    // 수정모드 : 수정하기 버튼에 연결할 것 
//         setModifyMode(true);
//         // 기존값으로 세팅 (아마 초기값)
//         setForm({
//             approvTitle: approvInfo.approvTitle,
//             lineNo: approvInfo.lineNo,

//             approvContentDTOList: approvInfo.approvContentDTOList,
//         //   리스트를 바로 가져올 수 있는지 확인
//         });
//     }
//     // useEffect(() => {
//     //     // 이미지 업로드시 미리보기 세팅
//     //     if(files){
//     //         const fileReader = new FileReader();
//     //         fileReader.onload = (e) => {
//     //             const { result } = e.target;
//     //             if( result ){
//     //                 setFilePath(result);
//     //             }
//     //         }
//     //         fileReader.readAsDataURL(files);
//     //     }
//     // },
//     // [files]);

// // selectbox에서 onchange들어오면 폼 뜨게 이거를 잘 저장

//     // 이게 업로드 시에 뜨는거 바로 form에 저장
//     const onChangeFileUpload= (e) =>{
//         alert('파일 작동');
//         const fileList = e.target.files; // 선택한 파일 리스트

//         // 파일 정보 추가
//         for (let i = 0; i < fileList.length; i++) {
//         const file = fileList[i];
//         formData.append('fileList', file, file.name); // 파일 이름 추가
//         console.log(formData.get('fileList'));
//         }

//     }
//     const selectHandler = (e)=>{
//         // select에서 받은 값을 저장해서 일치여부를 확인하고 form을 띄워야하나?
//                 // setIsSelect(true);
//                 setSelectForm(e.target.value);
//                 // console.log(isSelect);
//                 console.log(e.target.value);
//                 // setIsCategorySelect(true);
        
                
//             }
//     const selectLine = (e) =>{
//         console.log('lineNo event', e.target.value)
//         setLine(e.target.value);
//         console.log('lineNo', line);
//       };

//     const onChangeHandler = (e) => {
//         setTitle(e.target.value);
//         console.log('새 제목',title);
//     };
//     // const contentChange = (e) => {
//         // const { value } = e.target;
//         // setContents((prevContents) => [...prevContents, value]);

//     // }
//     const contentChange = (e, index) => {
//         console.log('여기까지 왔는지',selectForm)
//         const { value } = e.target;
//         setContents(prevContents => {
//           const updatedContents = [...prevContents];
//           updatedContents[index] = { content: value, formCode: selectForm };
//           console.log('이거 뭘로 나와', updatedContents);
//           return updatedContents;
//         });
//       }
//     // 파일과 별도로 approvalDTO의 값을 매긴다.
//     useEffect(() => {
//         setApproval(prevState => ({
//           ...prevState,
//           approvTitle: title,
//           lineNo : line,
//           approvContentDTOList: contents.map(({ content, formCode }) => ({ content, formCode })),
//         }));
//       }, [title, line, contents]);
//     console.log(approval);
//     const onClickEditHandler = () => {

//         console.log('[ModifyApproval] onClickEditHandler');

        
//         // const formData = new FormData();
//         // formData.append('file', form.file);
//         // formData.append('data', JSON.stringify(form.data));

//         formData.append("approval",JSON.stringify(approval));

//         if(files){
//             console.log('파일비어있니?')
//             // formData.append("approvFileDTOList", approval.approvFileDTOList);
//         }
//         console.log("fileList", formData.get("fileList"))
//         // console.log('[ProductRegistration] formData : ', formData.get("productName"));
//         // console.log('[ProductRegistration] formData : ', formData.get("productPrice"));
//         // console.log('[ProductRegistration] formData : ', formData.get("productOrderable"));
//         // console.log('[ProductRegistration] formData : ', formData.get("categoryCode"));
//         // console.log('[ProductRegistration] formData : ', formData.get("productStock"));
//         // console.log('[ProductRegistration] formData : ', formData.get("productDescription"));
//         // console.log('[ProductRegistration] formData : ', formData.get("productImageUrl"));
//         // const files = document.querySelector('input[type="file"]').files;

//         // for(let i=0; i<files.length; i++) {
//         //     formData.append('files[]', files[i]);
//         // }
//         dispatch(callApprovModifyAPI({	// 상품 상세 정보 조회
//             form: formData
//         }));        
//     }
        
//         // alert('상품 리스트로 이동합니다.');
//         // navigate('/product-management', { replace: true });
//         // window.location.reload();
//     return(
//         <>
//         <div className={RegistCSS.writeArea}>
//             <div 
//             className={RegistCSS.title}
//             >
//                 결재 수정
//             </div>
//             <div className={RegistCSS.categorytitle}>
//                 <label style={{marginRight:'17%'}}>카테고리 : </label>
//                 <select onChange={selectHandler} defaultValue="default">
//                     {
//                     // {approvInfo?.approvContentDTOList.length > 0 && 
//                     (
//    <option value="default" >{approvInfo?.approvContentDTOList[1]?.formCode}</option>
// )
// }

                   
                
//                     <option value="A" name="formCode">지출결의서</option>
//                     <option value="B" name="formCode">지출계획서</option>
//                     <option value="C" name="formCode">경조금지급신청서</option>
//                     <option value="D" name="formCode">연차</option>
//                     <option value="E" name="formCode">연장근무</option>
//                     <option value="F" name="formCode">출장</option>
//                     <option value="G" name="formCode">반차</option>
//                     <option value="H" name="formCode">구매요청서</option>
//                 </select>

//             </div>
//             <br/>
//             <div className={RegistCSS.inputTitle}>
//                 <label style={{marginRight:'12%'}}>제목 : </label>
//                 <input 
//                 // className={nameInput} 
//                 onChange={onChangeHandler} placeholder="제목 입력" value={ (!modifyMode ? approvInfo.approvTitle : form.approvTitle) || ''} name='approvTitle'></input>
                
//             </div>
//             <br/>
//             <div>
//                 <label style={{marginRight:'45%'}}>신청서 작성 : </label>
//                 <div>

//                 {/* <select name="branch" onChange={selectBranchHandler} defaultValue="default" */}
            
//   {/* <option value="default" >{lineInfo?.branchName}</option> */}
//             {
//             // isSelect &&  
//             (
//                     <div className={RegistCSS.formContent}>
//                         { 
//                         // 눌리면 다시는 안뜨게? useState에서 boolean을 
//                         formInfo
//                         .filter((t) => t.formCode === selectForm)
//                         .map((t) => (
//                             <div className={RegistCSS.formArea} key={t.formCode}>
//                             <span style={{fontSize:'20px', float:'left', marginLeft:'10%'}}>{t.formTitle} : </span>
//                             <div style={{width:'70%', float:'right', padding:'5px'}}>
//                             <input
//                                 readOnly={ modifyMode ? false : true }
//                                 style={ !modifyMode ? { backgroundColor: 'gray'} : null}
//                                 value={ (!modifyMode ? approvInfo.approvContentDTOList : form.approvContentDTOList) || ''}
//                                 name="content"
//                                 onChange={contentChange}
//                                 // 리스트 순서대로 돌려야함...
                                
//                             />
//                             </div>
//                             </div>
//                         ))}
//                     </div>
//                     )}
//                 </div>
//                         {/* 중복문제.... 파일처리 문제 fetch로 했더니 boundary 뭐가 안되있고 axios로는 또 에러 */}
//                   <br/>
//                 {!modifyMode &&
//                  <ApprovFile approvInfo={approvInfo}/>
//                 }
//                 {modifyMode &&
//                 <input                
//                 type="file"
//                 name='file' 
//                 accept=""
//                 multiple onChange={ onChangeFileUpload }
//                 ref={ fileInput }
//                 className={RegistCSS.fileUpload}
//             />
//                 }
                
//                         {/* <button 
//                             // className={ ProductRegistrationCSS.productImageButton }
//                             onClick={ onClickfilesUpload } 
//                         >
//                             파일 업로드
//                             </button> */}
//                              {/* <select name="branch" onChange={selectBranchHandler} defaultValue="default"
//             >
//   <option value="default" >{lineInfo?.branchName}</option> */}
//                              <select 
//                    name="line" 
//                    onChange={ selectLine }
//                    defaultValue="default"
//                    >
//                 <option value="default">{approvInfo?.lineName}</option>
//                 {Array.isArray(lineInfo) &&
//                 lineInfo?.map(l => (
//                 <option key={l.lineNo} value={l.lineNo} name="line">{l.lineName}</option>
//                 ))}
//                 </select>   
//             </div>
//             <br/>
//             <br/>
//             <div>
//             {!modifyMode &&  <button type="submit" className={RegistCSS.submitButton1} onClick={onClickModifyModeHandler}>수정하기</button>
// }
// {modifyMode &&
// <button type="submit" className={RegistCSS.submitButton1} onClick={onClickEditHandler}>저장</button>}

            
//             <button className={RegistCSS.cancel} onClick={()=> nav(-1)}>취소</button> 
//             </div>
//             </div>
//         </>
//         )
    
// }
// export default ModifyApproval;

// name='productDescription'
// onChange={ onChangeHandler }
// readOnly={ modifyMode ? false : true }
// value={ (!modifyMode ? productDetail.productDescription : form.productDescription) || '' }
// style={ !modifyMode ? { backgroundColor: 'gray'} : null}

import RegistCSS from './RegistApproval.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI, callLineListAPI } from "../../apis/ApprovalAPICalls"
import { useNavigate, useParams } from 'react-router-dom';
import { callLinesAPI } from '../../apis/ApprovalAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';


function ModifyApproval() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    const lineInfo = useSelector(state => state.approvalReducer.lines);
    // const lines = line.data;
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
        // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
        approvTitle:''
        , lineNo: 0
        , empNo: ''
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
          empNo : tokenEmpNo,
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
        console.log("approval", formData.get("approval"))

        if(files){
            console.log('파일비어있니?')
            // formData.append("fileList", files);
        }
        // console.log("formData : " + JSON.stringify(formData));
        // console.log(formData.get("fileList"))
        // console.log('파일 append',formData.append("fileList", files));
        console.log("fileList", formData.get("fileList"))
        // console.log(formData)
        // for(let i=0; i<files.length; i++) {
        //     formData.append('files[]', files[i]);
        // }
        dispatch(callApprovRegistAPI({	
            
            form : formData
            // , fileList : files
          
        }));      
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
                   onChange={ selectLine }
                   defaultValue="default"
                   >
                <option value="default" disabled>결재라인선택</option>
                {Array.isArray(lineInfo) &&
                lineInfo?.map(l => (
                <option key={l.lineNo} value={l.lineNo} name="line">{l.lineName}</option>
                ))}
                </select>   
                {
                  
                }
                {
              // <ApprovFile approvInfo={approvInfo}/>
            }             
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
export default ModifyApproval;
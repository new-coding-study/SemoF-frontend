import RegistCSS from './RegistApproval.module.css';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI } from "../../apis/ApprovalAPICalls"
import { useNavigate, useParams } from 'react-router-dom';

function ModifyApproval() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    // const form = formInfo.data;
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState([]);
    const [isSelect, setIsSelect] = useState(false);
    const [isCategorySelect, setIsCategorySelect] = useState(false);
    const [selectForm, setSelectForm] = useState('');
    const [filePath, setFilePath] = useState();
    const fileInput = useRef();
    const [approval, setApproval] = useState({
        // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
        approvTitle:''
        // ,이게 리스트로 들어가려면??
        , approvContentDTOList : [
            
        ], approvFileDTOList : []
        // 이게 content값들로 인식이 될까?
    })
    console.log(formInfo);
    // console.log(form.formTitle);
    useEffect(
        () => {
            dispatch(callGetFormTitleAPI());  
            


        } // eslint-disable-next-line
        ,[]
    );
    // useEffect(() => {
    //     // 이미지 업로드시 미리보기 세팅
    //     if(files){
    //         const fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if( result ){
    //                 setFilePath(result);
    //             }
    //         }
    //         fileReader.readAsDataURL(files);
    //     }
    // },
    // [files]);

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
        const files = e.target.files; // 선택한 파일 리스트
        console.log('여기',files);
        console.log('여기도',files[0]);
        // const fileList = []; // 파일 정보 리스트
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileDTO = {
            originName: file.name
          };
          setFiles.push(fileDTO);
        }
      

        // setFiles(e.target.files);
    }
    const onClickfilesUpload = () => {
        fileInput.current.click();
    }
    const onChangeHandler = (e) => {
        setTitle(e.target.value);
    };
    const contentChange = (e) => {
        const { value } = e.target;
        setContents((prevContents) => [...prevContents, value]);

    }

    useEffect(() => {
        setApproval(prevState => ({
          ...prevState,
          approvTitle: title,
          approvContentDTOList: contents,
          approvFileDTOList: files
        }));
      }, [title, contents, files]);
    console.log(approval);
    const onClickApprovRegistrationHandler = () => {

        console.log('[RegistApproval] onClickApprovRegistrationHandler');

        const formData = new FormData();
        // const formData = new FormData();
        // formData.append('file', form.file);
        // formData.append('data', JSON.stringify(form.data));

        formData.append("approvTitle", JSON.stringify(approval.approvTitle));
        formData.append("approvContentDTOList", JSON.stringify(approval.approvContentDTOList));
        // formData.append("productOrderable", approval.productOrderable);
        // formData.append("categoryCode", approval.categoryCode);
        // formData.append("productStock", approval.productStock);
        // formData.append("productDescription", approval.productDescription);

        if(files){
            console.log('파일비어있니?')
            formData.append("approvFileDTOList", approval.approvFileDTOList);
        }
        // console.log('[ProductRegistration] formData : ', formData.get("productName"));
        // console.log('[ProductRegistration] formData : ', formData.get("productPrice"));
        // console.log('[ProductRegistration] formData : ', formData.get("productOrderable"));
        // console.log('[ProductRegistration] formData : ', formData.get("categoryCode"));
        // console.log('[ProductRegistration] formData : ', formData.get("productStock"));
        // console.log('[ProductRegistration] formData : ', formData.get("productDescription"));
        // console.log('[ProductRegistration] formData : ', formData.get("productImageUrl"));
        // const files = document.querySelector('input[type="file"]').files;

        // for(let i=0; i<files.length; i++) {
        //     formData.append('files[]', files[i]);
        // }
        dispatch(callApprovRegistAPI({	// 상품 상세 정보 조회
            form: formData
        }));        
    }
        
        // alert('상품 리스트로 이동합니다.');
        // navigate('/product-management', { replace: true });
        // window.location.reload();
// 현재 상황 : 셀렉트 박스에서 선택을 하면 그에 맞는 양식을 불러와야하는데
// 지금은 formCode를 option에도 설정하고 api로도 call했다... 그말은 즉,,,,, 시점을 언제로 인식할 건지를 모르겠음... 안될 것 같은데
// 어떻게 해야할까 이게 아예 안될 문제는 아닐텐데
    return(
        <>
        <div className={RegistCSS.writeArea}>
            <div 
            className={RegistCSS.title}
            >
                결재 수정
            </div>
            <div className={RegistCSS.categorytitle}>
                <label style={{marginRight:'17%'}}>카테고리 : </label>
                {/* <select name="formType" onChange={selectHandler}>
                <option value="none" disabled>작성유형선택</option>
                {formInfo.map(form => (
                <option key={form.formCode} value={form.formCode} name="formCode">{form.formTitle}</option>
                ))}
                </select> */}
                <select onChange={selectHandler}>
                    {/* 여기서 선택한 옵션 값이 map에서 적용되야하는데 어떻게? */}
                    <option value="none" disabled>작성유형선택</option>
                    {/* {
                        지히는 이거 반복을 돌리라 했다. 그러면 api또 만들어야함
                         {branch.map(b => (
                <option key={b.branchCode} value={b.branchCode} name="branchCode">{b.branchName}</option>
              ))}
                    } */}
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
                        { 
                        // 눌리면 다시는 안뜨게? useState에서 boolean을 
                        formInfo
                        .filter((t) => t.formCode === selectForm)
                        .map((t) => (
                            <div className={RegistCSS.formArea} key={t.formCode}>
                            <span style={{fontSize:'20px', float:'left', marginLeft:'10%'}}>{t.formTitle} : </span>
                            <div style={{width:'70%', float:'right', padding:'5px'}}>
                            <input
                                name="content"
                                onChange={contentChange}
                                
                            />
                            </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                        {/* 중복문제.... 파일처리 문제 fetch로 했더니 boundary 뭐가 안되있고 axios로는 또 에러 */}
                  <br/>
                <input                
                            type="file"
                            name='file' 
                            accept=""
                            multiple onChange={ onChangeFileUpload }
                            ref={ fileInput }
                            className={RegistCSS.fileUpload}
                        />
                        {/* <button 
                            // className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickfilesUpload } 
                        >
                            파일 업로드
                            </button> */}
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
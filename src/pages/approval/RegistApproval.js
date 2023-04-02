import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { callGetFormTitleAPI, callApprovRegistAPI } from "../../apis/ApprovalAPICalls"
import { useNavigate, useParams } from 'react-router-dom';

function RegistApproval() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const formInfo = useSelector(state => state.approvalReducer.form);
    // const form = formInfo.data;
    const [files, setFiles] = useState([]);
    const [isSelect, setIsSelect] = useState(false);
    const [selectForm, setSelectForm] = useState('');
    const [filePath, setFilePath] = useState();
    const fileInput = useRef();
    const [approval, setApproval] = useState({
        // 문제는 이게 하나하나의 필드가 아닌,,, 테이블이라는 점?////
        approvTitle:''
        // ,이게 리스트로 들어가려면??
        , approvContentDTOList : [
            { content : ''}
        ]
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
        
    }
    const onChangeFileUpload= (e) =>{
        setFiles(e.target.files);
    }
    const onClickfilesUpload = () => {
        fileInput.current.click();
    }
    const onChangeHandler = (e) => {
        setApproval({
            ...approval,
            [e.target.name]: e.target.value
        });
    };

    const onClickApprovRegistrationHandler = () => {

        console.log('[RegistApproval] onClickApprovRegistrationHandler');

        const formData = new FormData();
        // const formData = new FormData();
        // formData.append('file', form.file);
        // formData.append('data', JSON.stringify(form.data));

        formData.append("approvTitle", approval.approvTitle);
        formData.append("content", approval.content);
        // formData.append("productOrderable", approval.productOrderable);
        // formData.append("categoryCode", approval.categoryCode);
        // formData.append("productStock", approval.productStock);
        // formData.append("productDescription", approval.productDescription);

        if(files){
            formData.append("files", files);
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
            approval: formData
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
            <div 

            >
                결재 상신
            </div>
            <div 
            // className={category}
            >
                <p>카테고리</p>
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
            <div 
            // className={docuName}
            >
                <p>제목</p>
                <input 
                // className={nameInput} 
                onChange={onChangeHandler} placeholder="제목 입력" name='approvTitle'></input>
                
            </div>
            <div 
            // className={application}
            >
                <p>신청서 작성</p>
                <div 
                // className={application}
                >
             
            </div> 
            {isSelect && (
  <div>
    {formInfo
      .filter((t) => t.formCode === selectForm)
      .map((t) => (
        <div key={t.formCode}>
          <span>{t.formTitle}</span>:
          <input
            name="content"
            onChange={onChangeHandler}
            // className={  }
          />
        </div>
      ))}
  </div>
)}
                        {/* 중복문제.... 파일처리 문제 fetch로 했더니 boundary 뭐가 안되있고 axios로는 또 에러 */}
                  
                <input                
                            // style={ { display: 'none' }}
                            type="file"
                            name='file' 
                            accept=""
                            multiple onChange={ onChangeFileUpload }
                            ref={ fileInput }
                        />
                        <button 
                            // className={ ProductRegistrationCSS.productImageButton }
                            onClick={ onClickfilesUpload } 
                        >
                            파일 업로드
                            </button>
            </div>
            <button 
            // className={btnTurn}
            >취소</button>
            <button type="submit" 
            // className={btnSend} 
            onClick={onClickApprovRegistrationHandler}>결재상신</button>
        </>
        )
    
}
export default RegistApproval;
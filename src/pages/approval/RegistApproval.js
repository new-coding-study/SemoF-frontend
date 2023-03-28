

function RegistApproval() {

    return(
        <>
            <div className={title}>
                결재 상신
            </div>
            <div className={category}>
                <p>카테고리</p>
                <select>
                    <option value="none" disabled>작성유형선택</option>
                    <option value="A">지출결의서</option>
                    <option value="B">지출계획서</option>
                    <option value="C">경조금지급신청서</option>
                    <option value="D">연차</option>
                    <option value="E">연장근무</option>
                    <option value="F">출장</option>
                    <option value="G">반차</option>
                    <option value="H">구매요청서</option>
                </select>

            </div>
            <div className={docuName}>
                <p>제목</p>
                <input className={nameInput} placeholder="제목 입력" name='approvTitle'></input>
                
            </div>
            <div className={application}>
                <p>신청서 작성</p>
                <span></span>
                <input 
                                        name='content'
                                        
                                        // className={ ArtRegistCSS.artInfo }
                                        onChange={ onChangeHandler }
                                    />
            </div>
            <button className={btnTurn}>취소</button>
            <button type="submit" className={btnSend}>결재상신</button>
        </>
    )
}
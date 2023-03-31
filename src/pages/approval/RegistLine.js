import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function RegistLine(){

    const nav=useNavigate();
    const [selects, setSelects] = useState([{ id: 1, value: '' }]);
    const [nextId, setNextId] = useState(2);

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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 값 저장하기... useState
    console.log(selects);
  };
    return(
        <>
            <div className={ApprovalCSS.title}>
            결재 라인 추가
            </div>
            <div>
            {selects.map((select) => (
                <div key={select.id}>
                <label htmlFor={`select-${select.id}`}>Select {select.id}:</label>
                <select
                    id={`select-${select.id}`}
                    value={select.value}
                    onChange={(event) => handleSelectChange(event, select.id)}
                >
                    {/* option map 돌려야함 */}
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                </select>
                </div>
            ))}
            </div>
            <button type="button" onClick={handleAddSelect}>
            +
            </button>
        <button type="submit">등록하기</button>
        <button type="button" onClick={()=>{nav(-1)}}>취소하기</button>
        </>
    )
}
export default RegistLine;

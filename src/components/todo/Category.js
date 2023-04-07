import CategoryCSS from "./Category.module.css";

function Category({ category, setChooseCate, chooseCate }) {
  const onClickChooseCateHandler = () => {
    const chooseCateNo = category.cateNo;

    // console.log("선택한 cateNo", chooseCateNo);
    // console.log("기존의 cateNo", chooseCate);

    // 새롭게 선택한 값과 기존에 선택되어 있던 값이 같으면 빈 값으로 초기화
    // 같지않거나 비어있으면 선택한 값으로 설정
    if (
      // chooseCate !== null &&
      // chooseCate !== undefined &&
      // chooseCate.length !== 0
      chooseCate === chooseCateNo
    ) {
      // console.log("chooseCate 값 있음", chooseCate);
      setChooseCate("");
    } else {
      // console.log("chooseCate는 비어있습니다.");
      setChooseCate(chooseCateNo);
    }

    // setChooseCate(category.cateNo)
  };

  return (
    <>
      <div
        className={CategoryCSS.wrapper}
        onClick={onClickChooseCateHandler}
        style={
          chooseCate === category.cateNo ? { backgroundColor: "bisque" } : null
        }
      >
        <div
          className={CategoryCSS.colorBox}
          style={{ backgroundColor: category.cateColor }}
        ></div>
        <div className={CategoryCSS.name}> {category.cateName} </div>
        {/* <div className={CategoryCSS.editBar} onClick>⋮</div> */}
      </div>
    </>
  );
}

export default Category;

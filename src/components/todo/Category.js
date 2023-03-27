import CategoryCSS from "./Category.module.css";

function Category() {
  return (
    <>
      <div className={CategoryCSS.star}>
        <img src={"/images/star_fill.png"} alt="이미지확인!"></img>
        <div> 중요 표시한 할 일</div>
      </div>
      <div className={CategoryCSS.wrapper}>
        <div className={CategoryCSS.colorBox}> </div>
        <div className={CategoryCSS.name}> 카테고리 이름 </div>
      </div>
      <div className={CategoryCSS.addCate}>
        <div> + </div>
        <div> 중요 표시한 할 일</div>
      </div>
    </>
  );
}

export default Category;

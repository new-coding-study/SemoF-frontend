import CategoryCSS from "./Category.module.css";

function Category({ category }) {
  // const category = categoryList.category;

  // console.log("category", category);

  return (
    <>
      {/* <div className={CategoryCSS.star}>
        <img src={"/images/star_fill.png"} alt="이미지확인!"></img>
        <div> 중요 표시한 할 일</div>
      </div> */}
      <div className={CategoryCSS.wrapper}>
        <div
          className={CategoryCSS.colorBox}
          style={{ backgroundColor: category.cateColor }}
        ></div>
        <div className={CategoryCSS.name}> {category.cateName} </div>
        {/* <div className={CategoryCSS.editBar} onClick>⋮</div> */}
      </div>
      {/* <div className={CategoryCSS.addCate}>
        <div> + </div>
        <div> 카테고리 추가 </div>
      </div> */}
    </>
  );
}

export default Category;

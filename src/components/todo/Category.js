import CategoryCSS from "./Category.module.css";

function Category({ category }) {
  // const category = categoryList.category;

  // console.log("category", category);

  return (
    <>
      <div className={CategoryCSS.wrapper}>
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

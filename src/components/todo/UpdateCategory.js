import UpdateCategoryCSS from "./UpdateCategory.module.css";

function UpdateCategory({
  categorys,
  //   category,
  setVisibleUpdateCate,
  visibleUpdateCate,
  setSelectUpdateCate,
  selectUpdateCate,
}) {
  const onClickSelectUpdateCateHandler = (e) => {
    if (e.target.value !== null && e.target.value !== undefined) {
      const selectUpdateCateNo = e.target.value;
      const selectUpdateCate = categorys?.filter(
        (updateCategory) => updateCategory?.cateNo === selectUpdateCateNo
      );

      const newCateNo = selectUpdateCate[0]?.cateNo;
      const newCateColor = selectUpdateCate[0]?.cateColor;
      const newCateName = selectUpdateCate[0]?.cateName;

      setSelectUpdateCate({
        ...selectUpdateCate,
        cateNo: newCateNo,
        cateColor: newCateColor,
        cateName: newCateName,
      });

      setVisibleUpdateCate(!visibleUpdateCate);
    }
  };

  return (
    <>
      <div
        className={UpdateCategoryCSS.selectCateWrapper}
        onClick={onClickSelectUpdateCateHandler}
      >
        <ul className={UpdateCategoryCSS.selectCateList}>
          {categorys.map((category) => (
            <li
              className={UpdateCategoryCSS.selectCateOne}
              onClick={onClickSelectUpdateCateHandler}
              value={category.cateNo}
            >
              <div
                name="cateNo"
                key={category.cateNo}
                style={{
                  backgroundColor: category.cateColor,
                }}
                className={UpdateCategoryCSS.selectCateOneColorBox}
              ></div>
              <div className={UpdateCategoryCSS.selectCateOneName}>
                {category.cateName}
              </div>
            </li>
          ))}
        </ul>
        {/* <div
          name="cateNo"
          key={category.cateNo}
          style={{
            backgroundColor: category.cateColor,
          }}
          className={UpdateCategoryCSS.selectCateOneColorBox}
        ></div>
        <div className={UpdateCategoryCSS.selectCateOneName}>
          {category.cateName}
        </div> */}
        <div
          onClick={() => {
            setVisibleUpdateCate(!visibleUpdateCate);
          }}
          className={UpdateCategoryCSS.visibleUpdateCateButton}
        >
          ▼
        </div>
      </div>
    </>
  );
}

export default UpdateCategory;

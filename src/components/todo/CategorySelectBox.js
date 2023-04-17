import CategorySelectBoxCSS from "./CategorySelectBox.module.css";
// import { useEffect, useState } from "react";

function CategorySelectBox({
  categorys,
  setSelectedCateColor,
  setVisibleCate,
  setNewTodo,
  newTodo,
}) {
  // useEffect(() => {
  //   setSelectedCateColor(categorys[0].cateColor);
  // }, []);

  // 새로운 Todo 카테고리 선택 핸들러
  const onChooseCate = (e) => {
    setNewTodo({
      ...newTodo,
      cateNo: e.target.value,
    });
    const seleceCateNo = categorys.filter(
      (category) => category.cateNo === e.target.value
    );
    // console.log(seleceCateNo[0].cateColor);
    setVisibleCate(false);
    setSelectedCateColor(seleceCateNo[0].cateColor);
  };

  return (
    <ul className={CategorySelectBoxCSS.selectCateList}>
      {categorys?.map((category) => (
        <li
          name="cateNo"
          value={category.cateNo}
          key={category.cateNo}
          style={{
            backgroundColor: category.cateColor,
          }}
          onClick={onChooseCate}
        ></li>
      ))}
    </ul>
  );
}

export default CategorySelectBox;

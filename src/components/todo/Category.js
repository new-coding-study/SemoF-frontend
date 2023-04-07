import CategoryCSS from "./Category.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  callDeleteCategoryAPI,
  callCategoryUpdateAPI,
} from "../../apis/TodoAPICalls";

function Category({
  category,
  setChooseCate,
  chooseCate,
  setAddAndDeleteCategory,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cateModifyMode, setCateModifyMode] = useState(false);

  const [updateCategory, setUpdateCategory] = useState({
    cateColor: category.cateColor,
    cateName: category.cateName,
  });

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

  const onClickModifyModeHandler = () => {
    setCateModifyMode(true);
  };

  const onChangeUpdateCategoryHandler = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setUpdateCategory({
      ...updateCategory,
      [e.target.name]: e.target.value,
    });
  };

  const onClickUpdateCateHandler = () => {
    const formData = new FormData();

    formData.append("cateName", updateCategory.cateName);
    formData.append("cateColor", updateCategory.cateColor);
    formData.append("cateNo", category.cateNo);

    dispatch(
      callCategoryUpdateAPI({
        form: formData,
      })
    );

    setAddAndDeleteCategory(true);
    setCateModifyMode(false);
  };

  const onClickDeleteCateHandler = () => {
    // console.log("삭제 이벤트 발생");
    // console.log(category.cateNo);
    // dispatch(callDeleteCategoryAPI(category.cateNo));
    // setAddAndDeleteCategory(true);
    Swal.fire({
      title: "해당 카테고리를 삭제하시겠습니까?",
      html: "카테고리 삭제 시 포함된 할 일도 모두 삭제되며,<br/> 되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
      confirmButtonColor: "#e52e2e",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callDeleteCategoryAPI(category.cateNo));
        Swal.fire(
          " 삭제되었습니다.",
          "할 일 리스트로 돌아갑니다",
          "success"
        ).then(
          // navigate(`/semof/todo`, { replace: true }),
          setAddAndDeleteCategory(true),
          window.location.reload()
        );
      }
    });
  };

  return (
    <>
      <div className={CategoryCSS.cateWrapper}>
        {cateModifyMode ? (
          <>
            <div
              className={CategoryCSS.wrapper}
              // onClick={onClickChooseCateHandler}
              // style={
              //   chooseCate === category.cateNo
              //     ? { backgroundColor: "bisque" }
              //     : null
              // }
            >
              <input
                type="color"
                className={CategoryCSS.updateColorBox}
                // style={{ backgroundColor: category.cateColor }}
                name="cateColor"
                defaultValue={updateCategory?.cateColor}
                onChange={onChangeUpdateCategoryHandler}
              ></input>
              <input
                type="text"
                defaultValue={updateCategory?.cateName}
                name="cateName"
                className={CategoryCSS.updateCateName}
                onChange={onChangeUpdateCategoryHandler}
              ></input>
            </div>

            <div
              className={CategoryCSS.updateBtn}
              onClick={onClickUpdateCateHandler}
            >
              수정
            </div>
          </>
        ) : (
          <>
            <div
              className={CategoryCSS.wrapper}
              onClick={onClickChooseCateHandler}
              style={
                chooseCate === category.cateNo
                  ? { backgroundColor: "bisque" }
                  : null
              }
            >
              <div
                className={CategoryCSS.colorBox}
                style={{ backgroundColor: category.cateColor }}
              ></div>
              <div className={CategoryCSS.name}> {category.cateName} </div>
            </div>

            <div
              className={CategoryCSS.deleteBtn}
              onClick={onClickDeleteCateHandler}
            >
              x
            </div>
            <img
              src={"/images/edit.png"}
              alt="이미지확인!"
              className={CategoryCSS.editIcon}
              onClick={onClickModifyModeHandler}
            ></img>
          </>
        )}
      </div>
    </>
  );
}

export default Category;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function EmpInfo() {
  const dispatch = useDispatch();

  return (
    <>
      <div
        style={{
          display: "flex",
          marginTop: "24px",
          paddingBottom: "12px",
          alignItems: "center",
          borderRadius: "0",
          borderBottom: "1px solid gray",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            margin: "0 24px",
            borderRadius: "100%",
            border: "1px solid black",
            overflow: "hidden",
          }}
        >
          <img
            src={"/images/profileImg.png"}
            alt="이미지확인!"
            style={{
              width: "60px",
              height: "60px",
              marginTop: "8px",
              objectFit: "contain",
            }}
          ></img>
        </div>
        <div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              marginBottom: "4px",
            }}
          >
            이름
          </div>
          <div> 팀 / 직</div>
        </div>
        <div
          style={{
            width: "60px",
            height: "32px",
            lineHeight: "32px",
            marginLeft: "140px",
            border: "1px solid gray",
            borderRadius: "4px",
            fontSize: "14px",
            color: "gray",
            cursor: "pointer",
          }}
        >
          로그아웃
        </div>
      </div>
    </>
  );
}

export default EmpInfo;

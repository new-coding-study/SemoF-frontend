import React, { useState, useEffect } from "react";
import fetchWeather from "../../apis/fetchWeather";

function Weather({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function getWeather() {
      const data = await fetchWeather(city);
      setWeather(data);
      console.log(data);
    }

    getWeather();
  }, [city]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const {
    name,
    main: { temp, feels_like, humidity },
    weather: [details],
  } = weather;

  return (
    <div
      style={{
        width: "265px",
        marginLeft: "80px",
        border: "1px solid #e0e0e0",
        backgroundColor:
          temp < 15 ? "#e1f5fc" : temp < 24 ? "#eaebe1" : "#ebe1e1",
      }}
    >
      <div
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          textAlign: "left",
          display: "flex",
        }}
      >
        <img
          src={"/images/mainWeather.png"}
          alt="이미지확인!"
          style={{
            width: "24px",
            height: "24px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        ></img>
        <div style={{ marginTop: "2px", fontSize: "18px" }}>오늘 날씨</div>
      </div>
      <div
        style={{
          display: "flex",
          // marginTop: "12px",
          // marginLeft: "16px",
          margin: "8px 16px 0 16px",
          alignItems: "center",
          // border: "1px solid green",
        }}
      >
        <div
          style={{
            // border: "1px solid blue",
            margin: "0 16px",
          }}
        >
          <div
            style={{
              fontSize: "36px",
              marginBottom: "8px",
              marginTop: "4px",
            }}
          >
            {temp.toFixed(1)}°C
          </div>
          <div> 체감온도 {feels_like.toFixed(1)}°C</div>
        </div>
        <div>
          <img
            src={`http://openweathermap.org/img/w/${details.icon}.png`}
            alt="이미지확인!"
            style={{
              width: "92px",
              height: "92px",
              verticalAlign: "middle",
              // border: "1px solid red",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Weather;

import React, { useState, useEffect } from "react";
import { getPosition } from "../../_utils/getLocation";
import './InfoMap.css'

const { kakao } = window;

const InfoMap = (props) => {
  const [map, setMap] = useState(null);

  //지도를 불러오는 로직
  const createMap = () => {
    let container = document.getElementById("allmap");
    let options = {
      center: new kakao.maps.LatLng(37.506502, 127.053617),
      level: 7,
    };
    let myMap = new kakao.maps.Map(container, options);

    let mapTypeControl = new kakao.maps.MapTypeControl();

    myMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    setMap(myMap);
  };

  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    let iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
    // 지도 중심좌표를 접속위치로 변경합니다
    map.panTo(locPosition);
  }

  const nowLocation = () => {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);

        console.log(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarker(locPosition, message, map);
    }
  };

  // 현재 위치로 이동해서 마커를 찍어주는 함
  useEffect(() => {
    createMap();
    // console.log(getLocation());
    getPosition().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="infomap">
      <div id="allmap" style={{ width: "80vw", height: "80vh" }}></div>
      <div>
        <button onClick={nowLocation}>현재위치</button>
      </div>
    </div>
  );
};

export default InfoMap;

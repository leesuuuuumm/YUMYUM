import React, { useState, useEffect } from "react";
import { getPosition } from "../../_utils/getLocation";
import "./InfoMap.css";

const { kakao } = window;

const InfoMap = (props) => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([
    {
      address_name: "대전 유성구 봉명동 536-10",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 양식 > 햄버거",
      distance: "510",
      id: "800935414",
      phone: "042-719-8253",
      place_name: "델리랩 유성충대점",
      place_url: "http://place.map.kakao.com/800935414",
      road_address_name: "대전 유성구 대학로 34",
      x: "127.34295332577295",
      y: "36.35655111481983",
    },
  ]);
  const [samples, setSamples] = useState([
    {
      address_name: "대전 유성구 봉명동 447-6",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 패스트푸드 > 맘스터치",
      distance: "594",
      id: "26905149",
      phone: "042-361-1101",
      place_name: "맘스터치 대전유성점",
      place_url: "http://place.map.kakao.com/26905149",
      road_address_name: "대전 유성구 계룡로 84",
      x: "127.33979778930811",
      y: "36.35391067428985",
    },
    {
      address_name: "대전 서구 둔산동 1362",
      category_group_code: "FD6",
      category_group_name: "음식점",
      category_name: "음식점 > 일식 > 토끼정",
      distance: "3014",
      id: "1669995956",
      phone: "042-472-5585",
      place_name: "토끼정 대전둔산점",
      place_url: "http://place.map.kakao.com/1669995956",
      road_address_name: "대전 서구 대덕대로 226",
      x: "127.379863542692",
      y: "36.3527356488493",
    },
  ]);

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

  function displayAllMarkers() {
    for (let i = 0; i < markers.length; i++) {
      let placePosition = new kakao.maps.LatLng(markers[i].y, markers[i].x),
        marker = new kakao.maps.Marker({
          map: map,
          position: placePosition,
        });

      kakao.maps.event.addListener(marker, "click", function () {
        //TODO : 여기에 모달을 호출하는 함수를 넣어주면된다.
        alert("클릭했어!");
      });
    }
  }
  //현재위치에 마커를 찍는 함수
  function displayMarkerNow(locPosition, message) {
    // 마커를 생성합니다
    console.log(map);
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
  // 현재위치 버튼 클릭시 호출되는 메서드
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
        displayMarkerNow(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = "geolocation을 사용할수 없어요..";

      displayMarkerNow(locPosition, message);
    }
  };

  // 현재 위치로 이동해서 마커를 찍어주는 함
  useEffect(() => {
    createMap();
    setMarkers(markers.concat(samples));
  }, []);

  useEffect(() => {
    displayAllMarkers();
    console.log("호출합니다.");
  }, [displayAllMarkers]);

  return (
    <div className="infomap">
      <div id="allmap" style={{ width: "80vw", height: "80vh" }}></div>
      <div>
        <button onClick={nowLocation}>현재위치</button>
        <button onClick={displayAllMarkers}>마커표시하기</button>
      </div>
    </div>
  );
};

export default InfoMap;
